import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext";
import Navbar from "./Components/Layout/Navbar";
import Footer from "./Components/Layout/Footer";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Projects from "./Pages/Projects";
import ProjectDetail from "./Pages/ProjectDetail";
import Contact from "./Pages/Contact";
import AdminLogin from "./Pages/Admin/Login";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import AdminProjects from "./Pages/Admin/AdminProjects";
import "../css/app.css";
import "./bootstrap";

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="min-h-screen bg-slate-900 text-slate-100">
                    <Routes>
                        {/* Admin Routes */}
                        <Route path="/admin/login" element={<AdminLogin />} />
                        <Route path="/admin" element={<AdminDashboard />} />
                        <Route
                            path="/admin/projects"
                            element={<AdminProjects />}
                        />

                        {/* Public Routes */}
                        <Route
                            path="/*"
                            element={
                                <>
                                    <Navbar />
                                    <Routes>
                                        <Route path="/" element={<Home />} />
                                        <Route
                                            path="/about"
                                            element={<About />}
                                        />
                                        <Route
                                            path="/projects"
                                            element={<Projects />}
                                        />
                                        <Route
                                            path="/projects/:id"
                                            element={<ProjectDetail />}
                                        />
                                        <Route
                                            path="/contact"
                                            element={<Contact />}
                                        />
                                    </Routes>
                                    <Footer />
                                </>
                            }
                        />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}

const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App />);
