<?php

use App\Http\Controllers\ProfileDashboardController;
use App\Http\Controllers\SellerDashboardController;
use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;
use App\Enums\Role;
use Inertia\Inertia;

Route::inertia('/', 'welcome');

Route::middleware(['auth', 'verified'])->group(function () {
    
    Route::get('/home', [HomeController::class, 'index'])->name('home');

    Route::get('/rescue/{id}', function ($id) {
        return Inertia::render('frontend/rescue-detail', [
            'id' => $id
        ]);
    })->name('rescue.detail');

    Route::get('/checkout/{id}', function ($id) {
        return Inertia::render('frontend/checkout', ['id' => $id]);
    })->name('checkout');

    Route::middleware(['role:' . Role::USER->value])->group(function () {
        Route::get('/dashboard', ProfileDashboardController::class)->name('dashboard');
        Route::get('/orders', function () {
            return Inertia::render('user/orders');
        })->name('orders');
    });

    Route::middleware(['role:' . Role::ADMIN->value])->group(function () {
        // Admin routes
    });

    Route::middleware(['role:' . Role::SELLER->value])->group(function () {
        Route::get('/seller/dashboard', [SellerDashboardController::class, 'index'])->name('seller.dashboard');
        Route::post('/seller/dashboard/rescue', [SellerDashboardController::class, 'store'])->name('seller.rescue.store');
        Route::get('/seller/orders', function () {
            return Inertia::render('seller/orders');
        })->name('seller.orders');
    });

});

require __DIR__.'/settings.php';