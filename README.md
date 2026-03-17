# Blog Platform with Authentication & Roles

A full-stack blog platform with JWT authentication, role-based access control (User/Admin), and a rich text editor. Built with the MERN stack (MongoDB, Express, React, Node.js).

## 📋 Table of Contents
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [How to Run Locally](#-how-to-run-locally)
- [Environment Variables](#-environment-variables)
- [Admin Credentials](#-admin-credentials)
- [API Documentation](#-api-documentation)
- [Role-Based Access](#-role-based-access)
- [Technologies Used & Why](#-technologies-used-and-why)
- [Author](#-author)

## ✨ Features

### 🔐 Authentication & Authorization
- User registration with password hashing (bcrypt)
- JWT-based authentication
- Role-based access control (User/Admin)
- Protected routes and API endpoints

### 👥 Role-Based Permissions

| Action | Guest | User | Admin |
|--------|-------|------|-------|
| View blog posts | ✅ | ✅ | ✅ |
| Read comments | ✅ | ✅ | ✅ |
| Post comments with 1-5⭐ ratings | ❌ | ✅ | ❌ |
| Create/edit/delete posts | ❌ | ❌ | ✅ |
| Delete comments (soft delete) | ❌ | ❌ | ✅ |
| View all users | ❌ | ❌ | ✅ |
| Promote users to admin | ❌ | ❌ | ✅ |

### 📝 Blog Posts
- Rich text editor (TinyMCE) with image upload
- Title, summary, and content fields
- Author attribution and timestamps
- Full CRUD operations (admin only)

### 💬 Comments System
- 1-5 star ratings
- Soft delete (comments hidden, not removed from DB)
- Real-time updates
- Author information displayed

### 🖼️ Image Upload
- Drag-and-drop image upload in rich text editor
- Images stored locally (uploads folder)
- Automatic image resizing and optimization

### 📱 Responsive Design
- Mobile-first approach
- Works on all screen sizes
- Clean, modern UI

### 🛡️ Security Features
- Password hashing with bcrypt
- JWT tokens with expiration
- Input validation on all endpoints
- CORS properly configured
- Helmet.js for security headers
- Environment variables for secrets
- No sensitive data in responses

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation
- **multer** - File uploads
- **helmet** - Security headers
- **cors** - Cross-origin resource sharing

### Frontend
- **React** - UI library
- **React Router** - Navigation
- **Axios** - HTTP client
- **TinyMCE** - Rich text editor
- **React Hook Form** - Form handling
- **CSS3** - Styling with responsive design

## 📁 Project Structure
blog-platform/
├── backend/ # Node.js + Express backend
│ ├── src/
│ │ ├── controllers/ # Route controllers
│ │ ├── models/ # Mongoose models
│ │ ├── routes/ # Express routes
│ │ ├── middleware/ # Custom middleware
│ │ ├── config/ # Configuration files
│ │ ├── utils/ # Utility functions
│ │ └── app.js # Express app setup
│ ├── uploads/ # Uploaded images
│ ├── server.js # Entry point
│ └── package.json
│
├── frontend/ # React frontend
│ ├── public/
│ │ └── index.html
│ ├── src/
│ │ ├── components/ # Reusable components
│ │ ├── pages/ # Page components
│ │ ├── context/ # React context
│ │ ├── services/ # API services
│ │ ├── hooks/ # Custom hooks
│ │ ├── styles/ # CSS styles
│ │ ├── App.js
│ │ └── index.js
│ └── package.json
│
├── postman/ # Postman collection
│ └── blog-platform.postman_collection.json
│
├── README.md
└── .gitignore

## 🚀 How to Run Locally

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account (or local MongoDB)
- npm or yarn
- Git

### Step 1: Clone the Repository
```bash
git clone https://github.com/Alaa-Nasrallah/blog-platform.git
cd blog-platform

Step 2: Backend Setup
bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create .env file from example
cp .env.example .env
Edit the .env file with your values:

env
PORT=5000
NODE_ENV=development
MONGODB_URI=your_mongodb_connection_string_here
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000

Step 3: Frontend Setup
bash
# Navigate to frontend folder
cd ../frontend

# Install dependencies
npm install

# Create .env file from example
cp .env.example .env
Edit the .env file:

env
REACT_APP_API_URL=http://localhost:5000/api

Step 4: Run the Application
Terminal 1 - Backend:

bash
cd backend
npm run dev
# Server runs on http://localhost:5000
Terminal 2 - Frontend:

bash
cd frontend
npm start
# App runs on http://localhost:3000