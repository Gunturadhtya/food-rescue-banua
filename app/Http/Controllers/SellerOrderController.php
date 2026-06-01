<?php

namespace App\Http\Controllers;

use App\Models\Shop;
use App\Models\Ticket;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SellerOrderController extends Controller
{
    public function index(Request $request): Response|RedirectResponse
    {
        $seller = $request->user();
        $shop = Shop::where('user_id', $seller->id)->first();

        if (! $shop) {
            echo 'Shop does not exist';

            return redirect()->route('seller.shop.create');
        }

        // Fetch only active tickets that haven't physically expired
        $activeTickets = Ticket::where('status', 'active')
            ->where('expires_at', '>', now())
            ->whereHas('rescue', function ($query) use ($shop) {
                $query->where('shop_id', $shop->id);
            })
            ->with(['user:id,name', 'rescue:id,price'])
            ->oldest('expires_at') // Prioritize tickets expiring soonest
            ->paginate(10)
            ->through(function ($ticket) {
                return [
                    'id' => $ticket->id,
                    'code' => $ticket->code,
                    'buyer_name' => $ticket->user->name ?? 'Unknown',
                    'quantity' => $ticket->quantity,
                    'total_price' => (float) $ticket->rescue->price * $ticket->quantity,
                    'expires_at' => $ticket->expires_at->toIso8601String(),
                ];
            });

        return Inertia::render('seller/orders', [
            'activeTickets' => $activeTickets,
        ]);
    }

    public function redeem(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'code' => ['required', 'string'],
        ]);

        $seller = $request->user();
        $shop = Shop::where('user_id', $seller->id)->firstOrFail();

        // Find the ticket belonging to this seller's shop
        $ticket = Ticket::where('code', strtoupper($validated['code']))
            ->where('status', 'active')
            ->whereHas('rescue', function ($query) use ($shop) {
                $query->where('shop_id', $shop->id);
            })
            ->first();

        if (! $ticket) {
            return back()->withErrors(['code' => 'Invalid, already redeemed, or missing ticket code.']);
        }

        // Just-In-Time Expiration Check
        if (now()->greaterThan($ticket->expires_at)) {
            $ticket->update(['status' => 'expired']);

            return back()->withErrors(['code' => 'This ticket has already expired.']);
        }

        // Mark as Redeemed
        $ticket->update(['status' => 'redeemed']);

        Inertia::flash('toast', [
            'type' => 'success',
            'message' => "Ticket {$ticket->code} successfully redeemed!",
        ]);

        return back();
    }
}
