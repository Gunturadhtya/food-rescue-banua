<?php

use App\Http\Middleware\HandleAppearance;
use App\Http\Middleware\HandleInertiaRequests;
use App\Http\Middleware\RoleMiddleware; // <-- Import the middleware
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->encryptCookies(except: ['appearance', 'sidebar_state']);

        $middleware->web(append: [
            HandleAppearance::class,
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
        ]);

        // <-- Add the alias registration here
        $middleware->alias([
            'role' => RoleMiddleware::class, 
        ]);

        $middleware->redirectUsersTo(fn (\Illuminate\Http\Request $request) => match ($request->user()?->role) {
        \App\Enums\Role::ADMIN => route('admin.dashboard', absolute: false),
        \App\Enums\Role::SELLER => route('seller.dashboard', absolute: false),
        default => config('fortify.home', '/home'),
    });
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })->create();