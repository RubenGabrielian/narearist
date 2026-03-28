<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Throwable;

class ContactController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'subject' => ['required', 'string', 'max:255'],
            'message' => ['required', 'string', 'max:5000'],
        ]);

        try {
            $body = "Նոր կապի հաղորդագրություն կայքից:\n\n"
                . "Անուն: {$validated['name']}\n"
                . "Էլ. հասցե: {$validated['email']}\n"
                . "Թեմա: {$validated['subject']}\n\n"
                . "Նամակ:\n{$validated['message']}";

            Mail::raw($body, function ($mail) use ($validated) {
                $mail
                    ->to('info@narearist.com')
                    ->from('info@narearist.com', 'Nare Arist Website')
                    ->replyTo($validated['email'], $validated['name'])
                    ->subject('Կապի ձև - ' . $validated['subject']);
            });
        } catch (Throwable $exception) {
            Log::error('Failed to send contact form email.', [
                'email' => $validated['email'],
                'error' => $exception->getMessage(),
            ]);

            return back()->withErrors([
                'contact' => 'Նամակը չուղարկվեց։ Խնդրում ենք փորձել կրկին։',
            ]);
        }

        return back()->with('success', 'Նամակը հաջողությամբ ուղարկվեց։');
    }
}

