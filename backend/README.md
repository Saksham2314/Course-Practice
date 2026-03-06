# Backend Setup & Deployment Guide

## Local Development

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
```

Edit `.env`:

```
MONGODB_URI=mongodb://localhost:27017/course-platform
JWT_SECRET=your_super_secret_key_123456789
PORT=5000
NODE_ENV=development
```

### 3. Start MongoDB

**Local MongoDB:**
```bash
mongosh
```

**MongoDB Atlas Cloud:**
- Update `MONGODB_URI` with your connection string from MongoDB Atlas

### 4. Run Server

**Development (with auto-reload):**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

Server runs on: `http://localhost:5000`

## Testing API Endpoints

### Using cURL

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'

# Get all courses
curl http://localhost:5000/api/courses

# Get course by ID
curl http://localhost:5000/api/courses/{{courseId}}

# Create course (requires auth token)
curl -X POST http://localhost:5000/api/courses \
  -H "Authorization: Bearer {{token}}" \
  -H "Content-Type: application/json" \
  -d '{
    "title":"React Masterclass",
    "description":"Learn React from scratch",
    "price":99.99,
    "image":"https://via.placeholder.com/300x200"
  }'

# Delete course
curl -X DELETE http://localhost:5000/api/courses/{{courseId}} \
  -H "Authorization: Bearer {{token}}"

# Enroll in course
curl -X POST http://localhost:5000/api/courses/{{courseId}}/enroll \
  -H "Authorization: Bearer {{token}}"
```

### Using Postman

1. Import API endpoints from the provided examples above
2. Set `Authorization` header with Bearer token for protected endpoints
3. Test each endpoint

## Database Structure

### User Collection

```javascript
{
  _id: ObjectId,
  email: "user@example.com",
  password: "$2a$10$...", // bcrypt hash
  isAdmin: false,
  createdAt: ISODate(),
  updatedAt: ISODate()
}
```

### Course Collection

```javascript
{
  _id: ObjectId,
  title: "Course Title",
  description: "Course description",
  price: 99.99,
  image: "https://...",
  instructor: ObjectId("userId"),
  students: [ObjectId, ObjectId, ...],
  createdAt: ISODate(),
  updatedAt: ISODate()
}
```

## Deployment to Render

### 1. Prepare Repository

```bash
cd backend
git init
git add .
git commit -m "Initial commit"
git push origin main
```

### 2. Create Render Account

Visit: https://render.com

### 3. Deploy Web Service

1. Click "New+" → "Web Service"
2. Connect your GitHub repository
3. Configure:
   - **Name**: `course-platform-backend`
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

### 4. Set Environment Variables

In Render dashboard, add:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/course-platform?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-key-change-in-production
PORT=10000
NODE_ENV=production
```

### 5. Deploy

Click "Create Web Service" and Render will automatically deploy.

Your backend will be live at: `https://course-platform-backend.onrender.com`

## Production Checklist

- [ ] Update `JWT_SECRET` to a strong, random key
- [ ] Update `MONGODB_URI` to MongoDB Atlas connection
- [ ] Set `NODE_ENV=production`
- [ ] Update frontend API base URL to production backend URL
- [ ] Enable HTTPS everywhere
- [ ] Add rate limiting for auth endpoints
- [ ] Set up error logging (Sentry, LogRocket)
- [ ] Enable request validation
- [ ] Add input sanitization

## Security Best Practices

1. **Never commit `.env` file** - Use `.env.example`
2. **Strong JWT Secret** - Use 32+ character random string
3. **Password Hashing** - Already implemented with bcrypt (10 rounds)
4. **CORS** - Restrict to frontend origin in production
5. **Rate Limiting** - Add to auth endpoints
6. **Input Validation** - Validate all incoming data

## Monitoring & Logging

Consider adding:

```bash
npm install winston morgan
```

For production logging and monitoring.

## Scaling

- Use MongoDB Atlas for reliable database
- Enable connection pooling
- Add caching (Redis)
- Implement API rate limiting
- Use CDN for static assets
