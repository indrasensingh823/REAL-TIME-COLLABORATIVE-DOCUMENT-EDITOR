import React, { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { io } from 'socket.io-client';
import jsPDF from 'jspdf';

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
    const s = io('http://localhost:5002'); // ✅ Your server port
    socketRef.current = s;

    const editorContainer = document.createElement('div');
    editorRef.current.innerHTML = '';
    editorRef.current.append(editorContainer);

    const q = new Quill(editorContainer, {
      theme: 'snow',
      modules: { toolbar: TOOLBAR_OPTIONS },
    });
    // q.disable();
    // q.setText('Loading document...');
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
      alert('Document Saved!');
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
  };

  const handleExportPdf = () => {
    if (!quillRef.current) return;
    const text = quillRef.current.getText();
    const pdf = new jsPDF();
    const lines = pdf.splitTextToSize(text, 180);
    pdf.text(lines, 15, 20);
    pdf.save(`document-${documentId}.pdf`);
  };

  return (
    <div style={{ margin: 50 }}>
      <div style={{ marginBottom: 20 }}>
        <button onClick={handleSave} style={btnStyle}>💾 Save</button>
        <button onClick={handleExportTxt} style={btnStyle}>📤 Export TXT</button>
        <button onClick={handleExportPdf} style={btnStyle}>📝 Export PDF</button>
      </div>
      <div className="container" ref={editorRef} />
    </div>
  );
}

const btnStyle = {
  marginRight: 10,
  padding: '10px 20px',
  backgroundColor: '#1a73e8',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};
