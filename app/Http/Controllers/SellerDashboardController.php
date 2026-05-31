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
                'pcs' => $rescue->pcs,
                'price' => $rescue->price,
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
            'price' => ['required', 'numeric', 'min:0'],
            'weight_kg' => ['required', 'numeric', 'min:0.01'],
            'pcs' => ['required', 'integer', 'min:1'], // Validate the pieces
        ]);

        Rescue::create([
            'user_id' => null, // Left null intentionally until sold out
            'shop_id' => $shop->id,
            'status' => \App\Enums\RescueStatus::ACTIVE,
            'pcs' => $validated['pcs'], // Store the quantity
            'price' => $validated['price'],
            'weight_kg' => $validated['weight_kg'],
            'expires_at' => now()->endOfDay(), 
        ]);

        Inertia::flash('toast', [
            'type' => 'success', 
            'message' => __('Rescue offer published to the active queue.')
        ]);

        return to_route('seller.dashboard');
    }
}