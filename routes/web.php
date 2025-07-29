<?php

use App\Http\Controllers\TestController;
use App\Http\Middleware\RoleMiddleware;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::middleware(['auth', 'verified', 'role:admin,superadmin'])->group(function () {

Route::get('/admin/users',[TestController::class,'admin'])->name('admin');
});



Route::middleware(['auth', 'verified', 'role:superadmin'])->group(function () {

Route::get('/superadmin/system',[TestController::class,'superadmin'])->name('superadmin');
});


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
