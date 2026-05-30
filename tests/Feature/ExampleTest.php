<?php

use App\Enums\RescueStatus;
use App\Enums\Role;
use App\Models\Rescue;
use App\Models\Shop;
use App\Models\User;

test('returns a successful response', function () {
    $user = User::factory()->create();
    $this->actingAs($user);

    $response = $this->get(route('home'));

    $response->assertOk();
});

test('home page can filter rescues by shop name', function () {
    $user = User::factory()->create();
    $this->actingAs($user);

    // Create a shop that matches the search term
    $matchingShop = Shop::create([
        'user_id' => User::factory()->create(['role' => Role::SELLER->value])->id,
        'name' => 'Unique Bakery Shop',
        'slug' => 'unique-bakery-shop',
        'address' => 'Test Address 1',
        'is_active' => true,
    ]);

    // Create a shop that does NOT match the search term
    $nonMatchingShop = Shop::create([
        'user_id' => User::factory()->create(['role' => Role::SELLER->value])->id,
        'name' => 'Other Cafe',
        'slug' => 'other-cafe',
        'address' => 'Test Address 2',
        'is_active' => true,
    ]);

    // Create active rescues for both shops
    $matchingRescue = Rescue::create([
        'shop_id' => $matchingShop->id,
        'savings_amount' => 15000,
        'weight_kg' => 1.5,
        'status' => RescueStatus::ACTIVE,
    ]);

    $nonMatchingRescue = Rescue::create([
        'shop_id' => $nonMatchingShop->id,
        'savings_amount' => 20000,
        'weight_kg' => 2.0,
        'status' => RescueStatus::ACTIVE,
    ]);

    // Request home page with search query
    $response = $this->get(route('home', ['search' => 'Unique']));

    $response->assertOk();

    // Assert that the matching shop's details are present in the response
    $response->assertSee('Unique Bakery Shop');
    // Assert that the non-matching shop's details are NOT present
    $response->assertDontSee('Other Cafe');
});
