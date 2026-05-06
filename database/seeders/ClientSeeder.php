<?php

namespace Database\Seeders;

use App\Enum\ClientColsEnum;
use App\Enum\CommonColsEnum;
use App\Models\Client;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ClientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $clients = [
            [
                ClientColsEnum::FIRST_NAME => 'Mushkir',
                ClientColsEnum::LAST_NAME => 'Mohamed',
                ClientColsEnum::EMAIL => 'mushkir@gmail.com',
                ClientColsEnum::PHONE => "0777195282",
                CommonColsEnum::IS_ACTIVE => 1,
                CommonColsEnum::CREATED_BY => 1,
                CommonColsEnum::UPDATED_BY => 1
            ],
            [
                ClientColsEnum::FIRST_NAME => 'Musaakir',
                ClientColsEnum::LAST_NAME => 'Mohamed',
                ClientColsEnum::EMAIL => 'musaakir@gmail.com',
                ClientColsEnum::PHONE => "0777195281",
                CommonColsEnum::IS_ACTIVE => 1,
                CommonColsEnum::CREATED_BY => 2,
                CommonColsEnum::UPDATED_BY => 2
            ]
        ];

        foreach ($clients as $client) {
            Client::create($client);
        }
    }
}
