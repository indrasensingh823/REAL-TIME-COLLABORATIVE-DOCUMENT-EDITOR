import React, { useState, useEffect, useRef } from 'react';
import html2pdf from 'html2pdf.js';
import domtoimage from 'dom-to-image';
import '../styles/Planner.css';

export default function Planner() {
  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem('planner-events');
    return saved ? JSON.parse(saved) : [];
  });

  const [date, setDate] = useState('');
  const [desc, setDesc] = useState('');
  const [search, setSearch] = useState('');
  const plannerRef = useRef();

  useEffect(() => {
    localStorage.setItem('planner-events', JSON.stringify(events));
  }, [events]);

  const addEvent = () => {
    if (!date || !desc) return;
    setEvents([...events, { date, desc }]);
    setDate('');
    setDesc('');
  };

  const deleteEvent = (index) => {
    const newEvents = [...events];
    newEvents.splice(index, 1);
    setEvents(newEvents);
  };

  const filteredEvents = events.filter(event =>
    event.date.includes(search) || event.desc.toLowerCase().includes(search.toLowerCase())
  );

  // Export functions
  const exportTxt = () => {
    const text = filteredEvents.map(e => `${e.date} - ${e.desc}`).join('\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'planner.txt';
    link.click();
  };

  const exportCsv = () => {
    const csv = filteredEvents.map(e => `"${e.date}","${e.desc}"`).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'planner.csv';
    link.click();
  };

  const exportPdf = () => {
    html2pdf().from(plannerRef.current).save('planner.pdf');
  };

  const exportJpg = () => {
    domtoimage.toJpeg(plannerRef.current).then(dataUrl => {
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'planner.jpg';
      link.click();
    });
  };

  const exportDoc = () => {
    const html = filteredEvents.map(e => `<p>${e.date} - ${e.desc}</p>`).join('');
    const blob = new Blob([html], { type: 'application/msword' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'planner.doc';
    link.click();
  };

  return (
    <div className="planner-container">
      <h1>📅 Personal Planner</h1>

      <div className="input-section">
        <input type="date" value={date} onChange={e => setDate(e.target.value)} />
        <input type="text" value={desc} onChange={e => setDesc(e.target.value)} placeholder="Event description" />
        <button onClick={addEvent}>Add Event</button>
      </div>

      <div className="search-section">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search events..."
        />
      </div>

      <div className="export-buttons">
        <button onClick={exportTxt}>Export TXT</button>
        <button onClick={exportCsv}>Export CSV</button>
        <button onClick={exportPdf}>Export PDF</button>
        <button onClick={exportJpg}>Export JPG</button>
        <button onClick={exportDoc}>Export DOC</button>
      </div>

      <div className="events-list" ref={plannerRef}>
        {filteredEvents.length === 0 && <p>No matching events.</p>}
        {filteredEvents.map((event, idx) => (
          <div key={idx} className="event-item">
            <span>{event.date} - {event.desc}</span>
            <button onClick={() => deleteEvent(idx)}>❌</button>
          </div>
        ))}
      </div>
    </div>
  );
}
