<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Password;
use App\Models\User;
use Auth;
use Session;
use DB;
use GuzzleHttp\Client;    
use Illuminate\Support\Facades\Http;

class UsersController extends Controller
{
    public function loginRegister(){
        return view('front.login_register');
    }

    public function registerUser(Request $request){
        if($request->isMethod('post')){
            $data = $request->all();
            
            $userCount = User::where('mobile',$data['mobile'])->count();
            if($userCount>0){
                $message = "Mobile already exists!";
                session::flash('error_message',$message);
                return redirect()->back();
            }else{
               $request->validate([
                'password' => ['required','min:8','regex:/^[a-zA-Z0-9 ]+$/']
               ]);
                // Register the User
                $user = new User;
                $user->name = $data['name'];
                $user->mobile = $data['mobile'];
                $user->password = bcrypt($data['password']);
                $user->status = 1;
                $user->save();

                // Redirect Back with Success Message
                $message = "Login to Enter dashboard";
                Session::put('success_message',$message);
                return redirect()->back();

            }
        }
    }

    public function loginUser(Request $request){
        if($request->isMethod('post')){
            $data = $request->all();
            /*echo "<pre>"; print_r($data); die;*/
            if(Auth::attempt(['mobile'=>$data['mobile'],'password'=>$data['password']])){
                //check User is activated or not
                $userStatus = User::where('mobile',$data['mobile'])->first();
                if($userStatus->status == 0){
                    Auth::logout();
                    $message = "Your account is not activated yet!";
                    Session::put('error_message',$message);
                    return redirect()->back();
                }
                return redirect('/dashboard');
            }else{
                $message = "Invalid Username or Password";
                Session::flash('error_message',$message);
                return redirect()->back();
            }
        }
    }

    public function logoutUser(){
        Auth::logout();
        return redirect('/');
    }

    public function search(Request $request){
        $request->input('search');
        $categories = Http::get('http://mmb.karbh.com/api/v1/categories?s=${search}')->json();
        dd($categories);
    }
}
