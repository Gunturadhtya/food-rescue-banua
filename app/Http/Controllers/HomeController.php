<?php

namespace App\Http\Controllers;

use App\Enums\RescueStatus;
use App\Models\Rescue;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(Request $request): Response
    {
        $search = $request->query('search');

        $query = Rescue::with('shop:id,name,address,image_path,slug')
            ->where('status', RescueStatus::ACTIVE);

        if (! empty($search)) {
            $query->whereHas('shop', function ($q) use ($search) {
                $q->where('name', 'like', '%'.$search.'%')
                    ->orWhere('address', 'like', '%'.$search.'%')
                    ->orWhere('description', 'like', '%'.$search.'%');
            });
        }

        $activeRescues = $query->latest()
    ->get()
    ->unique('shop_id')  
    ->values()
    ->map(function ($rescue) {
        return [
            'id' => $rescue->id,
            'shop_name' => $rescue->shop->name,
            'address' => $rescue->shop->address,
            'savings_amount' => $rescue->savings_amount,
            'weight_kg' => $rescue->weight_kg,
            'image' => $rescue->shop->image_path ?? '/images/croissant-bg.png',
            'description' => $rescue->shop->description ?? '',
        ];
    });

        return Inertia::render('home', [
            'activeRescues' => $activeRescues,
        ]);
    }
}
