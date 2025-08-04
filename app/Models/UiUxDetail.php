<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UiUxDetail extends Model
{
    protected $fillable = [
        'project_id', 'user_personas', 'empathy_maps',
        'problem_statement', 'wireframes', 'usability_tests'
    ];

    protected $casts = [
        'user_personas' => 'array',
        'empathy_maps' => 'array',
        'wireframes' => 'array',
        'usability_tests' => 'array'
    ];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }
}