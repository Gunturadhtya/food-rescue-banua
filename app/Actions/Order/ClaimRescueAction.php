<?php

namespace App\Actions\Order;

use App\Enums\RescueStatus;
use App\Models\Rescue;
use App\Models\Ticket;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ClaimRescueAction
{
    public function execute(Rescue $rescue, int $userId, int $quantity = 1): Ticket
    {
        return DB::transaction(function () use ($rescue, $userId, $quantity) {
            // Lock the row to prevent race conditions
            $lockedRescue = Rescue::where('id', $rescue->id)->lockForUpdate()->firstOrFail();

            if ($lockedRescue->status !== RescueStatus::ACTIVE || $lockedRescue->pcs < $quantity) {
                abort(409, 'This rescue is no longer available in the requested quantity.');
            }

            // Deduct inventory
            $lockedRescue->pcs -= $quantity;
            $updateData = ['pcs' => $lockedRescue->pcs];

            // If sold out, transition the original record
            if ($lockedRescue->pcs === 0) {
                $updateData['status'] = RescueStatus::CLAIMED;
                $updateData['user_id'] = $userId;
                
                $lockedRescue->update($updateData);
                $claimedRescueId = $lockedRescue->id;
            } else {
                // Partial claim: update active inventory, then split a new row for the claimed ledger
                $lockedRescue->update($updateData);

                $claimedRescue = $lockedRescue->replicate();
                $claimedRescue->pcs = $quantity;
                $claimedRescue->status = RescueStatus::CLAIMED;
                $claimedRescue->user_id = $userId;
                $claimedRescue->save();

                $claimedRescueId = $claimedRescue->id;
            }

            // Generate the Ticket bound to the explicitly claimed rescue record
            return Ticket::create([
                'user_id' => $userId,
                'rescue_id' => $claimedRescueId,
                'quantity' => $quantity,
                'code' => 'FRB-' . strtoupper(Str::random(6)),
                'title' => 'Surprise Bag - ' . $lockedRescue->shop->name,
                'address' => $lockedRescue->shop->address,
                'status' => 'active',
                'expires_at' => now()->addHours(2)->min($lockedRescue->expires_at), 
            ]);
        });
    }
}