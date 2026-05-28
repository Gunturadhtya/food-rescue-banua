<?php

namespace App\Actions\Profile;

use App\Models\User;
use App\Models\Ticket;

readonly class GetActiveTicketAction
{
    public function execute(User $user): ?Ticket
    {
        return $user->tickets()
            ->where('status', 'active')
            ->where('expires_at', '>', now())
            ->orderBy('expires_at', 'asc') // Get the one expiring soonest
            ->first();
    }
}