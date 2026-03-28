<?php

use App\Http\Controllers\AdminAuthController;
use App\Http\Controllers\AdminChapterController;
use App\Http\Controllers\AdminGalleryController;
use App\Http\Controllers\AdminSettingsController;
use App\Http\Controllers\ChapterUnlockController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\EmailController;
use App\Http\Controllers\SubscriptionController;
use App\Models\AboutPageSetting;
use App\Models\Chapter;
use App\Models\GalleryImage;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'chaptersFromDb' => Chapter::query()
            ->orderBy('chapter_number')
            ->get(['chapter_number', 'title', 'content', 'image', 'audio_path']),
    ]);
})->name('home');

Route::get('/about-author', function () {
    $setting = AboutPageSetting::first();
    $aboutImage = null;

    if ($setting?->image_path) {
        $aboutImage = str_starts_with($setting->image_path, 'uploads/')
            ? asset($setting->image_path)
            : asset('storage/' . $setting->image_path);
    }

    return Inertia::render('AboutAuthor', [
        'aboutImage' => $aboutImage,
        'aboutContent' => $setting?->content,
    ]);
})->name('about-author');

Route::get('/gallery', function () {
    return Inertia::render('Gallery', [
        'galleryImagesFromDb' => GalleryImage::query()
            ->orderBy('id')
            ->get()
            ->map(fn (GalleryImage $image) => [
                'src' => str_starts_with($image->image_path, 'uploads/')
                    ? asset($image->image_path)
                    : asset('storage/' . $image->image_path),
                'alt' => $image->alt ?: ('Chapter ' . $image->chapter_number . ' image'),
                'chapter' => $image->chapter_number,
                'authorName' => $image->author_name,
            ]),
    ]);
})->name('gallery');

Route::post('/chapter-unlock', [ChapterUnlockController::class, 'store'])->name('chapter.unlock');
Route::post('/subscribe', [SubscriptionController::class, 'store'])->name('subscribe');
Route::post('/emails', [EmailController::class, 'store'])->name('emails.store');
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');

Route::prefix('admin')->group(function () {
    Route::get('/login', [AdminAuthController::class, 'showLogin'])->name('admin.login');
    Route::post('/login', [AdminAuthController::class, 'login'])->name('admin.login.submit');

    Route::middleware('admin.auth')->group(function () {
        Route::redirect('/', '/admin/chapters')->name('admin.dashboard');
        Route::get('/chapters', [AdminAuthController::class, 'chapters'])->name('admin.chapters');
        Route::get('/gallery', [AdminAuthController::class, 'gallery'])->name('admin.gallery');
        Route::get('/contacts', [AdminAuthController::class, 'contacts'])->name('admin.contacts');
        Route::get('/settings', [AdminAuthController::class, 'settings'])->name('admin.settings');
        Route::post('/settings', [AdminSettingsController::class, 'update'])->name('admin.settings.update');
        Route::post('/logout', [AdminAuthController::class, 'logout'])->name('admin.logout');
        Route::post('/chapters', [AdminChapterController::class, 'store'])->name('admin.chapters.store');
        Route::put('/chapters/{chapter}', [AdminChapterController::class, 'update'])->name('admin.chapters.update');
        Route::delete('/chapters/{chapter}', [AdminChapterController::class, 'destroy'])->name('admin.chapters.destroy');
        Route::post('/gallery', [AdminGalleryController::class, 'store'])->name('admin.gallery.store');
        Route::delete('/gallery/{galleryImage}', [AdminGalleryController::class, 'destroy'])->name('admin.gallery.destroy');
    });
});
