<?php

use App\Http\Controllers\ProfileDashboardController;
use App\Http\Controllers\SellerDashboardController;
use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;
use App\Enums\Role;

Route::inertia('/', 'welcome');

// Master group for all authenticated and verified users
Route::middleware(['auth', 'verified'])->group(function () {
    
    // Shared routes accessible by any verified user (Admin, Seller, User)
    Route::get('/home', [HomeController::class, 'index'])->name('home');

    Route::get('/profile', ProfileDashboardController::class)->name('profile.dashboard');

    // Admin-only routes
    Route::middleware(['role:' . Role::ADMIN->value])->group(function () {
        Route::get('/admin/dashboard', [AdminController::class, 'index'])->name('admin.dashboard');
        // Add more admin routes here...
    });

    // Seller-only routes
    Route::middleware(['role:' . Role::SELLER->value])->group(function () {
    Route::get('/seller/dashboard', [SellerDashboardController::class, 'index'])->name('seller.dashboard');
    Route::post('/seller/dashboard/rescue', [SellerDashboardController::class, 'store'])->name('seller.rescue.store');
});

});

require __DIR__.'/settings.php';