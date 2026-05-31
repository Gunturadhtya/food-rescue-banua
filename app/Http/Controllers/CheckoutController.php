<?php

namespace App\Http\Controllers;

use App\Actions\Order\ClaimRescueAction;
use App\Enums\RescueStatus;
use App\Models\Rescue;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CheckoutController extends Controller
{
    public function show(Rescue $rescue): Response
    {
        if ($rescue->status !== RescueStatus::ACTIVE) {
            abort(404, 'Rescue not available.');
        }

        $rescue->load('shop:id,name,address,image_path');

        return Inertia::render('frontend/checkout', [
            'rescue' => [
                'id' => $rescue->id,
                'shop_name' => $rescue->shop->name,
                'address' => $rescue->shop->address,
                'savings_amount' => (float) $rescue->savings_amount,
                'weight_kg' => (float) $rescue->weight_kg,
                'image' => $rescue->shop->image_path ?? '/images/mystery-box.png',
            ]
        ]);
    }

    public function store(Request $request, Rescue $rescue, ClaimRescueAction $action): RedirectResponse
    {
        $action->execute($rescue, $request->user()->id);
        
        return to_route('user.orders');
    }
}