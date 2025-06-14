const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
const { Server } = require('socket.io');

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

// ✅ MongoDB connection
mongoose
  .connect('mongodb+srv://ins123:ins456@realtime-doc-editor-clu.aroiebv.mongodb.net/realtime-docs?retryWrites=true&w=majority&appName=realtime-doc-editor-Cluster')
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// ✅ Document schema and model
const DocumentSchema = new mongoose.Schema({
  _id: String,
  data: Object, // Quill delta format (recommended type)
});

const Document = mongoose.model('Document', DocumentSchema);

// ✅ Helper function
async function findOrCreateDocument(id) {
  if (!id) return;

  const existingDoc = await Document.findById(id);
  if (existingDoc) return existingDoc;

  return await Document.create({ _id: id, data: { ops: [] } });
}

// ✅ Socket.io logic
io.on('connection', (socket) => {
  console.log(`🔌 New client connected: ${socket.id}`);

  socket.on('get-document', async (documentId) => {
    if (!documentId) {
      socket.emit('error', '❌ Document ID is required');
      return;
    }

    const document = await findOrCreateDocument(documentId);

    socket.join(documentId);
    socket.emit('load-document', document.data);

    socket.on('send-changes', (delta) => {
      socket.broadcast.to(documentId).emit('receive-changes', delta);
    });

    socket.on('save-document', async (data) => {
      try {
        await Document.findByIdAndUpdate(documentId, { data });
        console.log(`💾 Document ${documentId} saved`);
      } catch (err) {
        console.error('❌ Error saving document:', err);
      }
    });
  });

  socket.on('disconnect', () => {
    console.log(`🔌 Client disconnected: ${socket.id}`);
  });
});

// ✅ Start server
const PORT = process.env.PORT || 5002;
server.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});




const path = require('path');
app.use(express.static(path.join(__dirname, '../client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});
