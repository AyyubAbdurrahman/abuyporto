<?php
namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\UiUxDetail;
use Illuminate\Http\Request;

class UiUxController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'project_id' => 'required|exists:projects,id',
            'user_personas' => 'nullable|array',
            'empathy_maps' => 'nullable|array',
            'problem_statement' => 'nullable|string',
            'wireframes' => 'nullable|array',
            'usability_tests' => 'nullable|array'
        ]);

        $uiUxDetail = UiUxDetail::updateOrCreate(
            ['project_id' => $validated['project_id']],
            $validated
        );

        return response()->json($uiUxDetail, 201);
    }

    public function show($projectId)
    {
        $uiUxDetail = UiUxDetail::where('project_id', $projectId)->first();
        return response()->json($uiUxDetail);
    }

    public function update(Request $request, $id)
    {
        $uiUxDetail = UiUxDetail::findOrFail($id);
        
        $validated = $request->validate([
            'user_personas' => 'nullable|array',
            'empathy_maps' => 'nullable|array',
            'problem_statement' => 'nullable|string',
            'wireframes' => 'nullable|array',
            'usability_tests' => 'nullable|array'
        ]);

        $uiUxDetail->update($validated);
        
        return response()->json($uiUxDetail);
    }
}


