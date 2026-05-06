<?php

use App\Enum\ClientColsEnum;
use App\Enum\CommonColsEnum;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('clients', function (Blueprint $table) {
            $table->id();
            $table->string(ClientColsEnum::FIRST_NAME);
            $table->string(ClientColsEnum::LAST_NAME);
            $table->string(ClientColsEnum::EMAIL)->unique();
            $table->string(ClientColsEnum::PHONE);
            $table->string(ClientColsEnum::LOGO)->nullable();
            $table->tinyInteger(CommonColsEnum::IS_ACTIVE)->default(1);
            $table->unsignedBigInteger(CommonColsEnum::CREATED_BY);
            $table->unsignedBigInteger(CommonColsEnum::UPDATED_BY);
            $table->timestamps();

            $table->foreign(CommonColsEnum::CREATED_BY)->references(CommonColsEnum::ID)->on('users')->onDelete('cascade');
            $table->foreign(CommonColsEnum::UPDATED_BY)->references(CommonColsEnum::ID)->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('clients');
    }
};
