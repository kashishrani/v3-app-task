import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Import Routes

import Task from './Task';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Use <Routes> to define your routes */}
        <Routes>
        <Route path="/" element={<Navigate to="/tasks" />} />
          <Route path="/tasks" element={<Task />} /> {/* Use "element" */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
