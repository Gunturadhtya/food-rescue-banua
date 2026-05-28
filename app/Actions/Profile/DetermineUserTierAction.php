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
        $totalRescues = $user->rescues()->count();
        
        // Cache this if tiers rarely change
        $tiers = Tier::orderBy('required_rescues', 'asc')->get();
        
        $currentTier = $tiers->where('required_rescues', '<=', $totalRescues)->last();
        $nextTier = $tiers->where('required_rescues', '>', $totalRescues)->first();

        return [
            'currentTier' => $currentTier ? $currentTier->name : 'Member',
            'nextTier' => $nextTier ? $nextTier->name : null,
            'rescuesNeeded' => $nextTier ? max(0, $nextTier->required_rescues - $totalRescues) : 0,
            'totalRescues' => $totalRescues,
        ];
    }
}