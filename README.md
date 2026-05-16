# GigFlow – Smart Leads Dashboard

A full-stack MERN lead management dashboard built for the ServiceHive Full Stack Development Internship assignment.

## Live Links
Frontend:
https://gigflow-7cfc.vercel.app/#/

Backend:
https://gigflow-w412.onrender.com 

GitHub: 
https://github.com/aakash-2204/Gigflow

## Tech Stack

### Frontend
- React.js
- TypeScript
- Tailwind CSS
- Axios
- React Router

### Backend
- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt

## Features

- User registration and login
- JWT-based authentication
- Protected routes
- Password hashing with bcrypt
- Role-based access control: Admin and Sales User
- Create, view, update, delete leads
- View single lead details
- Filter by status
- Filter by source
- Search by name or email
- Sort by latest / oldest
- Backend pagination with 10 records per page
- Debounced search
- CSV export
- Loading and empty states
- Form validation
- Centralized error handling
- Docker setup

## Lead Fields

- Name
- Email
- Status: New, Contacted, Qualified, Lost
- Source: Website, Instagram, Referral
- Created At

## API Endpoints

### Auth

POST `/api/auth/register`

```json
{
  "name": "Admin",
  "email": "admin@gmail.com",
  "password": "admin123",
  "role": "admin"
}

To login, send:

POST https://gigflow-w412.onrender.com/api/auth/login

with body:

{
 "email":"admin@gmail.com",
 "password":"admin123"
}