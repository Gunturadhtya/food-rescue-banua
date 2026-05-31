<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminUserController extends Controller
{
    public function index(): Response
    {
        $users = User::orderBy('created_at', 'desc')->paginate(10);

        return Inertia::render('admin/users/index', [
            'users' => $users
        ]);
    }

    public function destroy(User $user)
    {
        $user->delete();

        return redirect()->back();
    }
}