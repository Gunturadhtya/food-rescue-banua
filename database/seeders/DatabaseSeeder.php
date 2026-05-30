<?php

namespace Database\Seeders;

use App\Enums\Role;
use App\Models\Rescue;
use App\Models\Shop;
use App\Models\Ticket;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call(TierSeeder::class);

        $user = User::factory()->create([
            'name' => 'User',
            'email' => 'user@example.com',
            'password' => bcrypt('password'),
            'role' => Role::USER->value,
        ]);

        $shopData = [
            [
                'owner_name' => 'Harlina Owner',
                'email' => 'seller@example.com',
                'shop_name' => 'Harlina Bakery',
                'slug' => 'harlina-bakery',
                'description' => 'Toko roti legendaris di Kayutangi.',
                'address' => 'Jl. Hasan Basri, Kayutangi, Banjarmasin Utara',
            ],
            [
                'owner_name' => 'Budi Owner',
                'email' => 'budi@example.com',
                'shop_name' => 'Budi Pastry & Cafe',
                'slug' => 'budi-pastry',
                'description' => 'Pastry enak dan murah di Banjarbaru.',
                'address' => 'Jl. A. Yani Km 33, Banjarbaru',
            ],
            [
                'owner_name' => 'Siti Owner',
                'email' => 'siti@example.com',
                'shop_name' => 'Warung Sederhana',
                'slug' => 'warung-sederhana',
                'description' => 'Sisa lauk pauk prasmanan hari ini.',
                'address' => 'Jl. Veteran, Banjarmasin Timur',
            ],
            [
                'owner_name' => 'Ahmad Owner',
                'email' => 'ahmad@example.com',
                'shop_name' => 'Buah Segar Banjar',
                'slug' => 'buah-segar',
                'description' => 'Buah potong imperfect namun sangat layak konsumsi.',
                'address' => 'Jl. Pramuka, Banjarmasin',
            ],
            [
                'owner_name' => 'Rina Owner',
                'email' => 'rina@example.com',
                'shop_name' => 'Kopi Janji Banua',
                'slug' => 'kopi-janji',
                'description' => 'Snack dan roti pendamping kopi.',
                'address' => 'Jl. Lambung Mangkurat, Banjarmasin',
            ],
        ];

        foreach ($shopData as $data) {
            // 1. Buat Akun Seller
            $seller = User::factory()->create([
                'name' => $data['owner_name'],
                'email' => $data['email'],
                'password' => bcrypt('password'),
                'role' => Role::SELLER->value,
            ]);

            // 2. Buat Toko
            $shop = Shop::create([
                'user_id' => $seller->id,
                'name' => $data['shop_name'],
                'slug' => $data['slug'],
                'description' => $data['description'],
                'address' => $data['address'],
                'image_path' => '/images/'.$data['slug'].'.png',
                'is_active' => true,
            ]);

            // 3. Buat Rescues Aktif (Marketplace / Belum diklaim)
            for ($i = 0; $i < rand(2, 5); $i++) {
                Rescue::create([
                    'user_id' => null,
                    'shop_id' => $shop->id,
                    'status' => 'active',
                    'savings_amount' => rand(15, 50) * 1000,
                    'weight_kg' => rand(5, 20) / 10,
                ]);
            }

            // 4. Buat Histori Rescues (Telah diklaim oleh User)
            for ($i = 0; $i < rand(3, 7); $i++) {
                Rescue::create([
                    'user_id' => $user->id,
                    'shop_id' => $shop->id,
                    'status' => 'claimed',
                    'savings_amount' => rand(15, 45) * 1000,
                    'weight_kg' => rand(5, 25) / 10,
                    'created_at' => now()->subDays(rand(1, 30))->subHours(rand(1, 24)),
                ]);
            }
        }

        // Tiket dummy untuk User
        Ticket::create([
            'user_id' => $user->id,
            'code' => 'FRB-'.strtoupper(Str::random(6)),
            'title' => 'Surprise Bag - Harlina Bakery',
            'address' => 'Jl. Hasan Basri, Kayutangi, Banjarmasin Utara',
            'expires_at' => now()->addHours(2)->addMinutes(42),
            'status' => 'active',
        ]);
    }
}
