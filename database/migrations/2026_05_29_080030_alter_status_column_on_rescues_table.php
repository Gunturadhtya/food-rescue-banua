<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // For MySQL/PostgreSQL
        DB::statement("ALTER TABLE rescues ADD CONSTRAINT chk_rescue_status CHECK (status IN ('active', 'claimed', 'redeemed', 'expired'))");
    }

    public function down(): void
    {
        DB::statement("ALTER TABLE rescues DROP CONSTRAINT chk_rescue_status");
    }
};