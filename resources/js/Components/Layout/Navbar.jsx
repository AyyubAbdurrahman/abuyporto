import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const navigation = [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Projects", href: "/projects" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <nav className="bg-slate-900/95 backdrop-blur-sm border-b border-slate-800 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link
                            to="/"
                            className="text-2xl font-bold text-sky-400"
                        >
                            Portfolio
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={`px-3 py-2 text-sm font-medium transition-colors ${
                                    location.pathname === item.href
                                        ? "text-sky-400 border-b-2 border-sky-400"
                                        : "text-slate-300 hover:text-sky-400"
                                }`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-slate-300 hover:text-sky-400 focus:outline-none"
                        >
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                {isOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-slate-800/95 rounded-lg mt-2">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`block px-3 py-2 text-base font-medium rounded-md transition-colors ${
                                        location.pathname === item.href
                                            ? "text-sky-400 bg-slate-700"
                                            : "text-slate-300 hover:text-sky-400 hover:bg-slate-700"
                                    }`}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
