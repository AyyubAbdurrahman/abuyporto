import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

export default function AdminLayout({ children }) {
    const { user, logout } = useAuth();
    const location = useLocation();

    const navigation = [
        { name: "Dashboard", href: "/admin", icon: "dashboard" },
        { name: "Projects", href: "/admin/projects", icon: "projects" },
    ];

    const getIcon = (iconName) => {
        switch (iconName) {
            case "dashboard":
                return (
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
                            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v10z"
                        />
                    </svg>
                );
            case "projects":
                return (
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
                            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                        />
                    </svg>
                );
            default:
                return null;
        }
    };

    if (!user) {
        return <div>Please login</div>;
    }

    return (
        <div className="min-h-screen bg-slate-900">
            {/* Sidebar */}
            <div className="fixed inset-y-0 left-0 z-50 w-64 bg-slate-800 border-r border-slate-700">
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="flex items-center h-16 px-6 border-b border-slate-700">
                        <h1 className="text-xl font-bold text-sky-400">
                            Admin Panel
                        </h1>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-4 py-6 space-y-2">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                                    location.pathname === item.href
                                        ? "bg-sky-500/10 text-sky-400 border border-sky-500/20"
                                        : "text-slate-300 hover:bg-slate-700 hover:text-sky-400"
                                }`}
                            >
                                {getIcon(item.icon)}
                                <span className="ml-3">{item.name}</span>
                            </Link>
                        ))}
                    </nav>

                    {/* User menu */}
                    <div className="border-t border-slate-700 p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <div className="w-8 h-8 bg-sky-500 rounded-full flex items-center justify-center">
                                    <span className="text-white text-sm font-medium">
                                        A
                                    </span>
                                </div>
                                <span className="ml-3 text-slate-300 text-sm">
                                    Admin
                                </span>
                            </div>
                            <button
                                onClick={logout}
                                className="text-slate-400 hover:text-red-400 transition-colors"
                                title="Logout"
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
                                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="pl-64">
                <main className="min-h-screen">{children}</main>
            </div>
        </div>
    );
}
