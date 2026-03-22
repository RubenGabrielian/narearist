<?php

namespace App\Http\Controllers;

use App\Models\AboutPageSetting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

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
            if ($setting->image_path) {
                Storage::disk('public')->delete($setting->image_path);
            }
            $setting->image_path = $request->file('image')->store('about', 'public');
        }

        $setting->content = $validated['content'] ?? $setting->content;
        $setting->save();

        return redirect()->route('admin.settings')->with('success', 'About page settings saved successfully.');
    }
}