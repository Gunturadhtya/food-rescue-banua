<?php

namespace App\Models;

use App\Enums\RescueStatus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Rescue extends Model
{
    protected $guarded = [];

    protected function casts(): array
    {
        return [
            'savings_amount' => 'float',
            'weight_kg' => 'float',
            'status' => RescueStatus::class,
            'expires_at' => 'datetime',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function shop(): BelongsTo
    {
        return $this->belongsTo(Shop::class);
    }

    public function ticket(): HasOne
    {
        return $this->hasOne(Ticket::class);
    }
}