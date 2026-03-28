<?php

namespace App\Http\Controllers;

use App\Models\ChapterUnlockEmail;
use App\Models\Email;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ChapterUnlockController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'email' => ['required', 'email', 'max:255'],
        ]);

        ChapterUnlockEmail::firstOrCreate(['email' => $validated['email']]);
        // Also keep contacts table in sync for admin Contacts page.
        Email::firstOrCreate(['email' => $validated['email']]);

        return response()->json(['success' => true]);
    }
}
