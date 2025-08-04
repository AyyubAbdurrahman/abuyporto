<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('ui_ux_details', function (Blueprint $table) {
            $table->id();
    $table->foreignId('project_id')->constrained()->onDelete('cascade');
    $table->json('user_personas')->nullable();
    $table->json('empathy_maps')->nullable();
    $table->text('problem_statement')->nullable();
    $table->json('wireframes')->nullable();
    $table->json('usability_tests')->nullable();
    $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ui_ux_details');
    }
};
