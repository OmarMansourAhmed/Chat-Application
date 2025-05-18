# 🦇 Bat-Chat

**Smart. Secure. Real-Time.**  
A full-stack real-time chat application with a Batman-inspired UI, designed for seamless communication, modern features, and powerful tech.

---

## 📸 Demo

![image](https://github.com/user-attachments/assets/4107f60b-9427-4e91-b3d5-8c6fba3d5705)
![image](https://github.com/user-attachments/assets/16e3b546-b61a-43f3-8fc6-ee2b2c3a77c7)
![image](https://github.com/user-attachments/assets/b306d6ac-18d2-4317-8eae-bcc65ea81151)
![image](https://github.com/user-attachments/assets/a16c1f1f-1b9d-43f4-8faf-fb66b56d35bf)
![image](https://github.com/user-attachments/assets/638dae45-4f62-4d9b-aa60-bc5089fae84c)
![image](https://github.com/user-attachments/assets/ea85ffd7-0f38-4097-9d4d-12f681c33614)
![image](https://github.com/user-attachments/assets/2be21479-926e-448c-a711-407a7dd240f8)
![image](https://github.com/user-attachments/assets/59cf896a-bd92-4ac1-a6e8-57be0efeb0b4)


---

## 🚀 Features

- 🕵️‍♂️ Real-time messaging (WebSockets)
- 👤 User authentication & registration
- 💬 Private & group chat support
- 🌙 Dark-themed, Batman-inspired UI
- 🧠 AI assistant for suggestions (optional)
- 🛡️ Secure communication (JWT, HTTPS)
- 📱 Responsive design (mobile & desktop)
- 🗑️ Message history & delete support

---

## 🛠️ Tech Stack

**Frontend:**
- React 
- Tailwind CSS 
- Socket.IO-client

**Backend:**
- Node.js + Express
- Socket.IO-server
- JWT Authentication
- MongoDB / Cloudinary

**Real-time:**
- WebSockets via Socket.IO



## 📂 Project Structure
CHAT-APPLICATION/  

│  

├── backend/ # Backend code  

│ ├── config/ # DB & environment setup  

│ ├── controllers/ # Route logic  

│ ├── data/ 

│ ├── middlewares/ # Custom middleware (e.g. auth)  

│ ├── models/ # Mongoose schemas  

│ ├── routes/ # API routes  

│ └── server.js # Main server file  

│  

├── frontend/ # Frontend (React)  

│ ├── public/ # Static files  

│ ├── src/  

│ │ ├── animations/ # UI animations (e.g. transitions)  

│ │ ├── components/ # Reusable UI components  

│ │ ├── config/ # Frontend config (e.g. URLs)  

│ │ ├── Context/ # React context for auth or chat  

│ │ ├── pages/ # Page-level components  

│ │ ├── App.js # Root component  

│ │ ├── App.css # App styling   

│ │ ├── index.js # Entry point  

│ │ └── index.css # Global styles  

│ └── chatbackground.webp # Background asset  

│  

├── .env # Environment variables  

├── .gitignore  

├── package.json  

├── README.md # You're here!  

└── node_modules/  



## 🚀 Getting Started

To run the project locally:

Clone the repository using:

```bash
git clone https://github.com/your-username/chat-application.git
cd chat-application

cd backend
npm install
npm start

./env
PORT=5000
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-secret-key
CLIENT_URL=http://localhost:3000


cd frontend
npm install
npm start
