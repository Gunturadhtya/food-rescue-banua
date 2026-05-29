<?php

namespace App\Http\Controllers;

use App\Models\Rescue;
use App\Models\Shop;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SellerDashboardController extends Controller
{
    public function index(Request $request): Response
    {
        /** @var User $seller */
        $seller = $request->user();
        
        $shop = Shop::where('user_id', $seller->id)->firstOrFail();

        // Fetch rescues including unassigned ones
        $rescues = Rescue::where('shop_id', $shop->id)
            ->with('user:id,name')
            ->latest()
            ->paginate(10)
            ->through(fn ($rescue) => [
                'id' => $rescue->id,
                'status' => $rescue->status,
                'buyer_name' => $rescue->user ? $rescue->user->name : 'Unassigned',
                'savings_amount' => $rescue->savings_amount,
                'weight_kg' => $rescue->weight_kg,
                'created_at' => $rescue->created_at->toIso8601String(),
            ]);

        return Inertia::render('seller/dashboard', [
            'shop' => [
                'id' => $shop->id,
                'name' => $shop->name,
                'address' => $shop->address,
            ],
            'rescues' => $rescues,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        /** @var User $seller */
        $seller = $request->user();
        $shop = Shop::where('user_id', $seller->id)->firstOrFail();

        $validated = $request->validate([
            'savings_amount' => ['required', 'numeric', 'min:0'],
            'weight_kg' => ['required', 'numeric', 'min:0.01'],
        ]);

        Rescue::create([
            'user_id' => null,
            'shop_id' => $shop->id,
            'status' => \App\Enums\RescueStatus::ACTIVE,
            'savings_amount' => $validated['savings_amount'],
            'weight_kg' => $validated['weight_kg'],
            // Add a default expiration time for the listing (e.g., end of the current day)
            'expires_at' => now()->endOfDay(), 
        ]);

        Inertia::flash('toast', [
            'type' => 'success', 
            'message' => __('Rescue offer published to the active queue.')
        ]);

        return to_route('seller.dashboard');
    }
}