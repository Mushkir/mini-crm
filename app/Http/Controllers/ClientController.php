<?php

namespace App\Http\Controllers;

use App\Enum\ClientColsEnum;
use App\Enum\CommonColsEnum;
use App\Http\Requests\StoreClientRequest;
use App\Http\Requests\UpdateClientRequest;
use App\Models\Client;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;
use Illuminate\Support\Str;

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
    public function store(Request $request)
    {
        try {
            DB::beginTransaction();

            if (Client::select('*')->where(ClientColsEnum::EMAIL, $request['email'])->exists()) {
                DB::rollBack();
                return Inertia::render('clients/TheClientsPage', [
                    'flash' => [
                        'error' => $request['email'] . " is already exist"
                    ],
                    'data' => $this->getAll()
                ]);
            }

            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $extension = $image->getClientOriginalExtension();
                $uploadName   = time() . '_' . (string) Str::uuid() . "." . $extension;
                $image->move(public_path('/uploads/media'), $uploadName);
                $path = 'uploads/media/' . $uploadName;
            }

            Client::create([
                ClientColsEnum::FIRST_NAME => $request['firstName'],
                ClientColsEnum::LAST_NAME => $request['lastName'],
                ClientColsEnum::EMAIL => $request['email'],
                ClientColsEnum::PHONE => $request['phone'],
                ClientColsEnum::LOGO => $path ?? null,
                CommonColsEnum::CREATED_BY => Auth::id(),
                CommonColsEnum::UPDATED_BY => Auth::id(),
                CommonColsEnum::CREATED_AT => Carbon::now(),
                CommonColsEnum::UPDATED_AT => Carbon::now()
            ]);

            DB::commit();

            return Inertia::render('clients/TheClientsPage', [
                'flash' => [
                    'success' => $request['firstName'] . " " . $request['lastName']  . " created successfully"
                ],
                'data' => $this->getAll()
            ]);
        } catch (Exception $e) {
            DB::rollBack();
            return Inertia::render('clients/TheClientsPage', [
                'flash' => [
                    'error' => $e->getMessage()
                ],
                'data' => $this->getAll()
            ]);
        }
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
    public function update(Request $request, string $id)
    {
        try {
            DB::beginTransaction();

            $row = Client::select('*')->where(CommonColsEnum::ID, $id)->first();
            $email = $request['email'];

            if (Client::where(ClientColsEnum::EMAIL, $email)->where(CommonColsEnum::ID, '!=', $id)->exists()) {
                DB::rollBack();
                return redirect()->route('clients.index')->with('error', "$email is already exist");
            }

            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $extension = $image->getClientOriginalExtension();
                $uploadName   = time() . '_' . (string) Str::uuid() . "." . $extension;
                $image->move(public_path('/uploads/media'), $uploadName);
                $path = 'uploads/media/' . $uploadName;

                if ($row['logo_path']) {
                    $imagePath = public_path($row['logo_path']);
                    if (File::exists($imagePath)) {
                        File::delete($imagePath);
                    }

                    $row->update([
                        ClientColsEnum::LOGO => $path,
                        CommonColsEnum::UPDATED_AT => Carbon::now(),
                        CommonColsEnum::UPDATED_BY => Auth::id()
                    ]);
                } else {
                    $row->update([
                        ClientColsEnum::LOGO => $path,
                        CommonColsEnum::UPDATED_AT => Carbon::now(),
                        CommonColsEnum::UPDATED_BY => Auth::id()
                    ]);
                }
            }

            $row->update([
                ClientColsEnum::FIRST_NAME => $request['firstName'],
                ClientColsEnum::LAST_NAME => $request['lastName'],
                ClientColsEnum::EMAIL => $request['email'],
                ClientColsEnum::PHONE => $request['phone'],
                CommonColsEnum::UPDATED_BY => Auth::id(),
                CommonColsEnum::UPDATED_AT => Carbon::now()
            ]);

            DB::commit();
            return redirect()->route('clients.index')->with('success', $request['firstName'] . "'s record updated successfully");
        } catch (Exception $e) {
            DB::rollBack();
            return redirect()->route('clients.index')->with('error', $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            DB::beginTransaction();

            $row = Client::select('*')->where(CommonColsEnum::ID, $id)->first();

            if ($row['logo_path']) {
                $imagePath = public_path($row['logo_path']);
                if (File::exists($imagePath)) {
                    File::delete($imagePath);
                }
            }

            $row->delete();

            DB::commit();

            return back();
        } catch (\Throwable $th) {
            DB::rollBack();
            throw new Exception($th);
        }
    }
}
