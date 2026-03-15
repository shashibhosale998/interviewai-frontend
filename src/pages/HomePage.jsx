import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { startInterview } from '../services/api';

function HomePage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        candidateName: '',
        role: '',
        customRole: '',
        difficulty: 'Medium',
        questionCount: 5
    });

    const roles = [
        'Java Developer', 'React Developer',
        'Spring Boot Developer', 'Full Stack Developer',
        'Angular Developer', 'Python Developer',
        'Node.js Developer', 'Data Analyst',
        'Data Scientist', 'Machine Learning Engineer',
        'DevOps Engineer', 'Cloud Engineer',
        'Android Developer', 'iOS Developer',
        'UI/UX Designer', 'Database Administrator',
        'Cybersecurity Engineer', 'QA Engineer',
        'Other (Custom Role)'
    ];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleStart = async () => {
        const finalRole = formData.role === 'Other (Custom Role)'
            ? formData.customRole : formData.role;
        if (!formData.candidateName || !finalRole) {
            alert('Please fill all fields!');
            return;
        }
        if (!formData.questionCount || formData.questionCount < 1) {
            alert('Please select at least 1 question!');
            return;
        }
        setLoading(true);
        try {
            const response = await startInterview({
                candidateName: formData.candidateName,
                role: finalRole,
                difficulty: formData.difficulty,
                questionCount: formData.questionCount
            });
            navigate('/interview', { state: response });
        } catch (error) {
            alert('Something went wrong!');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">

            {/* Navbar */}
            <nav className="bg-white border-b border-gray-200 px-8 py-4 sticky top-0 z-50">
                <div className="max-w-6xl mx-auto flex justify-between items-center">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <span className="text-2xl">🤖</span>
                        <span className="text-xl font-bold text-gray-900">
                            Interview<span className="text-purple-600">AI</span>
                        </span>
                    </div>

                    {/* Nav Links */}
                    <div className="hidden md:flex items-center gap-8">
                        <a href="#features" className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-all">
                            FEATURES
                        </a>
                        <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-all">
                            HOW IT WORKS
                        </a>
                        <a href="#pricing" className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-all">
                            PRICING
                        </a>
                    </div>

                    {/* CTA */}
                    <div className="flex items-center gap-3">
                        <button className="text-gray-600 hover:text-gray-900 text-sm font-medium">
                            Sign In
                        </button>
                        <button
                            onClick={() => setShowForm(true)}
                            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-all"
                        >
                            Start For Free
                        </button>
                    </div>
                </div>
            </nav>

            {!showForm ? (
                <div className="max-w-6xl mx-auto px-4">

                    {/* Hero Section */}
                    <div className="flex flex-col md:flex-row items-center justify-between pt-16 pb-20 gap-12">

                        {/* Left Side */}
                        <div className="flex-1">
                            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6 text-gray-900">
                                Voted #1
                                <span className="text-purple-600"> AI-Powered</span>
                                <br />Interview Coach
                            </h1>
                            <p className="text-gray-600 text-lg mb-8 leading-relaxed max-w-lg">
                                Ace your interview with
                                <strong> AI-Generated Questions, Voice Input</strong> and
                                <strong> Instant Feedback</strong>
                            </p>

                            {/* CTA */}
                            <div className="flex items-center gap-4 mb-8">
                                <button
                                    onClick={() => setShowForm(true)}
                                    className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-8 py-4 rounded-lg text-lg transition-all shadow-lg shadow-purple-200"
                                >
                                    Start For Free
                                </button>
                                <div>
                                    <p className="text-gray-500 text-sm">No Credit Card Needed.</p>
                                    <p className="text-gray-500 text-sm">Start Right Away.</p>
                                </div>
                            </div>

                            {/* Rating */}
                            <div className="flex items-center gap-3">
                                <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i} className="text-yellow-400 text-lg">⭐</span>
                                    ))}
                                </div>
                                <span className="text-gray-600 text-sm">
                                    Rated By <strong className="text-purple-600">10,000+</strong> Users
                                </span>
                            </div>
                        </div>

                        {/* Right Side - Demo Card */}
                        <div className="flex-1 max-w-lg">
                            <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-6">
                                <div className="bg-gray-900 rounded-xl p-4 mb-4">
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                        <span className="text-gray-400 text-xs ml-2">Interview Session</span>
                                    </div>
                                    <p className="text-green-400 text-sm font-mono mb-2">
                                        Q: What is OOPs concept in Java?
                                    </p>
                                    <p className="text-gray-300 text-xs leading-relaxed">
                                        AI is analyzing your answer...
                                    </p>
                                </div>
                                <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
                                    <p className="text-purple-600 text-sm font-semibold mb-1">
                                        🤖 AI Feedback
                                    </p>
                                    <p className="text-gray-600 text-xs leading-relaxed">
                                        Good answer! You correctly explained encapsulation
                                        and inheritance. Consider adding polymorphism examples
                                        for a complete answer.
                                    </p>
                                    <div className="flex items-center gap-2 mt-3">
                                        <span className="text-purple-600 font-bold text-lg">8/10</span>
                                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                                            <div className="bg-purple-600 h-2 rounded-full w-4/5"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats Counter */}
                    <div className="text-center py-8 border-t border-b border-gray-200 mb-16">
                        <p className="text-gray-600 text-lg">
                            <span className="text-purple-600 font-bold text-2xl">50,000+</span>
                            {" "}Interview Questions Have Been Generated for{" "}
                            <span className="text-purple-600 font-bold">Software Developers</span>
                        </p>
                    </div>

                    {/* Company Logos */}
                    <div className="flex flex-wrap justify-center items-center gap-8 mb-16 opacity-60">
                        {['Google', 'Amazon', 'Microsoft', 'Meta', 'Apple', 'Netflix'].map((company) => (
                            <span key={company} className="text-gray-400 font-bold text-lg">
                                {company}
                            </span>
                        ))}
                    </div>

                    {/* Why Choose Section */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-purple-600 text-center mb-10">
                            Why Users Choose InterviewAI
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                { number: '5X', label: 'Higher Interview Success', desc: 'Users are 5x more likely to land jobs with AI practice' },
                                { number: '10K+', label: 'Users Worldwide', desc: 'Growing community of professionals accelerating careers' },
                                { number: '19+', label: 'Job Roles Covered', desc: 'From Java Developer to Data Scientist and everything between' }
                            ].map(({ number, label, desc }) => (
                                <div key={label} className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-md transition-all">
                                    <p className="text-5xl font-bold text-purple-600 mb-2">{number}</p>
                                    <p className="text-gray-900 font-bold text-lg mb-2">{label}</p>
                                    <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Features */}
                    <div id="features" className="mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
                            Everything You Need to Ace Interviews
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                {
                                    icon: '🎤',
                                    title: 'Voice Input',
                                    desc: 'Speak your answers naturally. AI listens, transcribes and analyzes in real time.'
                                },
                                {
                                    icon: '🤖',
                                    title: 'AI Feedback',
                                    desc: 'Get instant detailed feedback and score on every answer from Groq AI.'
                                },
                                {
                                    icon: '📊',
                                    title: 'Score Report',
                                    desc: 'Detailed performance report with tips to improve after every session.'
                                },
                                {
                                    icon: '🎯',
                                    title: 'Role Specific',
                                    desc: 'Questions tailored specifically for your job role and difficulty level.'
                                },
                                {
                                    icon: '⚡',
                                    title: 'Instant Results',
                                    desc: 'Powered by Groq AI for lightning fast question generation and feedback.'
                                },
                                {
                                    icon: '🔄',
                                    title: 'Practice Anytime',
                                    desc: 'Practice unlimited times with different questions every session.'
                                }
                            ].map(({ icon, title, desc }) => (
                                <div
                                    key={title}
                                    className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md hover:border-purple-200 transition-all"
                                >
                                    <span className="text-3xl mb-4 block">{icon}</span>
                                    <h3 className="text-gray-900 font-bold text-lg mb-2">{title}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* How It Works */}
                    <div id="how-it-works" className="mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
                            How It Works
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {[
                                { step: '01', title: 'Choose Role', desc: 'Select your job role and difficulty level' },
                                { step: '02', title: 'Get Questions', desc: 'AI generates custom interview questions' },
                                { step: '03', title: 'Answer', desc: 'Type or speak your answers naturally' },
                                { step: '04', title: 'Get Report', desc: 'Receive detailed AI feedback and score' }
                            ].map(({ step, title, desc }) => (
                                <div key={step} className="text-center">
                                    <div className="w-14 h-14 bg-purple-100 border-2 border-purple-200 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <span className="text-purple-600 font-bold">{step}</span>
                                    </div>
                                    <h4 className="text-gray-900 font-bold mb-2">{title}</h4>
                                    <p className="text-gray-500 text-sm">{desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA Banner */}
                    <div className="bg-purple-600 rounded-3xl p-12 text-center mb-16">
                        <h2 className="text-3xl font-bold text-white mb-3">
                            Try InterviewAI Now for FREE
                        </h2>
                        <p className="text-purple-200 mb-8 text-lg">
                            No signup required. Start practicing immediately!
                        </p>
                        <button
                            onClick={() => setShowForm(true)}
                            className="bg-white text-purple-600 font-bold px-10 py-4 rounded-xl text-lg hover:bg-gray-100 transition-all shadow-lg"
                        >
                            🚀 Start Interview Now
                        </button>
                    </div>
                </div>
            ) : (

                /* Interview Form */
                <div className="flex items-center justify-center px-4 py-16 bg-gray-50 min-h-screen">
                    <div className="w-full max-w-lg">

                        {/* Back */}
                        <button
                            onClick={() => setShowForm(false)}
                            className="text-gray-500 hover:text-gray-900 mb-6 flex items-center gap-2 transition-all text-sm"
                        >
                            ← Back to Home
                        </button>

                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-gray-900">
                                Setup Your Interview
                            </h2>
                            <p className="text-gray-500 mt-2">
                                Fill in your details to get AI-generated questions
                            </p>
                        </div>

                        <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-xl">

                            {/* Name */}
                            <div className="mb-5">
                                <label className="text-gray-700 text-sm font-medium mb-2 block">
                                    👤 Your Full Name
                                </label>
                                <input
                                    type="text"
                                    name="candidateName"
                                    placeholder="Enter your full name"
                                    onChange={handleChange}
                                    className="w-full bg-gray-50 text-gray-900 rounded-xl px-4 py-3.5 border border-gray-200 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-all placeholder-gray-400"
                                />
                            </div>

                            {/* Role */}
                            <div className="mb-5">
                                <label className="text-gray-700 text-sm font-medium mb-2 block">
                                    💼 Job Role
                                </label>
                                <select
                                    name="role"
                                    onChange={handleChange}
                                    className="w-full bg-gray-50 text-gray-900 rounded-xl px-4 py-3.5 border border-gray-200 focus:outline-none focus:border-purple-400 transition-all"
                                >
                                    <option value="">Select your role</option>
                                    {roles.map((role) => (
                                        <option key={role} value={role}>{role}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Custom Role */}
                            {formData.role === 'Other (Custom Role)' && (
                                <div className="mb-5">
                                    <label className="text-gray-700 text-sm font-medium mb-2 block">
                                        ✏️ Enter Your Role
                                    </label>
                                    <input
                                        type="text"
                                        name="customRole"
                                        placeholder="e.g. Blockchain Developer"
                                        onChange={handleChange}
                                        className="w-full bg-gray-50 text-gray-900 rounded-xl px-4 py-3.5 border border-gray-200 focus:outline-none focus:border-purple-400 transition-all placeholder-gray-400"
                                    />
                                </div>
                            )}

                            {/* Difficulty */}
                            <div className="mb-5">
                                <label className="text-gray-700 text-sm font-medium mb-2 block">
                                    🎯 Difficulty Level
                                </label>
                                <div className="flex gap-3">
                                    {[
                                        { label: 'Easy', color: 'green' },
                                        { label: 'Medium', color: 'yellow' },
                                        { label: 'Hard', color: 'red' }
                                    ].map(({ label, color }) => (
                                        <button
                                            key={label}
                                            onClick={() => setFormData({ ...formData, difficulty: label })}
                                            className={`flex-1 py-3 rounded-xl font-medium transition-all border ${
                                                formData.difficulty === label
                                                    ? color === 'green'
                                                        ? 'bg-green-500 border-green-500 text-white'
                                                        : color === 'yellow'
                                                        ? 'bg-yellow-500 border-yellow-500 text-white'
                                                        : 'bg-red-500 border-red-500 text-white'
                                                    : 'bg-gray-50 border-gray-200 text-gray-600 hover:border-gray-300'
                                            }`}
                                        >
                                            {label === 'Easy' ? '😊' : label === 'Medium' ? '😐' : '😤'} {label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Question Count */}
                            <div className="mb-6">
                                <label className="text-gray-700 text-sm font-medium mb-2 block">
                                    ❓ Number of Questions
                                </label>
                                <div className="flex gap-2 mb-3">
                                    {[5, 10, 20, 30].map((count) => (
                                        <button
                                            key={count}
                                            onClick={() => setFormData({ ...formData, questionCount: count })}
                                            className={`flex-1 py-2.5 rounded-xl font-medium transition-all border text-sm ${
                                                formData.questionCount === count
                                                    ? 'bg-purple-600 border-purple-600 text-white'
                                                    : 'bg-gray-50 border-gray-200 text-gray-600 hover:border-purple-200'
                                            }`}
                                        >
                                            {count}
                                        </button>
                                    ))}
                                </div>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="flex-1 h-px bg-gray-200"></div>
                                    <span className="text-gray-400 text-xs">or enter custom</span>
                                    <div className="flex-1 h-px bg-gray-200"></div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="number"
                                        min="1"
                                        max="50"
                                        value={formData.questionCount}
                                        onChange={(e) => {
                                            const val = parseInt(e.target.value);
                                            if (val > 0 && val <= 50) {
                                                setFormData({ ...formData, questionCount: val });
                                            }
                                        }}
                                        className="w-full bg-gray-50 text-gray-900 rounded-xl px-4 py-3 border border-gray-200 focus:outline-none focus:border-purple-400 text-center text-lg font-bold"
                                    />
                                    <span className="text-gray-400 text-sm whitespace-nowrap">max 50</span>
                                </div>
                                <p className="text-gray-400 text-xs mt-2 text-center">
                                    {formData.questionCount} questions • ~{formData.questionCount * 2} mins estimated
                                </p>
                            </div>

                            {/* Start Button */}
                            <button
                                onClick={handleStart}
                                disabled={loading}
                                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-xl transition-all text-lg shadow-lg shadow-purple-200 disabled:opacity-50"
                            >
                                {loading ? '⏳ Generating Questions...' : '🚀 Start Interview'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Footer */}
            <footer className="border-t border-gray-200 bg-white px-8 py-6 text-center">
                <p className="text-gray-400 text-sm">
                    © 2026 InterviewAI • Built with React + Spring Boot + Groq AI
                </p>
            </footer>
        </div>
    );
}

export default HomePage;
