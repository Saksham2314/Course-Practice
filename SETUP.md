# SETUP INSTRUCTIONS - Quick Reference

## 🚀 Local Development Setup (5 minutes)

### Windows Users:
```batch
# Run setup script
setup.bat
```

### Mac/Linux Users:
```bash
# Make script executable
chmod +x setup.sh

# Run setup script
./setup.sh
```

---

## 📋 Manual Setup Steps

### Step 1: Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

### Step 2: Configure Database

**Option A: MongoDB Local**
1. Install MongoDB: https://docs.mongodb.com/manual/installation/
2. Start MongoDB: `mongosh`
3. No configuration needed - already set to `mongodb://localhost:27017/course-platform`

**Option B: MongoDB Atlas (Cloud)**
1. Create free account: https://www.mongodb.com/cloud/atlas
2. Create cluster and get connection string
3. Update `backend/.env`:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/course-platform?retryWrites=true&w=majority
   ```

### Step 3: Backend Configuration

```bash
cd backend
cp .env.example .env
```

**Edit `backend/.env`:**
```
MONGODB_URI=mongodb://localhost:27017/course-platform
JWT_SECRET=your_super_secret_key_123456789_change_this
PORT=5000
NODE_ENV=development
```

### Step 4: Start Backend Server

```bash
cd backend
npm run dev
```

**Expected output:**
```
Server running on port 5000
MongoDB connected: localhost
```

### Step 5: Start Frontend Server

**In a new terminal:**
```bash
cd frontend
npm run dev
```

**Expected output:**
```
VITE v4.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
```

### Step 6: Access Application

1. Open http://localhost:5173 in your browser
2. You should see the Course Platform homepage
3. Click "Sign Up" to create an account
4. Log in and explore!

---

## ✅ Verify Everything Works

### Test Registration:
1. Go to http://localhost:5173/register
2. Enter email: `test@example.com`
3. Enter password: `password123`
4. Click "Sign Up"
5. Should be redirected to home page logged in

### Test Course Listing:
1. Go to http://localhost:5173 (home page)
2. Should see "No courses available yet" message
3. This is expected - no courses created yet

### Test Admin Features:
1. Make your user an admin in MongoDB:
   ```bash
   mongosh
   use course-platform
   db.users.updateOne(
     { email: "test@example.com" },
     { $set: { isAdmin: true } }
   )
   exit
   ```
2. Refresh the page - you should see "Admin" button in navbar
3. Click Admin to access dashboard
4. Create a test course

---

## 🐳 Docker Setup (Alternative)

### Prerequisites:
- Docker Desktop installed: https://www.docker.com/products/docker-desktop

### Steps:
```bash
docker-compose up
```

This will:
- Start MongoDB on port 27017
- Start Backend on port 5000
- Start Frontend on port 5173

---

## 🚀 Deployment Checklist

### Before Deploying:

**Backend (Render)**
- [ ] Update `JWT_SECRET` to strong random value
- [ ] Update `MONGODB_URI` to MongoDB Atlas
- [ ] Set `NODE_ENV=production`
- [ ] Test all API endpoints
- [ ] Enable HTTPS

**Frontend (Vercel)**
- [ ] Update API base URL to production backend
- [ ] Build locally: `npm run build`
- [ ] Test build: `npm run preview`
- [ ] Update environment variables in Vercel

### Deployment Steps:

**Backend to Render:**
1. Push to GitHub
2. Create Web Service on Render
3. Set environment variables
4. Deploy

**Frontend to Vercel:**
1. Push to GitHub
2. Import project in Vercel
3. Set environment variables
4. Deploy

---

## 🆘 Troubleshooting

### "Cannot find module" Error
```bash
# Solution: Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### MongoDB Connection Error
```
MongooseServerSelectionError: connect ECONNREFUSED
```
**Solution:**
- Ensure MongoDB is running: `mongosh`
- Or use MongoDB Atlas and update connection string

### Port Already in Use
```
EADDRINUSE: address already in use :::5000
```
**Solution:**
- Kill process: `lsof -ti:5000 | xargs kill -9` (Mac/Linux)
- Or use different port in `.env`

### Frontend Can't Connect to Backend
```
Failed to load courses. Make sure the backend is running on localhost:5000
```
**Solution:**
- Ensure backend is running on port 5000
- Check `src/services/api.js` for correct URL
- Check browser console for specific errors

### CORS Error
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solution:**
- Verify backend has CORS enabled
- Restart backend server
- Check frontend is running on port 5173

---

## 📚 Project Structure Quick Reference

```
course-platform/
├── backend/
│   ├── models/          (Database schemas)
│   ├── routes/          (API endpoints)
│   ├── controllers/     (Business logic)
│   ├── middleware/      (Auth & validation)
│   ├── config/          (Database connection)
│   ├── package.json
│   ├── .env.example
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── pages/       (React pages)
│   │   ├── components/  (React components)
│   │   ├── services/    (API calls)
│   │   ├── context/     (Auth state)
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
└── README.md
```

---

## 🔑 Default Admin Account

No default admin. To create:

1. Register normally
2. Update in MongoDB:
   ```bash
   mongosh
   use course-platform
   db.users.updateOne(
     { email: "your@email.com" },
     { $set: { isAdmin: true } }
   )
   ```

---

## 📖 API Endpoints Quick Reference

```
POST /api/auth/register        - Create account
POST /api/auth/login           - Sign in
GET  /api/courses              - List all courses
GET  /api/courses/:id          - Get course details
POST /api/courses              - Create course (admin)
POST /api/courses/:id/enroll   - Enroll in course
DELETE /api/courses/:id        - Delete course (admin)
```

---

## 💡 Next Steps

1. ✅ Complete local setup
2. 📝 Create test course from admin panel
3. 👤 Test enrollment flow
4. 🚀 Deploy to Render (backend)
5. 🚀 Deploy to Vercel (frontend)
6. 📈 Add payment integration (optional)
7. 📧 Add email notifications (optional)

---

## 🤝 Need Help?

1. Check README.md for detailed documentation
2. Review backend/README.md for API details
3. Review frontend/README.md for UI details
4. Check browser console for errors (F12)
5. Check terminal logs for backend errors

---

**Happy Coding! 🎉**
