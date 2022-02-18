<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

# Rutas para uuario logeado
Route::middleware('auth:api')->group(function (){

    # Obtiene los datos del usuario
    Route::get('/user', function (Request $request) {
        return $request->user();
    });


    # Cerrar sesión
    Route::post('/logout', 'App\Http\Controllers\AuthController@logout');

});

# Autenticación
Route::post('/login', 'App\Http\Controllers\AuthController@login');
# Registro
Route::post('/register', 'App\Http\Controllers\AuthController@register');

