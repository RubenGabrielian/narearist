<?php

namespace App\Http\Controllers;

use App\Models\ChapterUnlockEmail;
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

        return response()->json(['success' => true]);
    }
}
