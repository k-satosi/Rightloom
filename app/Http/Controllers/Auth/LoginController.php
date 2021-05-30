<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use \Symfony\Component\HttpFoundation\Response;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if (Auth::attempt($credentials)) {
            $user = User::whereEmail($request->email)->first();
            $user->tokens()->delete();
            $token = $user->createToken('login:user{$user->id}')->plainTextToken;

            return response()->json(['token' => $token], Response::HTTP_OK);
        }
        return response()->json('Login failed', Response::HTTP_INTERNAL_SERVER_ERROR);
    }

    public function logout(Request $request) {
        Auth::logout();
        return response()->json('Logout', Response::HTTP_OK);
    }
}
