<?php

namespace App\Http\Controllers;

use App\Enum\CommonColsEnum;
use App\Http\Requests\StoreClientRequest;
use App\Http\Requests\UpdateClientRequest;
use App\Models\Client;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ClientController extends Controller
{
    private function getAll()
    {
        return Client::select('*')
            ->where(CommonColsEnum::CREATED_BY, Auth::id())
            ->paginate(5);
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // dd($this->getAll());
        return Inertia::render('clients/TheClientsPage', ['data' => $this->getAll()]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreClientRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Client $client)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Client $client)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateClientRequest $request, Client $client)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Client $client)
    {
        //
    }
}
