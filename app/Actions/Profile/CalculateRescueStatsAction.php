<?php

namespace App\Actions\Profile;

use App\Models\User;

readonly class CalculateRescueStatsAction
{
    /**
     * @return array{totalSavings: float, totalKg: float, totalOrders: int, mealsSavedThisMonth: int}
     */
    public function execute(User $user): array
    {
        $rescues = $user->rescues();

        return [
            'totalSavings' => (float) $rescues->sum('savings_amount'),
            'totalKg' => (float) $rescues->sum('weight_kg'),
            'totalOrders' => $rescues->count(),
            'mealsSavedThisMonth' => $rescues->whereMonth('created_at', now()->month)
                                             ->whereYear('created_at', now()->year)
                                             ->count(),
        ];
    }
}