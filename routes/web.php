<?php

use App\Http\Controllers\ProfileDashboardController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('/home', 'home')->name('home');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/profile', ProfileDashboardController::class)->name('profile.dashboard');
});

require __DIR__.'/settings.php';