<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProfileDashboardController extends Controller
{
    public function __invoke(Request $request): Response
    {
        return Inertia::render('profile', [
            'user' => [
                'name' => $request->user()?->name,
            ],
            'stats' => [
                'savings' => 320000,
                'rescuedKg' => 10.5,
                'orders' => 125,
                'mealsSavedThisMonth' => 42,
            ],
            'activeTicket' => [
                'code' => 'CRB-9921',
                'title' => 'Crystal Bakery Mystery Box',
                'address' => 'Jl. Bumi Mas Raya No.3, Pemurus Baru',
                'countdown' => [
                    'hours' => 0,
                    'minutes' => 42,
                    'seconds' => 15,
                ],
                'availablePickup' => true,
                'rescuesNearby' => 4,
            ],
            'tier' => [
                'name' => 'Earth Keeper',
                'remainingRescues' => 15,
                'progress' => 0.7,
            ],
        ]);
    }
}
