<?php

namespace App\Http\Controllers;

use App\Enums\RescueStatus;
use App\Models\Rescue;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class UserOrderController extends Controller
{
    public function index(Request $request): Response
    {
        $orders = Rescue::where('user_id', $request->user()->id)
            ->with('shop:id,name,address')
            ->latest()
            ->paginate(10)
            ->through(fn ($rescue) => [
                'id' => $rescue->id,
                'shop_name' => $rescue->shop->name,
                'shop_address' => $rescue->shop->address,
                'weight_kg' => (float) $rescue->weight_kg,
                'savings_amount' => (float) $rescue->savings_amount,
                'status' => match ($rescue->status) {
                    RescueStatus::CLAIMED => 'pending',
                    RescueStatus::REDEEMED => 'completed',
                    RescueStatus::EXPIRED => 'expired',
                    default => 'pending', 
                },
                'created_at' => $rescue->created_at->toIso8601String(),
                'pickup_code' => 'FRB-' . str_pad((string) $rescue->id, 5, '0', STR_PAD_LEFT),
            ]);

        return Inertia::render('user/orders', [
            'orders' => $orders,
        ]);
    }
}