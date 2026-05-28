<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Actions\Profile\CalculateRescueStatsAction;
use App\Actions\Profile\GetActiveTicketAction;
use App\Actions\Profile\DetermineUserTierAction;

class ProfileDashboardController extends Controller
{
    public function __construct(
        private readonly CalculateRescueStatsAction $calculateStats,
        private readonly GetActiveTicketAction $getActiveTicket,
        private readonly DetermineUserTierAction $determineTier
    ) {}

    public function __invoke(Request $request): Response
    {
        $user = $request->user();

        return Inertia::render('profile/dashboard', [
            'stats' => $this->calculateStats->execute($user),
            'activeTicket' => $this->getActiveTicket->execute($user),
            'tierProgress' => $this->determineTier->execute($user),
        ]);
    }
}