<?php

namespace App\Http\Controllers;

use App\Models\Email;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class EmailController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'email' => ['required', 'email', 'max:255'],
        ]);

        Email::firstOrCreate(['email' => $validated['email']]);

        return back()->with('success', 'Email saved successfully.');
    }
}

