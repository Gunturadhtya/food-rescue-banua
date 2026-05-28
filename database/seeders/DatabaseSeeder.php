<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Rescue;
use App\Models\Ticket;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Seed the Tiers first
        $this->call(TierSeeder::class);

        // 2. Create the primary Test User
        $user = User::factory()->create([
            'name' => 'Muhammad Guntur Ricky Adhitya',
            'email' => 'ricky@example.com',
            'password' => bcrypt('password'), // default login
        ]);

        // 3. Seed Rescues for the user
        // We generate exactly 10 rescues so the user lands exactly on the "Earth Keeper" tier
        // and needs exactly 15 more to reach "Waste Warrior" (25 rescues).
        for ($i = 0; $i < 10; $i++) {
            Rescue::create([
                'user_id' => $user->id,
                // Random savings between Rp 15.000 and Rp 45.000
                'savings_amount' => rand(15, 45) * 1000, 
                // Random weight between 0.5kg and 2.5kg
                'weight_kg' => rand(5, 25) / 10, 
                // Spread the rescues over the last 30 days
                'created_at' => now()->subDays(rand(1, 30))->subHours(rand(1, 24)),
            ]);
        }

        // 4. Seed Tickets for the user
        
        // Active Ticket (The one that will show up on the dashboard countdown)
        Ticket::create([
            'user_id' => $user->id,
            'code' => 'FRB-' . strtoupper(Str::random(6)),
            'title' => 'Surprise Bag - Harlina Bakery',
            'address' => 'Jl. Hasan Basri, Kayutangi, Banjarmasin Utara',
            'expires_at' => now()->addHours(2)->addMinutes(42),
            'status' => 'active',
        ]);

        // Redeemed Ticket (History)
        Ticket::create([
            'user_id' => $user->id,
            'code' => 'FRB-' . strtoupper(Str::random(6)),
            'title' => 'Sisa Prasmanan - Hotel X',
            'address' => 'Jl. A. Yani Km 2, Banjarmasin',
            'expires_at' => now()->subDays(2),
            'status' => 'redeemed',
        ]);

        // Expired Ticket (History)
        Ticket::create([
            'user_id' => $user->id,
            'code' => 'FRB-' . strtoupper(Str::random(6)),
            'title' => 'Paket Sayur Imperfect - Pasar Lama',
            'address' => 'Kawasan Pasar Lama, Banjarmasin Tengah',
            'expires_at' => now()->subDays(5),
            'status' => 'expired',
        ]);
    }
}