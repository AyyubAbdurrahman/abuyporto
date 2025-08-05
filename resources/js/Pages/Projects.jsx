import React, { useEffect, useState } from "react";
import ProjectCard from "../Components/UI/ProjectCard";
import api from "../Components/Utils/api";

export default function Projects() {
    const [projects, setProjects] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState("all");

    const filters = [
        { key: "all", label: "All Projects" },
        { key: "web", label: "Web Development" },
        { key: "mobile", label: "Mobile Apps" },
        { key: "uiux", label: "UI/UX Design" },
    ];

    useEffect(() => {
        fetchProjects();
    }, []);

    useEffect(() => {
        filterProjects();
    }, [projects, activeFilter]);

    const fetchProjects = async () => {
        try {
            const response = await api.get("/projects");
            setProjects(response.data);
        } catch (error) {
            console.error("Error fetching projects:", error);
        } finally {
            setLoading(false);
        }
    };

    const filterProjects = () => {
        if (activeFilter === "all") {
            setFilteredProjects(projects);
        } else {
            setFilteredProjects(
                projects.filter((project) => project.category === activeFilter)
            );
        }
    };

    return (
        <div className="min-h-screen py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold text-slate-100 mb-4">
                        My <span className="text-sky-400">Projects</span>
                    </h1>
                    <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                        A collection of my recent work showcasing various
                        technologies and design approaches
                    </p>
                </div>

                {/* Filter Buttons */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {filters.map((filter) => (
                        <button
                            key={filter.key}
                            onClick={() => setActiveFilter(filter.key)}
                            className={`px-6 py-2 rounded-full transition-colors ${
                                activeFilter === filter.key
                                    ? "bg-sky-500 text-white"
                                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                            }`}
                        >
                            {filter.label}
                        </button>
                    ))}
                </div>

                {/* Projects Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProjects.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="w-24 h-24 bg-slate-800 rounded-full mx-auto mb-6 flex items-center justify-center">
                            <svg
                                className="w-12 h-12 text-slate-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                                />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-slate-100 mb-2">
                            No Projects Found
                        </h3>
                        <p className="text-slate-300">
                            No projects match the selected filter.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
