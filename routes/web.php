<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome');
})->name('home');

Route::get('/about-author', function () {
    return Inertia::render('AboutAuthor');
})->name('about-author');
