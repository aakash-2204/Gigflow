# Setup Guide

This document provides step-by-step instructions to set up and run the GigFlow project locally.

---

# Project Overview

GigFlow is a full-stack CRM dashboard developed using:

Frontend:
- React
- TypeScript
- Vite
- Tailwind CSS

Backend:
- Node.js
- Express.js
- TypeScript
- MongoDB Atlas
- JWT Authentication

Deployment:
- Vercel (Frontend)
- Render (Backend)

Database:
- MongoDB Atlas

---

# Prerequisites

Install the following before running the project:

1. Node.js

Download:

https://nodejs.org/

Recommended version:

```text
v18+
```

Check installation:

```bash
node -v
npm -v
```

---

2. Git

Download:

https://git-scm.com/downloads

Check:

```bash
git --version
```

---

3. VS Code

Download:

https://code.visualstudio.com/

Recommended extensions:

- ESLint
- Prettier
- Tailwind CSS IntelliSense
- MongoDB for VS Code

---

4. MongoDB Atlas Account

Create:

https://www.mongodb.com/cloud/atlas

---

# Clone Repository

Run:

```bash
git clone https://github.com/aakash-2204/Gigflow.git
```

Move into project:

```bash
cd Gigflow
```

---

# Install Frontend Dependencies

Open terminal:

```bash
cd frontend
```

Install packages:

```bash
npm install
```

Run frontend:

```bash
npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

---

# Install Backend Dependencies

Open another terminal:

```bash
cd backend
```

Install packages:

```bash
npm install
```

Run backend:

```bash
npm run dev
```

Backend runs at:

```text
http://localhost:5000
```

---

# Environment Variables

Create:

```text
backend/.env
```

Add:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

NODE_ENV=development
```

Example:

```env
PORT=5000

MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/gigflow

JWT_SECRET=mysecret123

NODE_ENV=development
```

---

# MongoDB Atlas Configuration

Step 1:

Create a cluster

---

Step 2:

Create database user:

```text
Username:
Password:
```

---

Step 3:

Add IP Access

Add:

```text
0.0.0.0/0
```

Allows connections from all IPs.

---

Step 4:

Copy connection string

Example:

```text
mongodb+srv://username:password@cluster.mongodb.net/
```

---

Step 5:

Update:

```env
MONGO_URI=
```

inside `.env`

---

# Folder Structure

```bash
Gigflow/
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── pages/
│   │   ├── components/
│   │   └── App.tsx
│   │
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── models/
│   │   └── server.ts
│   │
│   └── package.json
│
├── README.md
├── API_DOCUMENTATION.md
├── SETUP_GUIDE.md
└── .env.example
```

---

# Running Full Project

Terminal 1:

Frontend:

```bash
cd frontend

npm run dev
```

---

Terminal 2:

Backend:

```bash
cd backend

npm run dev
```

---

Open:

Frontend:

```text
http://localhost:5173
```

Backend:

```text
http://localhost:5000
```

---

# Test Credentials

Login using:

Email:

```text
admin@gmail.com
```

Password:

```text
admin123
```

---

# Deployment

Frontend deployed on:

```text
https://gigflow-7cfc.vercel.app
```

Backend deployed on:

```text
https://gigflow-w412.onrender.com
```

---

# Common Issues & Fixes

## MongoDB Connection Error

Issue:

```text
Could not connect to MongoDB
```

Fix:

Check:

- MONGO_URI
- IP Access
- Database user credentials

---

## CORS Error

Issue:

```text
Blocked by CORS policy
```

Fix:

Update backend CORS configuration with frontend URL.

---

## Login Failed

Issue:

```text
Invalid credentials
```

Fix:

Use correct credentials or create new user.

---

## Render Build Failure

Issue:

```text
Build failed
```

Fix:

Check:

- Environment variables
- Build command
- TypeScript errors

---

# Docker (Optional)

Build:

```bash
docker compose up --build
```

---

# Recommended Workflow

1. Start backend
2. Start frontend
3. Login
4. Create leads
5. Edit/Delete leads
6. Export CSV
7. Test deployment

---

# Support

Repository:

```text
https://github.com/aakash-2204/Gigflow
```

Frontend:

```text
https://gigflow-7cfc.vercel.app
```

Backend:

```text
https://gigflow-w412.onrender.com
```
