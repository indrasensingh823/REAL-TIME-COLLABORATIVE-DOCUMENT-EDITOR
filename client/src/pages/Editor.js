import React, { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { io } from 'socket.io-client';
import jsPDF from 'jspdf';
import '../styles/Editor.css'; // Create this new CSS file

const SAVE_INTERVAL_MS = 2000;
const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, false] }],
  [{ font: [] }],
  [{ size: ['small', false, 'large', 'huge'] }],
  ['bold', 'italic', 'underline', 'strike'],
  [{ color: [] }, { background: [] }],
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ align: [] }],
  ['link', 'image'],
  ['blockquote', 'code-block'],
  [{ script: 'sub' }, { script: 'super' }],
  [{ indent: '-1' }, { indent: '+1' }],
  [{ direction: 'rtl' }],
  ['clean'],
];

export default function DocumentPage() {
  const editorRef = useRef(null);
  const socketRef = useRef();
  const quillRef = useRef();
  const documentId = window.location.pathname.split('/')[2];

  useEffect(() => {
    const s = io('http://localhost:5002');
    socketRef.current = s;

    const editorContainer = document.createElement('div');
    editorRef.current.innerHTML = '';
    editorRef.current.append(editorContainer);

    const q = new Quill(editorContainer, {
      theme: 'snow',
      modules: { toolbar: TOOLBAR_OPTIONS },
    });
    quillRef.current = q;

    s.once('load-document', (document) => {
      q.setContents(document);
      q.enable();
    });

    s.emit('get-document', documentId);

    const saveInterval = setInterval(() => {
      s.emit('save-document', q.getContents());
    }, SAVE_INTERVAL_MS);

    q.on('text-change', (delta, oldDelta, source) => {
      if (source !== 'user') return;
      s.emit('send-changes', delta);
    });

    s.on('receive-changes', (delta) => {
      q.updateContents(delta);
    });

    return () => {
      s.disconnect();
      clearInterval(saveInterval);
    };
  }, [documentId]);

  const handleSave = () => {
    if (socketRef.current && quillRef.current) {
      socketRef.current.emit('save-document', quillRef.current.getContents());
      showNotification('Document saved successfully!');
    }
  };

  const handleExportTxt = () => {
    if (!quillRef.current) return;
    const text = quillRef.current.getText();
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `document-${documentId}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    showNotification('Text file exported!');
  };

  const handleExportPdf = () => {
    if (!quillRef.current) return;
    const text = quillRef.current.getText();
    const pdf = new jsPDF();
    const lines = pdf.splitTextToSize(text, 180);
    pdf.text(lines, 15, 20);
    pdf.save(`document-${documentId}.pdf`);
    showNotification('PDF exported!');
  };

  const showNotification = (message) => {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => {
      notification.classList.add('fade-out');
      setTimeout(() => notification.remove(), 300);
    }, 2000);
  };

  return (
    <div className="document-container">
      <div className="document-header">
        <h2 className="document-title">Editing Document: <span>{documentId}</span></h2>
        <div className="document-actions">
          <button onClick={handleSave} className="action-btn save-btn">
            <span className="btn-icon">💾</span> Save
          </button>
          <button onClick={handleExportTxt} className="action-btn export-btn">
            <span className="btn-icon">📤</span> Export TXT
          </button>
          <button onClick={handleExportPdf} className="action-btn export-btn">
            <span className="btn-icon">📝</span> Export PDF
          </button>
        </div>
      </div>
      <div className="editor-container" ref={editorRef} />
    </div>
  );
}