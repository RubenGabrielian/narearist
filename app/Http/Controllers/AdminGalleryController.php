<?php

namespace App\Http\Controllers;

use App\Models\Chapter;
use App\Models\GalleryImage;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class AdminGalleryController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'chapter_number' => [
                'required',
                'integer',
                'min:1',
                Rule::exists('chapters', 'chapter_number'),
            ],
            'image' => ['required', 'image', 'max:5120'],
            'alt' => ['nullable', 'string', 'max:255'],
        ]);

        $imagePath = $request->file('image')->store('gallery', 'public');

        GalleryImage::create([
            'chapter_number' => $validated['chapter_number'],
            'image_path' => $imagePath,
            'alt' => $validated['alt'] ?? null,
        ]);

        return redirect()->route('admin.gallery')->with('success', 'Gallery image uploaded successfully.');
    }

    public function destroy(GalleryImage $galleryImage): RedirectResponse
    {
        Storage::disk('public')->delete($galleryImage->image_path);
        $galleryImage->delete();

        return redirect()->route('admin.gallery')->with('success', 'Gallery image deleted successfully.');
    }
}
