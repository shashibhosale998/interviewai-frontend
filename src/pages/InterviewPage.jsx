import React, { useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { submitAnswer } from '../services/api';

function InterviewPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const interviewData = location.state;

    const [currentIndex, setCurrentIndex] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [answeredAll, setAnsweredAll] = useState(false);
    const recognitionRef = useRef(null);

    const questions = interviewData?.questions || [];
    const currentQuestion = questions[currentIndex];

    // Start Listening
    const startListening = () => {
        const SpeechRecognition =
            window.SpeechRecognition ||
            window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            alert('Speech not supported in this browser!');
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.continuous = true;        // ✅ Keeps listening!
        recognition.interimResults = true;    // ✅ Shows while speaking!

        recognition.onstart = () => setIsListening(true);

        recognition.onresult = (event) => {
            let finalTranscript = '';
            for (let i = 0; i < event.results.length; i++) {
                if (event.results[i].isFinal) {
                    finalTranscript += event.results[i][0].transcript;
                }
            }
            if (finalTranscript) {
                setUserAnswer(prev => prev + ' ' + finalTranscript);
            }
        };

        recognition.onerror = () => setIsListening(false);
        recognition.onend = () => setIsListening(false);

        recognitionRef.current = recognition;
        recognition.start();
    };

    // Stop Listening Manually
    const stopListening = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
            setIsListening(false);
        }
    };

    // Submit Answer
    const handleSubmit = async () => {
        if (!userAnswer.trim()) {
            alert('Please provide an answer!');
            return;
        }
        if (isListening) stopListening();
        setLoading(true);
        try {
            const response = await submitAnswer({
                sessionId: interviewData.sessionId,
                question: currentQuestion,
                userAnswer: userAnswer,
                questionNumber: currentIndex + 1
            });
            setFeedback(response);
        } catch (error) {
            alert('Something went wrong!');
        }
        setLoading(false);
    };

    // Next Question
    const handleNext = () => {
        if (currentIndex + 1 >= questions.length) {
            setAnsweredAll(true);
        } else {
            setCurrentIndex(currentIndex + 1);
            setUserAnswer('');
            setFeedback(null);
        }
    };

    if (!interviewData) {
        return (
            <div className="min-h-screen bg-gray-950 flex items-center justify-center">
                <p className="text-white">No interview data!</p>
            </div>
        );
    }

    const progress = ((currentIndex + 1) / questions.length) * 100;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-blue-950 px-4 py-8">
            <div className="max-w-3xl mx-auto">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-white font-bold text-lg">
                            {interviewData.candidateName}
                        </h2>
                        <p className="text-gray-400 text-sm">
                            {interviewData.role} • {interviewData.difficulty}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-blue-400 font-bold text-lg">
                            {currentIndex + 1}/{questions.length}
                        </p>
                        <p className="text-gray-400 text-sm">Questions</p>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-800 rounded-full h-2 mb-8">
                    <div
                        className="bg-gradient-to-r from-blue-500 to-blue-400 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                {!answeredAll ? (
                    <div className="bg-gray-900/80 backdrop-blur rounded-3xl p-6 border border-gray-800 shadow-2xl">

                        {/* Question */}
                        <div className="bg-gray-800/50 rounded-2xl p-5 mb-6 border border-gray-700">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                                    Q{currentIndex + 1}
                                </span>
                                <span className="text-gray-400 text-sm">
                                    {interviewData.difficulty} Level
                                </span>
                            </div>
                            <p className="text-white text-lg font-medium leading-relaxed">
                                {currentQuestion}
                            </p>
                        </div>

                        {/* Answer Area */}
                        {!feedback && (
                            <>
                                <textarea
                                    value={userAnswer}
                                    onChange={(e) => setUserAnswer(e.target.value)}
                                    placeholder="Type your answer here or use voice input below..."
                                    rows={5}
                                    className="w-full bg-gray-800 text-white rounded-xl px-4 py-3 border border-gray-700 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 resize-none mb-4 placeholder-gray-500 transition-all"
                                />

                                {/* Voice Section */}
                                <div className="bg-gray-800/50 rounded-2xl p-4 mb-4 border border-gray-700">
                                    <p className="text-gray-400 text-sm mb-3 text-center">
                                        🎤 Voice Input
                                    </p>
                                    <div className="flex gap-3">
                                        {!isListening ? (
                                            <button
                                                onClick={startListening}
                                                className="flex-1 bg-green-500 hover:bg-green-600 text-white font-medium py-3 rounded-xl transition-all flex items-center justify-center gap-2"
                                            >
                                                🎤 Start Speaking
                                            </button>
                                        ) : (
                                            <button
                                                onClick={stopListening}
                                                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium py-3 rounded-xl transition-all animate-pulse flex items-center justify-center gap-2"
                                            >
                                                🔴 Stop Speaking
                                            </button>
                                        )}
                                    </div>
                                    {isListening && (
                                        <p className="text-green-400 text-sm text-center mt-2 animate-pulse">
                                            🎙️ Listening... Speak your answer!
                                        </p>
                                    )}
                                </div>

                                {/* Submit */}
                                <button
                                    onClick={handleSubmit}
                                    disabled={loading}
                                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-4 rounded-xl transition-all text-lg shadow-lg shadow-blue-500/20 disabled:opacity-50"
                                >
                                    {loading
                                        ? '⏳ AI is analyzing your answer...'
                                        : '✅ Submit Answer'}
                                </button>
                            </>
                        )}

                        {/* Feedback */}
                        {feedback && (
                            <div className="space-y-4">

                                {/* Score */}
                                <div className="bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-2xl p-5 text-center border border-blue-500/30">
                                    <p className="text-gray-400 text-sm mb-1">Your Score</p>
                                    <p className="text-6xl font-bold text-white">
                                        {feedback.score}
                                        <span className="text-2xl text-gray-400">/10</span>
                                    </p>
                                    <div className="flex justify-center mt-2">
                                        {[...Array(10)].map((_, i) => (
                                            <div
                                                key={i}
                                                className={`w-5 h-2 rounded-full mx-0.5 ${
                                                    i < feedback.score
                                                        ? 'bg-blue-400'
                                                        : 'bg-gray-700'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Feedback */}
                                <div className="bg-gray-800/50 rounded-2xl p-4 border border-gray-700">
                                    <p className="text-blue-400 font-medium mb-2 flex items-center gap-2">
                                        📝 AI Feedback
                                    </p>
                                    <p className="text-gray-300 leading-relaxed">
                                        {feedback.feedback}
                                    </p>
                                </div>

                                {/* Tip */}
                                <div className="bg-green-500/10 rounded-2xl p-4 border border-green-500/30">
                                    <p className="text-green-400 font-medium mb-2 flex items-center gap-2">
                                        💡 Tip to Improve
                                    </p>
                                    <p className="text-gray-300 leading-relaxed">
                                        {feedback.tip}
                                    </p>
                                </div>

                                {/* Next */}
                                <button
                                    onClick={handleNext}
                                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-4 rounded-xl transition-all text-lg shadow-lg shadow-blue-500/20"
                                >
                                    {currentIndex + 1 >= questions.length
                                        ? '📊 View Final Report'
                                        : '➡️ Next Question'}
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="bg-gray-900/80 rounded-3xl p-8 border border-gray-800 text-center">
                        <p className="text-6xl mb-4">🎉</p>
                        <h2 className="text-3xl font-bold text-white mb-2">
                            Interview Complete!
                        </h2>
                        <p className="text-gray-400 mb-6">
                            Great job {interviewData.candidateName}!
                        </p>
                        <button
                            onClick={() => navigate(`/report/${interviewData.sessionId}`)}
                            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-4 px-8 rounded-xl transition-all text-lg shadow-lg shadow-blue-500/20"
                        >
                            📊 View Full Report
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default InterviewPage;