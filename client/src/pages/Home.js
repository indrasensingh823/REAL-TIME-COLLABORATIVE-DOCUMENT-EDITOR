import React from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidV4 } from 'uuid';
import '../styles/Home.css';

export default function Home() {
  const navigate = useNavigate();

  const createNewDoc = () => {
    const id = uuidV4();
    navigate(`/documents/${id}`);
  };

  return (
    <div className="home-container">
      <h1>📝 Realtime Doc Editor</h1>
      <button className="create-btn" onClick={createNewDoc}>Create New Document</button>
      <button className="create-btn" onClick={() => navigate('/templates')}>📑 Templates</button>
      <button className="create-btn"onClick={() => navigate('/word-counter')}>🔤 Word Counter</button>
      <button className="create-btn" onClick={() => navigate('/planner')}>📅 Planner</button>

    </div>
  );
}