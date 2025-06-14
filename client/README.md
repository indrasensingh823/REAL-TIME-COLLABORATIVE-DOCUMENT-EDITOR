# 📝 Real-Time Document Collaboration App

This is a **MERN (MongoDB, Express, React, Node.js)** based **Real-Time Document Collaboration App** powered by **Socket.io** and **Quill.js**.  
Users can:
- Collaborate on documents in real-time
- Create and edit rich text documents
- Use pre-made templates (resume, letter, invoice, etc.)
- Download documents as PDF or TXT
- Analyze text with word counter
- Manage personal tasks with a planner

---

## 🚀 Features

✅ Real-time collaboration between multiple users  
✅ Rich text editing with Quill  
✅ MongoDB-based persistent document storage  
✅ Templates library (resume, letter, report, etc.)  
✅ Word counter / analyzer with reading time  
✅ Planner / calendar to track tasks (localStorage)  
✅ Export as PDF / TXT  
✅ Responsive and clean UI  

---

## 📂 Project Structure

Real-time-doc-collab-app/
├── client/ # React frontend
│ ├── src/
│ │ ├── App.js
│ │ ├── index.js
│ │ ├── pages/
│ │ │ ├── Home.js
│ │ │ ├── Editor.js
│ │ │ ├── Templates.js
│ │ │ ├── WordCounter.js
│ │ │ ├── Planner.js
│ └── public/
├── server/ # Express + Socket.io + MongoDB backend
│ └── index.js
├── README.md
└── package.json (root if mono-repo setup)


---

## ⚡ Installation

### Clone repository
```bash
git clone https://github.com/your-username/your-repo-name.git
cd Real-time-doc-collab-app
```
## Backend setup
```bash
cd server
npm install
node index.js
```
---

## Frontend setup
```bash
cd ../client
npm install
npm start
```

---

## Tech Stack

- Frontend: React, Quill.js, React Router, HTML2PDF
- Backend: Node.js, Express, Socket.io
- Database: MongoDB + Mongoose
- Other: LocalStorage, HTML2PDF, FileSaver

---

## License
This project is open source under the MIT License.

## Credits

- Quill.js
- Socket.io
- React
- Express
- MongoDB Atlas

---

✉️ Contact
Feel free to contribute or report issues!
🌟 GitHub: indrasensingh823
📧 Email: indrasensingh823gkp@gmail.com



