<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth'])->name('dashboard');

// require __DIR__.'/auth.php';
Route::namespace('App\Http\Controllers\Front')->group(function(){
    Route::group(['middleware'=>['auth']],function(){

    });
    Route::get('/login-register',['as'=>'login','uses'=>'UsersController@loginRegister']);
    Route::post('/login','UsersController@loginUser');
    Route::post('/register','UsersController@registerUser');
    Route::get('/logout','UsersController@logoutUser');
    Route::match(['get','post'],'/search','UsersController@search');
});