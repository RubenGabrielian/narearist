<?php

namespace App\Http\Controllers;

use App\Models\Chapter;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AdminChapterController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $validated = $this->validateChapter($request);

        if ($request->hasFile('audio')) {
            $validated['audio_path'] = $request->file('audio')->store('chapters/audio', 'public');
        }

        Chapter::create($validated);

        return redirect()->route('admin.chapters')->with('success', 'Chapter created successfully.');
    }

    public function update(Request $request, Chapter $chapter): RedirectResponse
    {
        $validated = $this->validateChapter($request, $chapter->id);

        if ($request->hasFile('audio')) {
            if ($chapter->audio_path) {
                Storage::disk('public')->delete($chapter->audio_path);
            }
            $validated['audio_path'] = $request->file('audio')->store('chapters/audio', 'public');
        }

        $chapter->update($validated);

        return redirect()->route('admin.chapters')->with('success', 'Chapter updated successfully.');
    }

    public function destroy(Chapter $chapter): RedirectResponse
    {
        if ($chapter->audio_path) {
            Storage::disk('public')->delete($chapter->audio_path);
        }

        $chapter->delete();

        return redirect()->route('admin.chapters')->with('success', 'Chapter deleted successfully.');
    }

    /**
     * @return array<string, mixed>
     */
    private function validateChapter(Request $request, ?int $ignoreId = null): array
    {
        $chapterNumberRules = ['required', 'integer', 'min:1'];
        if ($ignoreId) {
            $chapterNumberRules[] = 'unique:chapters,chapter_number,' . $ignoreId;
        } else {
            $chapterNumberRules[] = 'unique:chapters,chapter_number';
        }

        return $request->validate([
            'chapter_number' => $chapterNumberRules,
            'title' => ['required', 'string', 'max:255'],
            'content' => ['required', 'string'],
            'image' => ['nullable', 'url', 'max:2048'],
            'audio' => ['nullable', 'file', 'mimes:mp3,mpeg,ogg,wav', 'max:51200'],
        ]);
    }
}
