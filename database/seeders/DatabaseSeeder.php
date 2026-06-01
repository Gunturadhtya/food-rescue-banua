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

        $admin = User::factory()->create([
            'name' => 'admin',
            'email' => 'admin@example.com',
            'password' => bcrypt('password'),
            'role' => Role::ADMIN->value,
        ]);

        $shopData = [
            [
                'owner_name' => 'Harlina Owner',
                'email' => 'seller@example.com',
                'shop_name' => 'Harlina Bakery',
                'slug' => 'harlina-bakery',
                'description' => 'Legendary bakery in Kayutangi.',
                'address' => 'Jl. Hasan Basri, Kayutangi, Banjarmasin Utara',
            ],
            [
                'owner_name' => 'Budi Owner',
                'email' => 'budi@example.com',
                'shop_name' => 'Budi Pastry & Cafe',
                'slug' => 'budi-pastry',
                'description' => 'Delicious and affordable pastry in Banjarbaru.',
                'address' => 'Jl. A. Yani Km 33, Banjarbaru',
            ],
            [
                'owner_name' => 'Siti Owner',
                'email' => 'siti@example.com',
                'shop_name' => 'Warung Sederhana',
                'slug' => 'warung-sederhana',
                'description' => 'Leftover buffet dishes from today.',
                'address' => 'Jl. Veteran, Banjarmasin Timur',
            ],
            [
                'owner_name' => 'Ahmad Owner',
                'email' => 'ahmad@example.com',
                'shop_name' => 'Buah Segar Banjar',
                'slug' => 'buah-segar',
                'description' => 'Imperfect cut fruits but still very fresh and safe to consume.',
                'address' => 'Jl. Pramuka, Banjarmasin',
            ],
            [
                'owner_name' => 'Rina Owner',
                'email' => 'rina@example.com',
                'shop_name' => 'Kopi Janji Banua',
                'slug' => 'kopi-janji',
                'description' => 'Snacks and pastries to accompany coffee.',
                'address' => 'Jl. Lambung Mangkurat, Banjarmasin',
            ],
        ];

        $lastActiveRescue = null;

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
                $lastActiveRescue = Rescue::create([
                    'user_id' => null,
                    'shop_id' => $shop->id,
                    'status' => 'active',
                    'pcs' => rand(1, 15),
                    'expires_at' => now()->addHours(2)->addMinutes(42),
                    'price' => rand(15, 50) * 1000,
                    'weight_kg' => rand(5, 20) / 10,
                ]);
            }

            // 4. Buat Histori Rescues (Telah diklaim oleh User)
            for ($i = 0; $i < rand(3, 7); $i++) {
                $createdAt = now()->subDays(rand(1, 30))->subHours(rand(1, 24));
                $quantity = rand(1, 5);

                $rescue = Rescue::create([
                    'user_id' => $user->id,
                    'shop_id' => $shop->id,
                    'status' => 'claimed',
                    'pcs' => 0,
                    'price' => rand(15, 45) * 1000,
                    'weight_kg' => rand(5, 25) / 10,
                    'expires_at' => (clone $createdAt)->addHours(2),
                    'created_at' => $createdAt,
                    'updated_at' => $createdAt,
                ]);

                // Buat histori tiket yang sesuai dengan rescue-nya agar terhitung di dashboard
                Ticket::create([
                    'user_id' => $user->id,
                    'rescue_id' => $rescue->id,
                    'quantity' => $quantity,
                    'code' => 'FRB-'.strtoupper(Str::random(6)),
                    'title' => 'Surprise Bag - '.$shop->name,
                    'address' => $shop->address,
                    'status' => 'redeemed',
                    'expires_at' => (clone $createdAt)->addHours(2),
                    'created_at' => $createdAt,
                    'updated_at' => $createdAt,
                ]);
            }
        }

        // Tiket dummy "aktif" untuk User agar muncul di Active Ticket Dashboard
        if ($lastActiveRescue) {
            Ticket::create([
                'user_id' => $user->id,
                'rescue_id' => $lastActiveRescue->id,
                'quantity' => rand(1, 3),
                'code' => 'FRB-'.strtoupper(Str::random(6)),
                'title' => 'Surprise Bag - '.$lastActiveRescue->shop->name,
                'address' => $lastActiveRescue->shop->address,
                'expires_at' => now()->addHours(2)->addMinutes(42),
                'status' => 'active',
            ]);
        }
    }
}
