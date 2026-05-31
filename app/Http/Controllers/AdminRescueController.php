<?php

namespace App\Http\Controllers;

use App\Models\Rescue;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminRescueController extends Controller
{
    public function index(): Response
    {
        $rescues = Rescue::with(['user', 'shop'])->orderBy('created_at', 'desc')->paginate(10);

        return Inertia::render('admin/rescues/index', [
            'rescues' => $rescues
        ]);
    }
}