import React, { useEffect, useState } from "react";
import AdminLayout from "../../Components/Admin/AdminLayout";
import api from "../../Components/Utils/api";

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        totalProjects: 0,
        webProjects: 0,
        mobileProjects: 0,
        uiuxProjects: 0,
    });
    const [recentProjects, setRecentProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const response = await api.get("/projects");
            const projects = response.data;

            setStats({
                totalProjects: projects.length,
                webProjects: projects.filter((p) => p.category === "web")
                    .length,
                mobileProjects: projects.filter((p) => p.category === "mobile")
                    .length,
                uiuxProjects: projects.filter((p) => p.category === "uiux")
                    .length,
            });

            setRecentProjects(projects.slice(0, 5));
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
        } finally {
            setLoading(false);
        }
    };

    const statCards = [
        {
            title: "Total Projects",
            value: stats.totalProjects,
            color: "bg-blue-500",
            icon: "📊",
        },
        {
            title: "Web Projects",
            value: stats.webProjects,
            color: "bg-green-500",
            icon: "🌐",
        },
        {
            title: "Mobile Projects",
            value: stats.mobileProjects,
            color: "bg-purple-500",
            icon: "📱",
        },
        {
            title: "UI/UX Projects",
            value: stats.uiuxProjects,
            color: "bg-pink-500",
            icon: "🎨",
        },
    ];

    return (
        <AdminLayout>
            <div className="p-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-100">
                        Dashboard
                    </h1>
                    <p className="text-slate-400 mt-2">
                        Welcome back! Here's an overview of your portfolio.
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {statCards.map((stat, index) => (
                        <div
                            key={index}
                            className="bg-slate-800 rounded-lg p-6 border border-slate-700"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-slate-400 text-sm">
                                        {stat.title}
                                    </p>
                                    <p className="text-2xl font-bold text-slate-100 mt-1">
                                        {loading ? "..." : stat.value}
                                    </p>
                                </div>
                                <div
                                    className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center text-white text-xl`}
                                >
                                    {stat.icon}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Recent Projects */}
                <div className="bg-slate-800 rounded-lg border border-slate-700">
                    <div className="p-6 border-b border-slate-700">
                        <h2 className="text-xl font-semibold text-slate-100">
                            Recent Projects
                        </h2>
                    </div>
                    <div className="p-6">
                        {loading ? (
                            <div className="space-y-4">
                                {[1, 2, 3].map((i) => (
                                    <div
                                        key={i}
                                        className="animate-pulse flex items-center space-x-4"
                                    >
                                        <div className="w-16 h-16 bg-slate-700 rounded-lg"></div>
                                        <div className="flex-1 space-y-2">
                                            <div className="h-4 bg-slate-700 rounded w-1/2"></div>
                                            <div className="h-3 bg-slate-700 rounded w-1/4"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : recentProjects.length > 0 ? (
                            <div className="space-y-4">
                                {recentProjects.map((project) => (
                                    <div
                                        key={project.id}
                                        className="flex items-center space-x-4 p-4 bg-slate-700/50 rounded-lg"
                                    >
                                        <div className="w-16 h-16 bg-slate-700 rounded-lg overflow-hidden">
                                            {project.image ? (
                                                <img
                                                    src={`/storage/${project.image}`}
                                                    alt={project.title}
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
                                                            strokeWidth={2}
                                                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                        />
                                                    </svg>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-slate-100 font-medium">
                                                {project.title}
                                            </h3>
                                            <p className="text-slate-400 text-sm capitalize">
                                                {project.category}
                                            </p>
                                            <p className="text-slate-500 text-xs mt-1">
                                                {new Date(
                                                    project.created_at
                                                ).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            {project.is_featured && (
                                                <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 text-xs rounded">
                                                    Featured
                                                </span>
                                            )}
                                            <span
                                                className={`px-2 py-1 text-xs rounded ${
                                                    project.category === "web"
                                                        ? "bg-blue-500/20 text-blue-400"
                                                        : project.category ===
                                                          "mobile"
                                                        ? "bg-green-500/20 text-green-400"
                                                        : "bg-purple-500/20 text-purple-400"
                                                }`}
                                            >
                                                {project.category.toUpperCase()}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-slate-400 text-center py-8">
                                No projects found
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
