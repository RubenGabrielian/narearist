<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Chapter extends Model
{
    protected $fillable = [
        'chapter_number',
        'title',
        'content',
        'image',
        'audio_path',
    ];
}
