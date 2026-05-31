<?php

namespace App\Models;

use App\Enums\RescueStatus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Rescue extends Model
{
    protected $guarded = [];

    protected $fillable = [
        'user_id',
        'shop_id',
        'status',
        'pcs',
        'price', 
        'weight_kg',
        'expires_at',
    ];

    protected function casts(): array
    {
        return [
            'status' => RescueStatus::class,
            'expires_at' => 'datetime',
            'price' => 'decimal:2', 
            'weight_kg' => 'decimal:2',
            'pcs' => 'integer',
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