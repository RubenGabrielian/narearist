<?php

namespace App\Http\Controllers;

use App\Models\Chapter;
use App\Models\GalleryImage;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
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
            'author_name' => ['nullable', 'string', 'max:255'],
        ]);

        $uploadDirectory = public_path('uploads/gallery');
        if (! File::exists($uploadDirectory)) {
            File::makeDirectory($uploadDirectory, 0755, true);
        }

        $extension = $request->file('image')->getClientOriginalExtension();
        $fileName = 'gallery_' . (string) $validated['chapter_number'] . '_' . time() . '_' . uniqid() . '.' . $extension;
        $request->file('image')->move($uploadDirectory, $fileName);

        // Save as a web path under public/ to avoid shared-hosting storage link issues.
        $imagePath = 'uploads/gallery/' . $fileName;

        GalleryImage::create([
            'chapter_number' => $validated['chapter_number'],
            'image_path' => $imagePath,
            'alt' => $validated['alt'] ?? null,
            'author_name' => $validated['author_name'] ?? null,
        ]);

        return redirect()->route('admin.gallery')->with('success', 'Gallery image uploaded successfully.');
    }

    public function destroy(GalleryImage $galleryImage): RedirectResponse
    {
        if ($galleryImage->image_path) {
            if (str_starts_with($galleryImage->image_path, 'uploads/')) {
                File::delete(public_path($galleryImage->image_path));
            } else {
                Storage::disk('public')->delete($galleryImage->image_path);
            }
        }
        $galleryImage->delete();

        return redirect()->route('admin.gallery')->with('success', 'Gallery image deleted successfully.');
    }
}
