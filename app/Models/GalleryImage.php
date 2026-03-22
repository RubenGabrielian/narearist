<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GalleryImage extends Model
{
    protected $fillable = [
        'chapter_number',
        'image_path',
        'alt',
    ];
}
