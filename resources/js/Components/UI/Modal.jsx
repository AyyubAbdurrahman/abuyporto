import React from "react";

export default function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-slate-800 rounded-lg shadow-lg p-6 min-w-[300px] max-w-lg w-full relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-slate-400 hover:text-sky-400"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                {children}
            </div>
        </div>
    );
}
