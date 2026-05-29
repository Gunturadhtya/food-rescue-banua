<?php

namespace App\Console\Commands;

use App\Enums\RescueStatus;
use App\Models\Rescue;
use App\Models\Ticket;
use Illuminate\Console\Command;

class ExpireRescuesAndTickets extends Command
{
    protected $signature = 'rescues:expire';
    protected $description = 'Transition active rescues and tickets past their expiration time.';

    public function handle(): int
    {
        $now = now();

        // 1. Expire un-claimed Rescues (Seller inventory)
        Rescue::where('status', RescueStatus::ACTIVE)
            ->where('expires_at', '<', $now)
            ->update([
                'status' => RescueStatus::EXPIRED,
                'updated_at' => $now,
            ]);

        // 2. Pre-fetch IDs to prevent correlated subquery (EXISTS) locking
        $expiredRescueIds = Ticket::where('status', 'active')
            ->where('expires_at', '<', $now)
            ->pluck('rescue_id')
            ->filter() // Strip any nulls
            ->unique();

        // 3. Update Tickets to expired
        Ticket::where('status', 'active')
            ->where('expires_at', '<', $now)
            ->update([
                'status' => 'expired',
                'updated_at' => $now,
            ]);

        // 4. Update associated Rescues via direct indexed lookup
        if ($expiredRescueIds->isNotEmpty()) {
            // Split into chunks to prevent SQL parameter limit errors on massive datasets
            $expiredRescueIds->chunk(1000)->each(function ($chunk) use ($now) {
                Rescue::whereIn('id', $chunk)
                    ->where('status', RescueStatus::CLAIMED)
                    ->update([
                        'status' => RescueStatus::EXPIRED,
                        'updated_at' => $now,
                    ]);
            });
        }

        $this->info('Expiration sync complete.');

        return self::SUCCESS;
    }
}