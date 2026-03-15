import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import InterviewPage from './pages/InterviewPage';
import ReportPage from './pages/ReportPage';



function App() {
  return (
    <Router>
      <div>
        {}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/interview" element={<InterviewPage />} />
          <Route path="/report/:sessionId" element={<ReportPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
