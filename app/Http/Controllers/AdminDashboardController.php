<?php

namespace App\Http\Controllers;

use App\Models\Rescue;
use App\Models\Shop;
use App\Models\Ticket;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminDashboardController extends Controller
{
    public function index(Request $request): Response
    {
        return Inertia::render('admin/dashboard', [
            'stats' => [
                'total_users' => User::count(),
                'total_sellers' => User::where('role', 'seller')->count(),
                'total_shops' => Shop::count(),
                'active_rescues' => Rescue::where('status', 'active')->count(),
                'total_tickets' => Ticket::count(),
            ],
            'recent_users' => User::latest()->take(5)->get(['id', 'name', 'email', 'role', 'created_at']),
        ]);
    }
}