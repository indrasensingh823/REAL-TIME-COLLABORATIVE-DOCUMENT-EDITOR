import React, { useState } from 'react';
import '../styles/WordCounter.css';

export default function WordCounter() {
  const [text, setText] = useState('');

  // Word count
  const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;

  // Character count excluding spaces
  const charCount = text.replace(/\s/g, '').length;

  // Estimated reading time (200 WPM average)
  const readingTime = (wordCount / 200).toFixed(2);

  return (
    <div className="word-counter-container">
      <h1>🔤 Word Counter / Analyzer</h1>
      
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste or type your text here..."
      ></textarea>

      <div className="stats">
        <p><strong>Words:</strong> {wordCount}</p>
        <p><strong>Characters (no spaces):</strong> {charCount}</p>
        <p><strong>Estimated Reading Time:</strong> {readingTime} minutes</p>
      </div>
    </div>
  );
}
