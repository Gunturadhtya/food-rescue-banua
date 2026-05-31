<?php

namespace App\Actions\Profile;

use App\Models\User;
use App\Models\Tier;

readonly class DetermineUserTierAction
{
    /**
     * @return array{currentTier: string, nextTier: ?string, rescuesNeeded: int, totalRescues: int}
     */
    public function execute(User $user): array
    {
        $totalOrders = $user->tickets()->count();
        
        $tiers = Tier::orderBy('required_rescues', 'asc')->get();
        
        $currentTier = $tiers->where('required_rescues', '<=', $totalOrders)->last();
        $nextTier = $tiers->where('required_rescues', '>', $totalOrders)->first();

        return [
            'currentTier' => $currentTier ? $currentTier->name : 'Member',
            'nextTier' => $nextTier ? $nextTier->name : null,
            'rescuesNeeded' => $nextTier ? max(0, $nextTier->required_rescues - $totalOrders) : 0,
            'totalRescues' => $totalOrders, 
        ];
    }
}