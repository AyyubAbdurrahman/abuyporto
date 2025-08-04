import React, { useState } from "react";
import api from "../Components/Utils/api";

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);
        try {
            // Simulasi, bisa dihubungkan ke endpoint backend jika ada
            await new Promise((res) => setTimeout(res, 1000));
            setSuccess(true);
            setForm({ name: '', email: '', message: '' });
        } catch {
            setError('Failed to send message');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900">
            <form onSubmit={handleSubmit} className="bg-slate-800 p-8 rounded-lg shadow-lg w-full max-w-md space-y-4">
                <h1 className="text-3xl font-bold text-sky-400 mb-4">Contact Me</h1>
                <input name="name" value={form.name} onChange={handleChange} placeholder="Your Name" className="input-field" required />
                <input name="email" value={form.email} onChange={handleChange} placeholder="Your Email" className="input-field" required type="email" />
                <textarea name="message" value={form.message} onChange={handleChange} placeholder="Your Message" className="input-field" required />
                {success && <div className="text-green-400">Message sent!</div>}
                {error && <div className="text-red-400">{error}</div>}
                <button type="submit" className="btn-primary w-full" disabled={loading}>{loading ? 'Sending...' : 'Send Message'}</button>
            </form>
        </div>
    );
}
