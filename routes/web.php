<?php

use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('/home', 'home')->name('home');
});

require __DIR__.'/settings.php';