<?php

namespace App\Http\Controllers;

use App\Models\Rescue;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Enums\RescueStatus;
use App\Models\Ticket;
use Illuminate\Support\Str;
use Illuminate\Http\RedirectResponse;


class RescueController extends Controller
{
    /**
     * Display the specified rescue detail.
     */
    public function show(Rescue $rescue): Response
    {
        // Eager load only the required columns from the related shop table
        $rescue->load('shop:id,name,address,description,image_path');

        return Inertia::render('frontend/rescue-detail', [
            'rescue' => $rescue
        ]);
    }

    public function claim(Request $request, Rescue $rescue): RedirectResponse
    {
        // 1. Prevent claiming already claimed/expired rescues
        if ($rescue->status !== RescueStatus::ACTIVE) {
            abort(403, 'This rescue is no longer available.');
        }

        // 2. Update the Rescue status to show it is reserved
        $rescue->update([
            'user_id' => $request->user()->id,
            'status' => RescueStatus::CLAIMED,
        ]);

        // 3. Generate a pickup Ticket with a strictly defined window (e.g., 2 hours)[cite: 5]
        Ticket::create([
            'user_id' => $request->user()->id,
            'rescue_id' => $rescue->id,
            'code' => 'FRB-' . strtoupper(Str::random(6)),
            'title' => 'Surprise Bag - ' . $rescue->shop->name,
            'address' => $rescue->shop->address,
            'status' => 'active',
            // Strict bounding: Minimum between 2 hours from now OR the rescue's expiration time
            'expires_at' => now()->addHours(2)->min($rescue->expires_at), 
        ]);
        return to_route('user.orders');
    }
}