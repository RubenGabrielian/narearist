<?php

namespace App\Http\Controllers;

use App\Models\Subscription;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Throwable;

class SubscriptionController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'email' => ['required', 'email', 'max:255'],
        ]);

        Subscription::firstOrCreate(['email' => $validated['email']]);
        try {
            Mail::send('emails.subscription-preview', [], function ($message) use ($validated) {
                $message
                    ->to($validated['email'])
                    ->from('info@narearist.com', 'Tennis Academy')
                    ->subject('Թենիսի ակադեմիա - Բաժանորդագրություն');
            });
        } catch (Throwable $exception) {
            Log::error('Failed to send subscription email.', [
                'email' => $validated['email'],
                'error' => $exception->getMessage(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to send subscription email.',
            ], 500);
        }

        return response()->json(['success' => true]);
    }
}
