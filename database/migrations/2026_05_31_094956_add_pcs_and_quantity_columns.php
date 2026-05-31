<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('rescues', function (Blueprint $table) {
            $table->unsignedInteger('pcs')->default(1)->after('status');
        });

        Schema::table('tickets', function (Blueprint $table) {
            $table->unsignedInteger('quantity')->default(1)->after('rescue_id');
        });
    }

    public function down(): void
    {
        Schema::table('rescues', function (Blueprint $table) {
            $table->dropColumn('pcs');
        });

        Schema::table('tickets', function (Blueprint $table) {
            $table->dropColumn('quantity');
        });
    }
};