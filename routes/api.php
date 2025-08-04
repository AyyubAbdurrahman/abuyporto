// routes/api.php
<?php
use App\Http\Controllers\API\ProjectController;
use App\Http\Controllers\API\UiUxController;
use App\Http\Controllers\API\AuthController;

// Public routes
Route::get('/projects', [ProjectController::class, 'index']);
Route::get('/projects/{id}', [ProjectController::class, 'show']);
Route::get('/projects/featured', [ProjectController::class, 'featured']);

// Auth routes
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

// Protected admin routes
Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('admin/projects', ProjectController::class, ['except' => ['index', 'show']]);
    Route::apiResource('admin/uiux', UiUxController::class);
    Route::post('/admin/upload', [ProjectController::class, 'uploadFile']);
});