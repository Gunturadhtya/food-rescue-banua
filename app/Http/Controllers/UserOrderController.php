<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class UserOrderController extends Controller
{
    public function index(Request $request): Response
    {
        // Query Tickets as the source of truth for individual buyer orders
        $orders = Ticket::where('user_id', $request->user()->id)
            ->with(['rescue.shop:id,name,address'])
            ->latest()
            ->paginate(10)
            ->through(function ($ticket) {
                
                $rescue = $ticket->rescue;
                $effectiveStatus = $ticket->status; 

                if ($effectiveStatus === 'active' && now()->greaterThan($ticket->expires_at)) {
                    $effectiveStatus = 'expired';
                }

                $frontendStatus = $effectiveStatus === 'active' ? 'claimed' : $effectiveStatus;

                return [
                    'id' => $ticket->id, 
                    'shop_name' => $rescue->shop->name ?? 'Unknown Shop',
                    'shop_address' => $rescue->shop->address ?? 'Unknown Address',
                    'weight_kg' => (float) $rescue->weight_kg, 
                    'price' => (float) $rescue->price,         
                    'quantity' => $ticket->quantity,
                    'status' => $frontendStatus,
                    'created_at' => $ticket->created_at->toIso8601String(),
                    'pickup_code' => $ticket->code,
                ];
            });

        return Inertia::render('user/orders', [
            'orders' => $orders,
        ]);
    }
}