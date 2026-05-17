# API Documentation

## Base URL

Production:

```text
https://gigflow-w412.onrender.com/api
```

Local:

```text
http://localhost:5000/api
```

---

# Authentication APIs

Authentication endpoints handle user registration and login using JWT authentication.

---

## Register User

Creates a new user account.

### Endpoint

```http
POST /auth/register
```

### Request Body

```json
{
  "name": "Admin",
  "email": "admin@gmail.com",
  "password": "admin123",
  "role": "admin"
}
```

### Success Response

Status:

```text
201 Created
```

Response:

```json
{
  "token": "jwt_token",
  "user": {
    "_id": "123",
    "name": "Admin",
    "email": "admin@gmail.com",
    "role": "admin"
  }
}
```

---

### Error Response

Status:

```text
400 Bad Request
```

Example:

```json
{
  "message": "User already exists"
}
```

---

## Login User

Authenticates an existing user.

### Endpoint

```http
POST /auth/login
```

### Request Body

```json
{
  "email": "admin@gmail.com",
  "password": "admin123"
}
```

---

### Success Response

Status:

```text
200 OK
```

Response:

```json
{
  "token": "jwt_token",
  "user": {
    "_id": "123",
    "name": "Admin",
    "role": "admin"
  }
}
```

---

### Error Response

Example:

```json
{
  "message": "Invalid credentials"
}
```

---

# Lead APIs

Lead APIs allow users to create, update, view, filter, and remove leads.

Authentication required:

```text
Bearer Token
```

---

## Get All Leads

Returns all leads.

### Endpoint

```http
GET /leads
```

### Query Parameters

Optional:

```text
search=
status=
source=
sort=
page=
```

Example:

```http
GET /leads?search=rahul&page=1
```

---

### Success Response

```json
{
  "total": 20,
  "pages": 2,
  "leads": [
    {
      "_id": "1",
      "name": "Rahul",
      "email": "rahul@gmail.com",
      "status": "Qualified",
      "source": "Instagram"
    }
  ]
}
```

---

## Create Lead

Creates a new lead.

### Endpoint

```http
POST /leads
```

---

### Request Body

```json
{
  "name": "Rahul Kumar",
  "email": "rahul@gmail.com",
  "status": "New",
  "source": "Instagram"
}
```

---

### Success Response

Status:

```text
201 Created
```

Response:

```json
{
  "_id": "123",
  "name": "Rahul Kumar",
  "email": "rahul@gmail.com"
}
```

---

## Get Single Lead

Returns one lead.

### Endpoint

```http
GET /leads/:id
```

Example:

```http
GET /leads/6854abc123
```

---

## Update Lead

Updates lead information.

### Endpoint

```http
PUT /leads/:id
```

---

### Request Body

```json
{
  "status": "Qualified"
}
```

---

### Success Response

```json
{
  "message": "Lead updated successfully"
}
```

---

## Delete Lead

Deletes lead.

### Endpoint

```http
DELETE /leads/:id
```

---

### Success Response

```json
{
  "message": "Lead deleted"
}
```

---

# Authentication Header

Protected routes require JWT token.

Example:

```http
Authorization: Bearer your_jwt_token
```

---

# Status Codes

| Code | Meaning |
|------|----------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 404 | Not Found |
| 500 | Server Error |

---

# Sample Workflow

## Register

```http
POST /auth/register
```

↓

Receive token

↓

## Login

```http
POST /auth/login
```

↓

Receive JWT token

↓

## Access Protected APIs

Example:

```http
GET /leads
```

Using:

```http
Authorization: Bearer token
```

↓

## Create / Update / Delete Leads

---

# API Testing

Recommended tools:

- Postman
- Thunder Client (VS Code)
- Browser Developer Tools
- PowerShell

---

# Deployment URLs

Frontend:

```text
https://gigflow-7cfc.vercel.app
```

Backend:

```text
https://gigflow-w412.onrender.com
```

---

# Notes

- Authentication uses JWT.
- Passwords are encrypted using bcrypt.
- Data is stored in MongoDB Atlas.
- Backend deployed on Render.
- Frontend deployed on Vercel.
