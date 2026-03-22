<?php

namespace App\Http\Controllers;

use App\Models\AboutPageSetting;
use App\Models\Chapter;
use App\Models\GalleryImage;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminAuthController extends Controller
{
    public function showLogin(Request $request): RedirectResponse|Response
    {
        if ($request->session()->get('is_admin_authenticated', false)) {
            return redirect()->route('admin.chapters');
        }

        return Inertia::render('Admin/Login');
    }

    public function login(Request $request): RedirectResponse
    {
        $credentials = $request->validate([
            'login' => ['required', 'string'],
            'password' => ['required', 'string'],
        ]);

        $adminLogin = (string) env('ADMIN_LOGIN', 'admin');
        $adminPassword = (string) env('ADMIN_PASSWORD', 'admin123');

        $isLoginValid = hash_equals($adminLogin, (string) $credentials['login']);
        $isPasswordValid = hash_equals($adminPassword, (string) $credentials['password']);

        if (! $isLoginValid || ! $isPasswordValid) {
            return back()->withErrors([
                'login' => 'Incorrect login or password.',
            ]);
        }

        $request->session()->put('is_admin_authenticated', true);
        $request->session()->put('admin_login', $credentials['login']);
        $request->session()->regenerate();

        return redirect()->route('admin.chapters');
    }

    public function chapters(Request $request): Response
    {
        return Inertia::render('Admin/Chapters', [
            'adminLogin' => $request->session()->get('admin_login', 'admin'),
            'chapters' => Chapter::query()
                ->orderBy('chapter_number')
                ->get(['id', 'chapter_number', 'title', 'content', 'image', 'audio_path']),
        ]);
    }

    public function settings(Request $request): Response
    {
        $setting = AboutPageSetting::first();

        return Inertia::render('Admin/Settings', [
            'adminLogin' => $request->session()->get('admin_login', 'admin'),
            'aboutImage' => $setting?->image_path ? '/storage/' . $setting->image_path : null,
            'aboutContent' => $setting?->content ?? '',
        ]);
    }

    public function gallery(Request $request): Response
    {
        return Inertia::render('Admin/Gallery', [
            'adminLogin' => $request->session()->get('admin_login', 'admin'),
            'chapters' => Chapter::query()
                ->orderBy('chapter_number')
                ->get(['id', 'chapter_number', 'title']),
            'galleryImages' => GalleryImage::query()
                ->orderByDesc('id')
                ->get(['id', 'chapter_number', 'image_path', 'alt']),
        ]);
    }

    public function logout(Request $request): RedirectResponse
    {
        $request->session()->forget(['is_admin_authenticated', 'admin_login']);
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('admin.login');
    }
}
