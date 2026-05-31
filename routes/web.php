<?php

use App\Http\Controllers\ProfileDashboardController;
use App\Http\Controllers\SellerDashboardController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\RescueController;
use App\Http\Controllers\UserOrderController; 
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\SellerOrderController;
use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\AdminUserController;
use Illuminate\Support\Facades\Route;
use App\Enums\Role;
use Inertia\Inertia;

Route::inertia('/', 'welcome');

Route::middleware(['auth', 'verified'])->group(function () {
    
    Route::get('/home', [HomeController::class, 'index'])->name('home');

    Route::get('/rescues/{rescue}', [RescueController::class, 'show'])->name('rescues.show');

    Route::middleware(['role:' . Role::USER->value])->group(function () {
        Route::get('/checkout/{rescue}', [CheckoutController::class, 'show'])->name('checkout.show');
        Route::post('/checkout/{rescue}', [CheckoutController::class, 'store'])->name('checkout.store');
        
        Route::get('/dashboard', ProfileDashboardController::class)->name('dashboard');
        Route::get('/orders', [UserOrderController::class, 'index'])->name('user.orders');
    });

    Route::middleware(['role:' . Role::ADMIN->value])->group(function () {
        Route::get('/admin/dashboard', [AdminDashboardController::class, 'index'])->name('admin.dashboard');
        Route::resource('admin/users', AdminUserController::class)->names('admin.users');
    });

    Route::middleware(['role:' . Role::SELLER->value])->group(function () {
        Route::get('/seller/dashboard', [SellerDashboardController::class, 'index'])->name('seller.dashboard');
        Route::post('/seller/dashboard/rescue', [SellerDashboardController::class, 'store'])->name('seller.rescue.store');
        Route::get('/seller/orders', [SellerOrderController::class, 'index'])->name('seller.orders');
        Route::post('/seller/orders/redeem', [SellerOrderController::class, 'redeem'])->name('seller.orders.redeem');
    });

});

require __DIR__.'/settings.php';