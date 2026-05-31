<?php

namespace App\Http\Controllers;

use App\Models\Shop;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminShopController extends Controller
{
    public function index(): Response
    {
        $shops = Shop::with('user')->orderBy('created_at', 'desc')->paginate(10);

        return Inertia::render('admin/shops/index', [
            'shops' => $shops
        ]);
    }

    public function destroy(Shop $shop)
    {
        $shop->delete();

        return redirect()->back();
    }
}