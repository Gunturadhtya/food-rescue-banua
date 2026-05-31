<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminTicketController extends Controller
{
    public function index(): Response
    {
        $tickets = Ticket::with(['user', 'rescue.shop'])->orderBy('created_at', 'desc')->paginate(10);

        return Inertia::render('admin/tickets/index', [
            'tickets' => $tickets
        ]);
    }

    public function destroy(Ticket $ticket)
    {
        $ticket->delete();
        return redirect()->back();
    }
}