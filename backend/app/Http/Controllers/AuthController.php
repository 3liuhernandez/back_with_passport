<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Http;

/**
 * Clase para la autenticación del usuario
 */
class AuthController extends Controller
{

    /**
     * Registro de usuario
     */
    public function register(Request $request) {
        # Validar datos
        $validator = Validator::make($request->all(), [
            'name'   => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|confirmed',
            'password_confirmation' => 'required',
        ],[
            'string' => 'El nombre solo debe contener letras.',
            'required' => 'Este campo es requerido.',
            'email' => 'El correo no tiene un formato válido.',
            'unique' => 'El correo ya está en uso.',
            'confirmed' => 'Las contraseñas no coinciden.'
        ]);

        # En caso de haber errores
        if($validator->fails()){
            return response()->json([
                'success' => false,
                'message' => $validator->getMessageBag()->toArray()
            ]);
        }

        # Guardar datos
        User::create($request->only('name', 'email', 'password'));

        return response()->json([
            'success' => true,
            'message' => 'Registrado correctamente.'
        ]);
    }

    /**
     * Inicia la sesión de usuario
     */
    public function login(Request $request){
        # Validar datos
        $validator = Validator::make($request->all(), [
            'email'   => 'required',
            'password' => 'required',
        ],[
            'required' => 'Este campo es requerido.',
            'email' => 'El correo no tiene un formato válido.',
        ]);

        # En caso de haber errores
        if($validator->fails()){
            return response()->json([
                'success' => false,
                'message' => $validator->getMessageBag()->toArray()
            ]);
        }
        // Datos a enviar del token
        $data = [
            'grant_type' => 'password',
            'client_id' => config('services.passport.client_id'),
            'client_secret' => config('services.passport.client_secret'),
            'username' => $request->email,
            'password' => $request->password,
        ];

        # Peticion para obtener el token
        $req = Request::create('/oauth/token', 'POST', $data);
        $resp = app()->handle($req);
        $r = json_decode($resp->getContent(), true);


        # Credenciales incorrecas
        if(array_key_exists('error', $r)){
            return response()->json([
                'success' => false,
                'message' => 'Credenciales incorrectas.'
            ], 200);
        }

        # Respuesta correcta
        return response()->json([
            'success' => true,
            'body' => json_decode($resp->getContent()),
            'user' => User::select('*')->orWhere('email', $request->email)->first(),
            'message' => 'Has Iniciado sesión exitosamente.'
        ], 200);
    }
    /**
     * Cierra la sesión de un usuario
     * [Elimina el token actual]
     */
    public function logout(Request $request) {
        $request->user()->token()->revoke();
    }
}
