import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../../Components/Admin/AdminLayout";
import ProjectForm from "../../Components/Admin/ProjectForm";
import api from "@/components/Utils/api"; 

export default function AdminProjects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingProject, setEditingProject] = useState(null);
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        fetchProjects();
    }, []);

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

    const handleEdit = (project) => {
        setEditingProject(project);
        setShowForm(true);
    };

    const handleDelete = async (projectId) => {
        if (!confirm("Are you sure you want to delete this project?")) return;

        try {
            await api.delete(`/admin/projects/${projectId}`);
            setProjects(projects.filter((p) => p.id !== projectId));
        } catch (error) {
            console.error("Error deleting project:", error);
            alert("Failed to delete project");
        }
    };

    const handleFormSuccess = () => {
        setShowForm(false);
        setEditingProject(null);
        fetchProjects();
    };

    const filteredProjects =
        filter === "all"
            ? projects
            : projects.filter((project) => project.category === filter);

    const filters = [
        { key: "all", label: "All Projects" },
        { key: "web", label: "Web" },
        { key: "mobile", label: "Mobile" },
        { key: "uiux", label: "UI/UX" },
    ];

    return (
        <AdminLayout>
            <div className="p-8">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-100">
                            Projects
                        </h1>
                        <p className="text-slate-400 mt-2">
                            Manage your portfolio projects
                        </p>
                    </div>
                    <button
                        onClick={() => setShowForm(true)}
                        className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-lg transition-colors flex items-center"
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
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            />
                        </svg>
                        Add Project
                    </button>
                </div>

                {/* Filters */}
                <div className="flex gap-2 mb-6">
                    {filters.map((filterOption) => (
                        <button
                            key={filterOption.key}
                            onClick={() => setFilter(filterOption.key)}
                            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                                filter === filterOption.key
                                    ? "bg-sky-500 text-white"
                                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                            }`}
                        >
                            {filterOption.label}
                        </button>
                    ))}
                </div>

                {/* Projects Table */}
                <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
                    {loading ? (
                        <div className="p-8 text-center">
                            <div className="animate-spin w-8 h-8 border-4 border-sky-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                            <p className="text-slate-400">
                                Loading projects...
                            </p>
                        </div>
                    ) : filteredProjects.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-slate-700/50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                                            Project
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                                            Category
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                                            Date
                                        </th>
                                        <th className="px-6 py-4 text-right text-xs font-medium text-slate-400 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-700">
                                    {filteredProjects.map((project) => (
                                        <tr
                                            key={project.id}
                                            className="hover:bg-slate-700/50"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="w-12 h-12 bg-slate-700 rounded-lg overflow-hidden mr-4">
                                                        {project.image ? (
                                                            <img
                                                                src={`/storage/${project.image}`}
                                                                alt={
                                                                    project.title
                                                                }
                                                                className="w-full h-full object-cover"
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center text-slate-400">
                                                                <svg
                                                                    className="w-6 h-6"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    viewBox="0 0 24 24"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth={
                                                                            2
                                                                        }
                                                                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                                    />
                                                                </svg>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-medium text-slate-100">
                                                            {project.title}
                                                        </div>
                                                        <div className="text-sm text-slate-400 truncate max-w-xs">
                                                            {
                                                                project.description
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span
                                                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                        project.category ===
                                                        "web"
                                                            ? "bg-blue-500/20 text-blue-400"
                                                            : project.category ===
                                                              "mobile"
                                                            ? "bg-green-500/20 text-green-400"
                                                            : "bg-purple-500/20 text-purple-400"
                                                    }`}
                                                >
                                                    {project.category.toUpperCase()}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {project.is_featured && (
                                                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-500/20 text-yellow-400">
                                                        Featured
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">
                                                {new Date(
                                                    project.created_at
                                                ).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex items-center justify-end space-x-2">
                                                    <Link
                                                        to={`/projects/${project.id}`}
                                                        target="_blank"
                                                        className="text-slate-400 hover:text-sky-400 transition-colors"
                                                        title="View"
                                                    >
                                                        <svg
                                                            className="w-5 h-5"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                            />
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                            />
                                                        </svg>
                                                    </Link>
                                                    <button
                                                        onClick={() =>
                                                            handleEdit(project)
                                                        }
                                                        className="text-slate-400 hover:text-yellow-400 transition-colors"
                                                        title="Edit"
                                                    >
                                                        <svg
                                                            className="w-5 h-5"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                                            />
                                                        </svg>
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                project.id
                                                            )
                                                        }
                                                        className="text-slate-400 hover:text-red-400 transition-colors"
                                                        title="Delete"
                                                    >
                                                        <svg
                                                            className="w-5 h-5"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                            />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="p-8 text-center">
                            <div className="w-16 h-16 bg-slate-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                                <svg
                                    className="w-8 h-8 text-slate-400"
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
                            <h3 className="text-lg font-medium text-slate-100 mb-2">
                                No projects found
                            </h3>
                            <p className="text-slate-400 mb-4">
                                Get started by creating your first project.
                            </p>
                            <button
                                onClick={() => setShowForm(true)}
                                className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg transition-colors"
                            >
                                Add Project
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Project Form Modal */}
            {showForm && (
                <ProjectForm
                    project={editingProject}
                    onSuccess={handleFormSuccess}
                    onCancel={() => {
                        setShowForm(false);
                        setEditingProject(null);
                    }}
                />
            )}
        </AdminLayout>
    );
}
