<?php

namespace App\Http\Controllers;

use App\Models\Rescue;
use App\Enums\RescueStatus;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class UserOrderController extends Controller
{
    public function index(Request $request): Response
    {
        // Eager load the ticket relationship to access its expiration time and code
        $orders = Rescue::where('user_id', $request->user()->id)
            ->with(['shop:id,name,address', 'ticket:id,rescue_id,expires_at,code'])
            ->latest()
            ->paginate(10)
            ->through(function ($rescue) {
                
                // Just-In-Time Check: Has the physical time passed the ticket's limit?
                $timeHasPassed = $rescue->ticket && now()->greaterThan($rescue->ticket->expires_at);
                
                // If time has passed but the DB still says 'claimed', force the UI to 'expired'
                $effectiveStatus = ($timeHasPassed && $rescue->status === RescueStatus::CLAIMED)
                    ? 'expired' 
                    : $rescue->status->value;

                return [
                    'id' => $rescue->id,
                    'shop_name' => $rescue->shop->name,
                    'shop_address' => $rescue->shop->address,
                    'weight_kg' => (float) $rescue->weight_kg,
                    'savings_amount' => (float) $rescue->savings_amount,
                    'status' => $effectiveStatus,
                    'created_at' => $rescue->created_at->toIso8601String(),
                    // Stop mocking! Use the actual ticket code from the database
                    'pickup_code' => $rescue->ticket ? $rescue->ticket->code : 'N/A',
                ];
            });

        return Inertia::render('user/orders', [
            'orders' => $orders,
        ]);
    }
}