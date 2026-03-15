import React from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();

    return (
        <nav className="bg-gray-900 border-b border-gray-800 px-6 py-4">
            <div className="max-w-6xl mx-auto flex justify-between items-center">

                {/* Logo */}
                <div
                    onClick={() => navigate('/')}
                    className="cursor-pointer flex items-center gap-2"
                >
                    <span className="text-2xl">🤖</span>
                    <span className="text-xl font-bold text-blue-400">
                        InterviewAI
                    </span>
                </div>

                {/* Right Side */}
                <div className="flex items-center gap-4">
                    <span className="text-gray-400 text-sm">
                        Powered by Groq AI
                    </span>
                    <button
                        onClick={() => navigate('/')}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all"
                    >
                        🚀 Start Interview
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;