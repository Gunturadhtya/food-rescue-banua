<?php

namespace Database\Seeders;

use App\Models\Tier;
use Illuminate\Database\Seeder;

class TierSeeder extends Seeder
{
    public function run(): void
    {
        $tiers = [
            [
                'name' => 'Food Saver',
                'required_rescues' => 0,
            ],
            [
                'name' => 'Earth Keeper',
                'required_rescues' => 10, // Unlocked at 10 rescues
            ],
            [
                'name' => 'Waste Warrior',
                'required_rescues' => 25, // Needs 15 more from 10
            ],
            [
                'name' => 'Food Hero',
                'required_rescues' => 50,
            ],
        ];

        foreach ($tiers as $tier) {
            Tier::updateOrCreate(['name' => $tier['name']], $tier);
        }
    }
}