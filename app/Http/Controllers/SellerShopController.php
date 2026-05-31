<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class SellerShopController extends Controller
{
    public function create(Request $request): Response|RedirectResponse
    {
        if ($request->user()->shops()->exists()) {
            return redirect()->route('seller.dashboard');
        }

        return Inertia::render('seller/shop/create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'address' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:1000'],
        ]);

        $request->user()->shops()->create([
            'name' => $validated['name'],
            'slug' => Str::slug($validated['name']) . '-' . Str::random(6),
            'address' => $validated['address'],
            'description' => $validated['description'],
            'is_active' => true,
        ]);

        return redirect()->route('seller.dashboard')->with('toast', [
            'type' => 'success', 
            'message' => 'Shop profile created successfully!'
        ]);
    }

    public function edit(Request $request): Response
    {
        $shop = $request->user()->shops()->firstOrFail();

        return Inertia::render('seller/shop/edit', [
            'shop' => $shop
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $shop = $request->user()->shops()->firstOrFail();

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'address' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:1000'],
        ]);

        $shop->update($validated);

        return redirect()->route('seller.dashboard')->with('toast', [
            'type' => 'success', 
            'message' => 'Shop profile updated.'
        ]);
    }
}