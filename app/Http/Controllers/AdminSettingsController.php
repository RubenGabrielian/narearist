<?php

namespace App\Http\Controllers;

use App\Models\AboutPageSetting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class AdminSettingsController extends Controller
{
    public function update(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'image' => ['nullable', 'image', 'max:5120'],
            'content' => ['nullable', 'string'],
        ]);

        $setting = AboutPageSetting::first() ?? new AboutPageSetting();

        if ($request->hasFile('image')) {
            if ($setting->image_path && str_starts_with($setting->image_path, 'uploads/')) {
                File::delete(public_path($setting->image_path));
            }

            $uploadDirectory = public_path('uploads/about');
            if (! File::exists($uploadDirectory)) {
                File::makeDirectory($uploadDirectory, 0755, true);
            }

            $extension = $request->file('image')->getClientOriginalExtension();
            $fileName = 'about_' . time() . '_' . uniqid() . '.' . $extension;
            $request->file('image')->move($uploadDirectory, $fileName);

            // Save as a web path under public/ to avoid shared-hosting storage link issues.
            $setting->image_path = 'uploads/about/' . $fileName;
        }

        $setting->content = $validated['content'] ?? $setting->content;
        $setting->save();

        return redirect()->route('admin.settings')->with('success', 'About page settings saved successfully.');
    }
}