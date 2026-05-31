<?php

namespace App\Http\Responses;

use App\Enums\Role;
use Laravel\Fortify\Contracts\LoginResponse as LoginResponseContract;
use Laravel\Fortify\Contracts\RegisterResponse as RegisterResponseContract;

class AuthResponse implements LoginResponseContract, RegisterResponseContract
{
    public function toResponse($request)
    {
        $url = match ($request->user()->role) {
            Role::ADMIN => route('admin.dashboard', absolute: false),
            Role::SELLER => route('seller.dashboard', absolute: false),
            default => config('fortify.home'),
        };

        return redirect()->intended($url);
    }
}