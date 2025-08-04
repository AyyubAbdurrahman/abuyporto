<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'title', 'description', 'long_description', 'category', 
        'technologies', 'image', 'gallery', 'github_url', 
        'demo_url', 'is_featured'
    ];

    protected $casts = [
        'technologies' => 'array',
        'gallery' => 'array',
        'is_featured' => 'boolean'
    ];

    public function uiUxDetails()
    {
        return $this->hasOne(UiUxDetail::class);
    }
}