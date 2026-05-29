<?php

declare(strict_types=1);

namespace App\Enums;

enum RescueStatus: string
{
    case ACTIVE = 'active';
    case CLAIMED = 'claimed';
    case REDEEMED = 'redeemed';
    case EXPIRED = 'expired';
}