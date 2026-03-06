# 📚 Course Platform - MVP

A modern, full-stack course selling platform built with React, Node.js, Express, and MongoDB. Designed to be production-ready for deployment on Vercel (frontend) and Render (backend).

## ✨ Features

- **User Authentication**: Secure JWT-based auth with bcrypt password hashing
- **Course Listing**: Browse and view all available courses
- **Course Details**: Detailed course pages with enrollment functionality
- **Admin Dashboard**: Create, manage, and delete courses
- **Responsive Design**: Modern UI with TailwindCSS (inspired by Stripe/Linear)
- **Protected Routes**: Secure admin-only endpoints
- **Local Development**: Easy setup with hot reload and live updates

## 🏗️ Project Structure

```
course-platform/
├── frontend/                 (React + Vite)
│   ├── src/
│   │   ├── components/      (Navbar, CourseCard, ProtectedRoute)
│   │   ├── pages/           (Home, Login, Register, CourseDetail, Admin)
│   │   ├── services/        (API service with Axios)
│   │   ├── context/         (Auth context)
│   │   ├── index.css        (Styling)
│   │   └── main.jsx         (Entry point)
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── index.html
│
└── backend/                  (Node + Express + MongoDB)
    ├── config/
    │   └── db.js            (MongoDB connection)
    ├── models/
    │   ├── User.js          (User schema with password hashing)
    │   └── Course.js        (Course schema)
    ├── controllers/
    │   ├── authController.js (Register, Login)
    │   └── courseController.js (CRUD operations)
    ├── routes/
    │   ├── auth.js          (Auth routes)
    │   └── courses.js       (Course routes)
    ├── middleware/
    │   └── auth.js          (JWT & Admin middleware)
    ├── package.json
    ├── .env.example
    └── server.js            (Main server file)
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v16+) - [Download](https://nodejs.org/)
- **MongoDB** - Either:
  - Local MongoDB: [Install MongoDB](https://docs.mongodb.com/manual/installation/)
  - MongoDB Atlas: [Free Cloud Database](https://www.mongodb.com/cloud/atlas)

### 1️⃣ Backend Setup

```bash
cd course-platform/backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env with your MongoDB URI and JWT secret
# MONGODB_URI=mongodb://localhost:27017/course-platform
# JWT_SECRET=your_super_secret_key_change_this
# PORT=5000

# Start the server (with nodemon for auto-reload)
npm run dev

# Or start normally
npm start
```

**Backend will run on:** `http://localhost:5000`

### 2️⃣ Frontend Setup

```bash
cd course-platform/frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

**Frontend will run on:** `http://localhost:5173`

### Access the Application

- 🏠 **Home**: http://localhost:5173
- 🔐 **Login**: http://localhost:5173/login
- 📝 **Register**: http://localhost:5173/register
- 🛠️ **Admin Dashboard**: http://localhost:5173/admin (admin users only)

## 📚 API Documentation

### Authentication Routes

```
POST /api/auth/register
  Body: { email, password }
  Response: { user, token }

POST /api/auth/login
  Body: { email, password }
  Response: { user, token }
```

### Course Routes

```
GET /api/courses
  Response: [{ _id, title, description, price, image, students, ... }]

GET /api/courses/:id
  Response: { _id, title, description, price, image, ... }

POST /api/courses (Protected, Admin only)
  Body: { title, description, price, image }
  Response: { _id, title, ... }

DELETE /api/courses/:id (Protected, Admin only)
  Response: { message: "Course deleted" }

POST /api/courses/:id/enroll (Protected)
  Response: { message: "Successfully enrolled", course }
```

## 🔑 Test Credentials

First, you need to register. Then you can log in. To test admin features:

1. Register a new account
2. Manually update the user in MongoDB:
   ```javascript
   db.users.updateOne(
     { email: "your@email.com" },
     { $set: { isAdmin: true } }
   )
   ```

Or manually create an admin user in MongoDB:

```javascript
db.users.insertOne({
  email: "admin@example.com",
  password: "$2a$10...", // bcrypt hashed password
  isAdmin: true
})
```

## 🛠️ Development Mode

### Hot Reload

**Frontend**: Changes automatically reflect in browser (Vite HMR)

**Backend**: With `nodemon`, server restarts automatically on file changes

### Environment Variables

**Backend (.env)**:
```
MONGODB_URI=mongodb://localhost:27017/course-platform
JWT_SECRET=your_super_secret_key_change_this_in_production
PORT=5000
NODE_ENV=development
```

**Frontend**: Uses `http://localhost:5000` for API calls (hardcoded in dev)

## 🚀 Deployment

### Deploy Frontend to Vercel

```bash
cd frontend
npm run build
# Connect to Vercel and deploy
```

Then update the API base URL in `src/services/api.js`:

```javascript
const API_BASE_URL = 'https://your-backend-url.com/api';
```

### Deploy Backend to Render

1. Push your backend code to GitHub
2. Create a new Web Service on Render
3. Set environment variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: A strong secret key
   - `PORT`: 10000 (Render's default)
   - `NODE_ENV`: production

## 📋 Database Models

### User Model

```javascript
{
  _id: ObjectId,
  email: String (unique),
  password: String (hashed),
  isAdmin: Boolean (default: false),
  createdAt: Date,
  updatedAt: Date
}
```

### Course Model

```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  price: Number,
  image: String (URL),
  instructor: ObjectId (Reference to User),
  students: [ObjectId] (References to Users),
  createdAt: Date,
  updatedAt: Date
}
```

## 🎨 UI Features

- **Modern Design**: TailwindCSS with rounded cards, shadows, and animations
- **Responsive**: Works seamlessly on mobile, tablet, and desktop
- **Gradient Backgrounds**: Professional linear gradients
- **Hover Effects**: Smooth transitions and scale animations
- **Loading States**: Animated spinners for async operations
- **Form Validation**: Client-side validation with helpful error messages

## 🔒 Security Features

- ✅ Password hashing with bcrypt (10 salt rounds)
- ✅ JWT token-based authentication
- ✅ Protected routes (admin-only endpoints)
- ✅ CORS enabled for frontend communication
- ✅ Environment variables for sensitive data

## 📦 Dependencies

### Backend
- **express**: Web framework
- **mongoose**: MongoDB ODM
- **dotenv**: Environment variable management
- **jwt-simple**: JWT creation and verification
- **bcryptjs**: Password hashing
- **cors**: Cross-origin resource sharing

### Frontend
- **react**: UI framework
- **react-dom**: React rendering
- **react-router-dom**: Client-side routing
- **axios**: HTTP client
- **tailwindcss**: Utility-first CSS framework
- **vite**: Build tool and dev server

## 🐛 Troubleshooting

### MongoDB Connection Error

**Issue**: `MongooseServerSelectionError`

**Solution**:
- Ensure MongoDB is running locally: `mongosh`
- Or update `MONGODB_URI` in `.env` to your MongoDB Atlas connection string

### CORS Error

**Issue**: `Access to XMLHttpRequest has been blocked by CORS policy`

**Solution**: Ensure backend is running and CORS is enabled in `server.js`

### Port Already in Use

**Issue**: `listen EADDRINUSE: address already in use :::5000`

**Solution**:
- Kill the process: `lsof -ti:5000 | xargs kill -9` (Mac/Linux)
- Or use different port: Change `PORT` in `.env`

### Token Invalid/Expired

**Issue**: 401 authentication errors

**Solution**: Clear localStorage and log in again

```javascript
localStorage.clear();
```

## 📝 Next Steps

1. **Add Payment Integration**: Stripe or PayPal for course purchases
2. **Course Content**: Add video lessons, assignments, quizzes
3. **User Profiles**: Student dashboards with enrolled courses
4. **Reviews & Ratings**: Let students review courses
5. **Email Verification**: Confirm user emails at registration
6. **Social Auth**: Google/GitHub sign-in
7. **Analytics**: Track course enrollments and engagement

## 📄 License

MIT License - Feel free to use this project for your own purposes.

## 🤝 Support

For issues or questions:
1. Check the troubleshooting section above
2. Verify all environment variables are set correctly
3. Ensure both MongoDB and servers are running
4. Check browser console and terminal for error messages

---

**Happy Learning! 🚀** 

Built with ❤️ for modern web development.
