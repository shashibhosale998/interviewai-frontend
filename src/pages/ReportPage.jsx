import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getReport } from '../services/api';

function ReportPage() {
    const { sessionId } = useParams();
    const navigate = useNavigate();
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReport = async () => {
            try {
                const data = await getReport(sessionId);
                setReport(data);
            } catch (error) {
                alert('Error loading report!');
            }
            setLoading(false);
        };
        fetchReport();
    }, [sessionId]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-950 flex items-center justify-center">
                <p className="text-blue-400 text-xl">⏳ Loading Report...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-950 px-4 py-8">
            <div className="max-w-3xl mx-auto">

                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-blue-400">
                        📊 Interview Report
                    </h1>
                    <p className="text-gray-400 mt-2">
                        {report?.session?.candidateName} |
                        {report?.session?.role} |
                        {report?.session?.difficulty}
                    </p>
                </div>

                {/* Score Card */}
                <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 text-center mb-6">
                    <p className="text-gray-400 mb-2">Total Score</p>
                    <p className="text-6xl font-bold text-blue-400">
                        {report?.totalScore}
                        <span className="text-3xl text-gray-400">
                            /{report?.totalQuestions * 10}
                        </span>
                    </p>
                    <p className="text-gray-400 mt-2">
                        Average: {report?.averageScore}/10 per question
                    </p>
                </div>

                {/* All Q&A */}
                <div className="space-y-4">
                    {report?.qaList?.map((qa, index) => (
                        <div
                            key={index}
                            className="bg-gray-900 rounded-2xl p-6 border border-gray-800"
                        >
                            {/* Question */}
                            <p className="text-blue-400 font-medium mb-2">
                                Q{qa.questionNumber}: {qa.question}
                            </p>

                            {/* Your Answer */}
                            <div className="bg-gray-800 rounded-xl p-3 mb-3">
                                <p className="text-gray-400 text-sm">Your Answer:</p>
                                <p className="text-white">{qa.userAnswer}</p>
                            </div>

                            {/* Score */}
                            <div className="flex items-center gap-2 mb-3">
                                <p className="text-gray-400 text-sm">Score:</p>
                                <p className="text-blue-400 font-bold">
                                    {qa.score}/10
                                </p>
                            </div>

                            {/* Feedback */}
                            <div className="bg-gray-800 rounded-xl p-3">
                                <p className="text-green-400 text-sm mb-1">
                                    AI Feedback:
                                </p>
                                <p className="text-gray-300 text-sm">
                                    {qa.aiFeedback}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Try Again */}
                <button
                    onClick={() => navigate('/')}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 rounded-lg mt-6 transition-all text-lg"
                >
                    🔄 Try Again
                </button>
            </div>
        </div>
    );
}

export default ReportPage;