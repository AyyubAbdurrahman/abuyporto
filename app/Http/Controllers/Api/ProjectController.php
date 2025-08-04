<?php
namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProjectController extends Controller
{
    public function index()
    {
        $projects = Project::with('uiUxDetails')
            ->orderBy('created_at', 'desc')
            ->get();
        
        return response()->json($projects);
    }

    public function show($id)
    {
        $project = Project::with('uiUxDetails')->findOrFail($id);
        return response()->json($project);
    }

    public function featured()
    {
        $projects = Project::where('is_featured', true)
            ->orderBy('created_at', 'desc')
            ->get();
        
        return response()->json($projects);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'long_description' => 'nullable|string',
            'category' => 'required|string|in:web,mobile,uiux',
            'technologies' => 'nullable|array',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'gallery' => 'nullable|array',
            'gallery.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
            'github_url' => 'nullable|url',
            'demo_url' => 'nullable|url',
            'is_featured' => 'boolean'
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('projects', 'public');
        }

        if ($request->hasFile('gallery')) {
            $gallery = [];
            foreach ($request->file('gallery') as $file) {
                $gallery[] = $file->store('projects/gallery', 'public');
            }
            $validated['gallery'] = $gallery;
        }

        $project = Project::create($validated);
        
        return response()->json($project, 201);
    }

    public function update(Request $request, $id)
    {
        $project = Project::findOrFail($id);
        
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'long_description' => 'nullable|string',
            'category' => 'required|string|in:web,mobile,uiux',
            'technologies' => 'nullable|array',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'github_url' => 'nullable|url',
            'demo_url' => 'nullable|url',
            'is_featured' => 'boolean'
        ]);

        if ($request->hasFile('image')) {
            if ($project->image) {
                Storage::disk('public')->delete($project->image);
            }
            $validated['image'] = $request->file('image')->store('projects', 'public');
        }

        $project->update($validated);
        
        return response()->json($project);
    }

    public function destroy($id)
    {
        $project = Project::findOrFail($id);
        
        if ($project->image) {
            Storage::disk('public')->delete($project->image);
        }
        
        if ($project->gallery) {
            foreach ($project->gallery as $image) {
                Storage::disk('public')->delete($image);
            }
        }
        
        $project->delete();
        
        return response()->json(['message' => 'Project deleted successfully']);
    }

    public function uploadFile(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:jpeg,png,jpg,gif,pdf|max:10240'
        ]);

        $path = $request->file('file')->store('uploads', 'public');
        
        return response()->json([
            'path' => $path,
            'url' => Storage::url($path)
        ]);
    }
}