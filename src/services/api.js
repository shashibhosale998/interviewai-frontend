import axios from 'axios';

const BASE_URL = 'https://interviewai-backend-wg7p.onrender.com/api/interview';

// Start Interview
export const startInterview = async (data) => {
    const response = await axios.post(`${BASE_URL}/start`, data);
    return response.data;
};

// Submit Answer
export const submitAnswer = async (data) => {
    const response = await axios.post(`${BASE_URL}/answer`, data);
    return response.data;
};

// Get Report
export const getReport = async (sessionId) => {
    const response = await axios.get(`${BASE_URL}/report/${sessionId}`);
    return response.data;
};