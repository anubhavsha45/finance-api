💰 Finance Dashboard Backend API

A secure and scalable backend system for managing financial records with Role-Based Access Control (RBAC) and data analytics using MongoDB aggregation.

---
🌍 Live Link

https://finance-api-p1ej.onrender.com/

---
🚀 Overview

This project is a backend API for a finance dashboard system where different users interact with financial data based on their roles.

It demonstrates:

- Secure authentication using JWT
- Role-based access control (Admin, Analyst, Viewer)
- Financial records management (CRUD operations)
- Dashboard analytics using MongoDB aggregation pipelines
- Production-level backend structure and security practices

---

🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Postman (API Testing)

---

🔐 Features

1. Authentication & Authorization

- User registration & login
- JWT-based authentication
- Protected routes
- Role-based access control

---

2. User Roles

Role| Permissions|
|--------|----------|
Admin| Create, update, manage records and users
Analyst| View records and analyze data
Viewer| View dashboard summary

---

3. Financial Records Management

- Create records (Admin only)
- View records (Admin & Analyst)
- Update records (Admin only)
- Filtering, sorting, pagination supported

---

4. Dashboard & Analytics

📊 Dashboard (All Roles)

- Total Income
- Total Expense
- Net Balance

📈 Analysis (Admin & Analyst)

- Category-wise breakdown
- Monthly trends
- Aggregated financial insights

---

📡 API Endpoints

🔑 Auth Routes

Method| Endpoint| Description |
|--------|----------|--------|
POST| /api/v1/users/register| Register user
POST| /api/v1/users/login| Login user

---

💰 Record Routes

Method| Endpoint| Access|
|--------|----------|--------|
POST| /api/v1/records| Admin
GET| /api/v1/records| Admin, Analyst
PATCH| /api/v1/records/:id| Admin

---

📊 Analytics Routes

Method| Endpoint| Access|
|--------|----------|--------|
GET| /api/v1/records/analyze| Admin, Analyst
GET| /api/v1/records/dashboard| All roles

---

🔍 Query Features

Supports advanced queries:

/records?type=expense
/records?category=food&sort=-amount
/records?page=2&limit=10

---

🛡️ Security Features

- HTTP Security Headers using Helmet
- Rate Limiting to prevent abuse
- Input validation using Mongoose

«Note: "express-mongo-sanitize" was tested but removed due to compatibility issues with Node.js v22 request handling.»

---

🧱 Project Structure

├── controllers
├── models
├── routes
├── utils
├── app.js
├── server.js

---

⚙️ Installation & Setup

git clone <your-repo-link>
cd finance-dashboard-backend
npm install

---

🔐 Environment Variables

Create a "config.env" file:

PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET_KEY=your_secret
JWT_EXPIRES_IN=90d

---

▶️ Run the Server

npm run dev

---

🧠 Key Highlights

- Clean MVC architecture
- Real-world RBAC implementation
- Efficient MongoDB aggregation using "$facet"
- Scalable and maintainable backend design

---

📌 Future Improvements

- Add delete functionality
- Add unit/integration testing
- Implement caching (Redis)
- Deployment (AWS / Render)

---

👨‍💻 Author

Anubhav Sharma

---

⭐ Final Note

This project focuses on building a clean, secure, and scalable backend system, demonstrating strong backend fundamentals and real-world API design.
