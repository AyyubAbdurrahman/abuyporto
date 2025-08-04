import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "@/components/Utils/api";

export default function ProjectDetail() {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeImage, setActiveImage] = useState(0);

    useEffect(() => {
        fetchProject();
    }, [id]);

    const fetchProject = async () => {
        try {
            const response = await api.get(`/projects/${id}`);
            setProject(response.data);
        } catch (error) {
            console.error("Error fetching project:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="animate-pulse">
                        <div className="h-8 bg-slate-800 rounded w-1/4 mb-4"></div>
                        <div className="h-12 bg-slate-800 rounded w-3/4 mb-8"></div>
                        <div className="h-64 bg-slate-800 rounded mb-8"></div>
                        <div className="space-y-4">
                            <div className="h-4 bg-slate-800 rounded"></div>
                            <div className="h-4 bg-slate-800 rounded w-5/6"></div>
                            <div className="h-4 bg-slate-800 rounded w-4/6"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="min-h-screen py-20 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-slate-100 mb-4">
                        Project Not Found
                    </h1>
                    <Link
                        to="/projects"
                        className="text-sky-400 hover:text-sky-300"
                    >
                        ← Back to Projects
                    </Link>
                </div>
            </div>
        );
    }

    const images =
        project.gallery && project.gallery.length > 0
            ? [project.image, ...project.gallery].filter(Boolean)
            : project.image
            ? [project.image]
            : [];

    return (
        <div className="min-h-screen py-20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Breadcrumb */}
                <nav className="mb-8">
                    <Link
                        to="/projects"
                        className="text-sky-400 hover:text-sky-300 text-sm"
                    >
                        ← Back to Projects
                    </Link>
                </nav>

                {/* Project Header */}
                <div className="mb-12">
                    <div className="flex items-center gap-4 mb-4">
                        <span
                            className={`px-3 py-1 text-sm font-medium rounded-full ${
                                project.category === "web"
                                    ? "bg-blue-500 text-blue-100"
                                    : project.category === "mobile"
                                    ? "bg-green-500 text-green-100"
                                    : "bg-purple-500 text-purple-100"
                            }`}
                        >
                            {project.category.toUpperCase()}
                        </span>
                        {project.is_featured && (
                            <span className="bg-yellow-500 text-yellow-100 px-3 py-1 text-sm font-medium rounded-full">
                                Featured
                            </span>
                        )}
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-100 mb-4">
                        {project.title}
                    </h1>
                    <p className="text-xl text-slate-300 mb-6">
                        {project.description}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-4">
                        {project.demo_url && (
                            <a
                                href={project.demo_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-lg transition-colors"
                            >
                                <svg
                                    className="w-5 h-5 mr-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                    />
                                </svg>
                                Live Demo
                            </a>
                        )}
                        {project.github_url && (
                            <a
                                href={project.github_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center border border-slate-600 text-slate-300 hover:bg-slate-700 px-6 py-3 rounded-lg transition-colors"
                            >
                                <svg
                                    className="w-5 h-5 mr-2"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                                Source Code
                            </a>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        {/* Image Gallery */}
                        {images.length > 0 && (
                            <div className="mb-12">
                                <div className="bg-slate-800 rounded-lg overflow-hidden mb-4">
                                    <img
                                        src={`/storage/${images[activeImage]}`}
                                        alt={project.title}
                                        className="w-full h-96 object-cover"
                                    />
                                </div>
                                {images.length > 1 && (
                                    <div className="flex gap-2 overflow-x-auto">
                                        {images.map((image, index) => (
                                            <button
                                                key={index}
                                                onClick={() =>
                                                    setActiveImage(index)
                                                }
                                                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                                                    activeImage === index
                                                        ? "border-sky-400"
                                                        : "border-slate-600"
                                                }`}
                                            >
                                                <img
                                                    src={`/storage/${image}`}
                                                    alt={`${project.title} ${
                                                        index + 1
                                                    }`}
                                                    className="w-full h-full object-cover"
                                                />
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Description */}
                        <div className="mb-12">
                            <h2 className="text-2xl font-bold text-slate-100 mb-4">
                                About This Project
                            </h2>
                            <div className="prose prose-slate prose-invert max-w-none">
                                <p className="text-slate-300 leading-relaxed">
                                    {project.long_description ||
                                        project.description}
                                </p>
                            </div>
                        </div>

                        {/* UI/UX Details */}
                        {project.category === "uiux" &&
                            project.ui_ux_details && (
                                <div className="mb-12">
                                    <h2 className="text-2xl font-bold text-slate-100 mb-6">
                                        Design Process
                                    </h2>

                                    {/* Problem Statement */}
                                    {project.ui_ux_details
                                        .problem_statement && (
                                        <div className="mb-8">
                                            <h3 className="text-xl font-semibold text-slate-100 mb-3">
                                                Problem Statement
                                            </h3>
                                            <p className="text-slate-300 bg-slate-800 p-4 rounded-lg">
                                                {
                                                    project.ui_ux_details
                                                        .problem_statement
                                                }
                                            </p>
                                        </div>
                                    )}

                                    {/* User Personas */}
                                    {project.ui_ux_details.user_personas &&
                                        project.ui_ux_details.user_personas
                                            .length > 0 && (
                                            <div className="mb-8">
                                                <h3 className="text-xl font-semibold text-slate-100 mb-3">
                                                    User Personas
                                                </h3>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    {project.ui_ux_details.user_personas.map(
                                                        (persona, index) => (
                                                            <div
                                                                key={index}
                                                                className="bg-slate-800 p-4 rounded-lg"
                                                            >
                                                                {persona.image && (
                                                                    <img
                                                                        src={`/storage/${persona.image}`}
                                                                        alt={`Persona ${
                                                                            index +
                                                                            1
                                                                        }`}
                                                                        className="w-full h-48 object-cover rounded mb-3"
                                                                    />
                                                                )}
                                                                <p className="text-slate-300">
                                                                    {
                                                                        persona.description
                                                                    }
                                                                </p>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                    {/* Wireframes */}
                                    {project.ui_ux_details.wireframes &&
                                        project.ui_ux_details.wireframes
                                            .length > 0 && (
                                            <div className="mb-8">
                                                <h3 className="text-xl font-semibold text-slate-100 mb-3">
                                                    Wireframes
                                                </h3>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    {project.ui_ux_details.wireframes.map(
                                                        (wireframe, index) => (
                                                            <img
                                                                key={index}
                                                                src={`/storage/${wireframe}`}
                                                                alt={`Wireframe ${
                                                                    index + 1
                                                                }`}
                                                                className="w-full h-64 object-cover rounded-lg bg-slate-800"
                                                            />
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                </div>
                            )}
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-slate-800 rounded-lg p-6 sticky top-24">
                            <h3 className="text-xl font-semibold text-slate-100 mb-4">
                                Project Details
                            </h3>

                            {/* Technologies */}
                            {project.technologies &&
                                project.technologies.length > 0 && (
                                    <div className="mb-6">
                                        <h4 className="text-sm font-medium text-slate-400 mb-2">
                                            Technologies Used
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {project.technologies.map(
                                                (tech, index) => (
                                                    <span
                                                        key={index}
                                                        className="bg-slate-700 text-slate-300 px-2 py-1 text-sm rounded"
                                                    >
                                                        {tech}
                                                    </span>
                                                )
                                            )}
                                        </div>
                                    </div>
                                )}

                            {/* Project Info */}
                            <div className="space-y-4">
                                <div>
                                    <h4 className="text-sm font-medium text-slate-400">
                                        Category
                                    </h4>
                                    <p className="text-slate-100 capitalize">
                                        {project.category}
                                    </p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-slate-400">
                                        Date
                                    </h4>
                                    <p className="text-slate-100">
                                        {new Date(
                                            project.created_at
                                        ).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                        })}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
