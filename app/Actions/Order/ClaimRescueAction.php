<?php

namespace App\Actions\Order;

use App\Enums\RescueStatus;
use App\Models\Rescue;
use App\Models\Ticket;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ClaimRescueAction
{
    public function execute(Rescue $rescue, int $userId): Ticket
    {
        return DB::transaction(function () use ($rescue, $userId) {
            $lockedRescue = Rescue::where('id', $rescue->id)->lockForUpdate()->firstOrFail();

            if ($lockedRescue->status !== RescueStatus::ACTIVE) {
                abort(409, 'This rescue is no longer available.');
            }

            $lockedRescue->update([
                'user_id' => $userId,
                'status' => RescueStatus::CLAIMED,
            ]);

            return Ticket::create([
                'user_id' => $userId,
                'rescue_id' => $lockedRescue->id,
                'code' => 'FRB-' . strtoupper(Str::random(6)),
                'title' => 'Surprise Bag - ' . $lockedRescue->shop->name,
                'address' => $lockedRescue->shop->address,
                'status' => 'active',
                'expires_at' => now()->addHours(2)->min($lockedRescue->expires_at), 
            ]);
        });
    }
}