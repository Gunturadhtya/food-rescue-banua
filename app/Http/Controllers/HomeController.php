<?php

namespace App\Http\Controllers;

use App\Models\Rescue;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(Request $request): Response
    {
        // Fetch all active, unassigned rescues alongside their shop data
        $activeRescues = Rescue::with('shop:id,name,address')
            ->where('status', 'active')
            ->latest()
            ->get()
            ->map(function ($rescue) {
                return [
                    'id' => $rescue->id,
                    'shop_name' => $rescue->shop->name,
                    'address' => $rescue->shop->address,
                    'savings_amount' => $rescue->savings_amount,
                    'weight_kg' => $rescue->weight_kg,
                    // Use a placeholder if image doesn't exist on shop yet
                    'image' => '/images/croissant-bg.png', 
                ];
            });

        return Inertia::render('home', [
            'activeRescues' => $activeRescues,
        ]);
    }
}