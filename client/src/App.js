import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Editor from './pages/Editor';
import Templates from './pages/Templates';
import WordCounter from './pages/WordCounter';
import Planner from './pages/Planner';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/documents/:id" element={<Editor />} />
        <Route path="/templates" element={<Templates />} />
        <Route path="/word-counter" element={<WordCounter />} />
        <Route path="/planner" element={<Planner />} />
      </Routes>
    </Router>
  );
}

export default App;
