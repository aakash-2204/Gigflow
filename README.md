# GigFlow – Smart Lead Management Dashboard

## Project Overview

GigFlow is a full-stack Customer Relationship Management (CRM) application designed to simplify lead tracking and sales pipeline management for businesses. The platform enables users to securely authenticate, manage customer leads, filter and search records, update lead information, export data, and monitor sales activities through an intuitive dashboard.

The application follows a modern MERN architecture using React and TypeScript for the frontend, Node.js and Express for backend services, and MongoDB Atlas as the cloud database.

---

## Problem Statement

Managing customer leads manually often results in inefficient tracking, delayed follow-ups, and scattered information across multiple systems.

GigFlow addresses this issue by providing:

- Centralized lead management
- Real-time lead tracking
- Efficient filtering and searching
- Secure authentication
- Easy data export
- Cloud accessibility

---

## Key Features

### Authentication & Security

- Secure user registration and login
- JWT-based authentication
- Password encryption using bcrypt
- Protected routes
- Session persistence using local storage
- Password visibility toggle

---

### Lead Management

Users can:

- Create new leads
- View lead details
- Edit lead information
- Delete leads
- Search leads instantly
- Filter by source and status
- Sort leads
- Track lead progression

---

### Data Management

- Export lead records as CSV files
- Pagination for handling large datasets
- MongoDB cloud storage
- RESTful API integration

---

### Deployment

Application deployed using:

Frontend:

```text
Vercel
```

Backend:

```text
Render
```

Database:

```text
MongoDB Atlas
```

---

# Technology Stack

## Frontend

| Technology | Purpose |
|------------|----------|
| React | UI Development |
| TypeScript | Type Safety |
| Tailwind CSS | Styling |
| Vite | Build Tool |
| Axios | API Requests |
| React Icons | UI Components |

---

## Backend

| Technology | Purpose |
|------------|----------|
| Node.js | Runtime |
| Express.js | API Development |
| TypeScript | Type Safety |
| JWT | Authentication |
| bcryptjs | Password Hashing |
| MongoDB | Database |
| Mongoose | ODM |

---

## Cloud Services

| Service | Purpose |
|---------|----------|
| MongoDB Atlas | Database Hosting |
| Render | Backend Deployment |
| Vercel | Frontend Deployment |

---

# System Architecture

```text
User
 ↓
Frontend (React + TypeScript)
 ↓
REST APIs (Express + Node)
 ↓
MongoDB Atlas Database
```

---

# Project Structure

```bash
Gigflow/
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.tsx
│   │   └── main.tsx
│   │
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
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

# Installation Guide

Clone repository:

```bash
git clone https://github.com/aakash-2204/Gigflow.git

cd Gigflow
```

---

## Frontend Setup

Install dependencies:

```bash
cd frontend

npm install
```

Run:

```bash
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

---

## Backend Setup

Install dependencies:

```bash
cd backend

npm install
```

Run:

```bash
npm run dev
```

Backend URL:

```text
http://localhost:5000
```

---

# Environment Variables

Create:

```bash
backend/.env
```

Add:

```env
PORT=5000

MONGO_URI=your_connection_string

JWT_SECRET=your_secret
```

---

# MongoDB Configuration

Steps:

1. Create MongoDB Atlas cluster
2. Create database user
3. Add IP access:

```text
0.0.0.0/0
```

4. Copy connection string
5. Add to `.env`

---

# API Endpoints Summary

Authentication:

```text
POST /api/auth/register

POST /api/auth/login
```

Leads:

```text
GET /api/leads

POST /api/leads

PUT /api/leads/:id

DELETE /api/leads/:id
```

---

# Test Credentials

Use:

Email:

```text
admin@gmail.com
```

Password:

```text
admin123
```

---

# Screenshots

Include screenshots:

- Login Page
- Dashboard
- Add Lead Modal
- Edit Lead Modal
- MongoDB Collections
- Deployment Screens

---

# Performance Considerations

Implemented:

- Efficient API requests
- Pagination for scalability
- Protected authentication routes
- Cloud database management
- Component-based architecture

---

# Future Enhancements

Potential improvements:

- Email notifications
- Analytics dashboard
- Team collaboration
- Role-based permissions
- Activity history
- Dark mode
- AI-powered lead scoring

---

# Deployment Links

Frontend:

```text
https://gigflow-7cfc.vercel.app
```

Backend:

```text
https://gigflow-w412.onrender.com
```

---

# Repository

GitHub:

```text
https://github.com/aakash-2204/Gigflow
```

---

# Author

Name:

```text
Aakash
```

Project:

```text
GigFlow – Smart Lead Management Dashboard
```

---

# License

This project is licensed under the MIT License.

---

## Submission Checklist

Included:

- GitHub Repository
- README.md
- .env.example
- API Documentation
- Setup Guide
- Resume
- Deployment Link
