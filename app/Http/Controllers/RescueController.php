<?php

namespace App\Http\Controllers;

use App\Models\Rescue;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class RescueController extends Controller
{
    /**
     * Display the specified rescue detail.
     */
    public function show(Rescue $rescue): Response
    {
        // Eager load only the required columns from the related shop table
        $rescue->load('shop:id,name,address,description,image_path');

        return Inertia::render('frontend/rescue-detail', [
            'rescue' => $rescue
        ]);
    }
}