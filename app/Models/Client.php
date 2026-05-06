<?php

namespace App\Models;

use App\Enum\CommonColsEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    /** @use HasFactory<\Database\Factories\ClientFactory> */
    use HasFactory;

    public function createdBy()
    {
        return $this->belongsTo(User::class, CommonColsEnum::CREATED_BY, CommonColsEnum::ID);
    }

    public function updatedBy()
    {
        return $this->belongsTo(User::class, CommonColsEnum::UPDATED_BY, CommonColsEnum::ID);
    }
}
