import React, { useState } from 'react';
import api from '../Utils/api';

export default function ProjectForm({ project, onSuccess, onCancel }) {
    const [form, setForm] = useState(project || {
        title: '', description: '', long_description: '', category: 'web',
        technologies: [], image: null, gallery: [], github_url: '', demo_url: '', is_featured: false,
        ui_ux_details: { user_personas: [], empathy_maps: [], problem_statement: '', wireframes: [], usability_tests: [] }
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (type === 'checkbox') setForm({ ...form, [name]: checked });
        else if (type === 'file') setForm({ ...form, [name]: files[0] });
        else setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const formData = new FormData();
            Object.entries(form).forEach(([key, val]) => {
                if (val !== null && typeof val !== 'object') formData.append(key, val);
            });
            if (form.image) formData.append('image', form.image);
            // Add UI/UX details if category is uiux
            if (form.category === 'uiux') {
                Object.entries(form.ui_ux_details).forEach(([k, v]) => {
                    formData.append(`ui_ux_details[${k}]`, JSON.stringify(v));
                });
            }
            if (project) await api.put(`/admin/projects/${project.id}`, formData);
            else await api.post('/admin/projects', formData);
            onSuccess();
        } catch (err) {
            setError('Failed to save project');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-4">
            <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="input-field" required />
            <textarea name="description" value={form.description} onChange={handleChange} placeholder="Short Description" className="input-field" required />
            <textarea name="long_description" value={form.long_description} onChange={handleChange} placeholder="Long Description" className="input-field" />
            <select name="category" value={form.category} onChange={handleChange} className="input-field">
                <option value="web">Web</option>
                <option value="mobile">Mobile</option>
                <option value="uiux">UI/UX</option>
            </select>
            <input name="technologies" value={form.technologies} onChange={e => setForm({ ...form, technologies: e.target.value.split(',') })} placeholder="Technologies (comma separated)" className="input-field" />
            <input type="file" name="image" onChange={handleChange} className="input-field" />
            <input name="github_url" value={form.github_url} onChange={handleChange} placeholder="GitHub URL" className="input-field" />
            <input name="demo_url" value={form.demo_url} onChange={handleChange} placeholder="Demo URL" className="input-field" />
            <label className="flex items-center"><input type="checkbox" name="is_featured" checked={form.is_featured} onChange={handleChange} /> Featured</label>
            {form.category === 'uiux' && (
                <div className="bg-slate-700 p-4 rounded-lg">
                    <textarea name="problem_statement" value={form.ui_ux_details.problem_statement} onChange={e => setForm({ ...form, ui_ux_details: { ...form.ui_ux_details, problem_statement: e.target.value } })} placeholder="Problem Statement" className="input-field" />
                    {/* Add more UI/UX fields as needed */}
                </div>
            )}
            {error && <div className="text-red-500">{error}</div>}
            <div className="flex gap-2">
                <button type="submit" className="btn-primary" disabled={loading}>{loading ? 'Saving...' : 'Save'}</button>
                <button type="button" className="btn-secondary" onClick={onCancel}>Cancel</button>
            </div>
        </form>
    );
}
