# Frontend Setup & Deployment Guide

## Local Development

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

Frontend runs on: `http://localhost:5173`

Vite will automatically reload on file changes (HMR).

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Navigation bar with auth
│   ├── CourseCard.jsx      # Course card component
│   └── ProtectedRoute.jsx  # Route protection with auth
├── pages/
│   ├── Home.jsx            # Course listing page
│   ├── Login.jsx           # Login page
│   ├── Register.jsx        # Registration page
│   ├── CourseDetail.jsx    # Individual course page
│   └── Admin.jsx           # Admin dashboard
├── services/
│   └── api.js              # Axios instance and API calls
├── context/
│   └── AuthContext.jsx     # Global auth state
├── index.css               # Tailwind styles
└── main.jsx                # App entry point
```

## Features

### 🔐 Authentication

- User registration and login
- JWT token storage in localStorage
- Automatic token refresh on page load
- Protected routes for authenticated users
- Admin-only routes

### 📚 Course Management

- Browse all available courses
- View detailed course information
- Enroll in courses (authenticated users)
- View student count for each course

### 🛠️ Admin Dashboard

- Create new courses
- Delete existing courses
- Manage course listings
- Real-time updates

### 🎨 UI/UX

- Modern, responsive design with TailwindCSS
- Mobile-first approach
- Smooth animations and transitions
- Loading states and error handling
- Gradient backgrounds (Stripe/Linear style)

## API Integration

All API calls go to: `http://localhost:5000/api`

Update this in `src/services/api.js` when deploying.

### Authentication Flow

1. User registers/logs in
2. Backend returns JWT token
3. Token stored in localStorage
4. Token included in all subsequent requests
5. Token decoded to access user data

### Error Handling

- Network errors are caught and displayed
- Form validation before submission
- User-friendly error messages
- Automatic redirect on auth failure

## Development Workflow

### Add New Page

1. Create file in `src/pages/YourPage.jsx`
2. Add route in `src/main.jsx`
3. Import and use components

### Add New Component

1. Create file in `src/components/YourComponent.jsx`
2. Export as named export
3. Import in pages

### Add API Endpoint

1. Create function in `src/services/api.js`
2. Use in components via fetch or axios

## Deployment to Vercel

### 1. Prepare Repository

```bash
cd frontend
git init
git add .
git commit -m "Initial commit"
git push origin main
```

### 2. Connect to Vercel

Visit: https://vercel.com

1. Click "New Project"
2. Select your GitHub repository
3. Click "Import"

### 3. Build Settings

Vercel auto-detects Vite:

- **Framework**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### 4. Environment Variables

In Vercel dashboard, add Environment Variable:

```
VITE_API_URL=https://your-backend-url.onrender.com/api
```

### 5. Update Code for Production

Create `.env.production`:

```
VITE_API_URL=https://your-backend-url.onrender.com/api
```

Update API calls to use `import.meta.env.VITE_API_URL`

In `src/services/api.js`:

```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
```

In all fetch calls, replace hardcoded URLs with:

```javascript
const API_BASE_URL = 'https://your-backend-url.onrender.com/api';
```

### 6. Deploy

Click "Deploy" and Vercel handles the rest.

Your frontend will be live at: `https://your-project.vercel.app`

## Building for Production

```bash
npm run build
```

This creates `dist/` folder with optimized production build.

```bash
npm run preview
```

Preview production build locally on `http://localhost:4173`

## Performance Optimization

Current optimizations:

- Code splitting via Vite
- TailwindCSS purging (only used classes)
- Image optimization
- Lazy loading routes

### Additional Optimizations

```bash
npm install uselazy @loadable/component
```

For component lazy loading:

```javascript
const Admin = lazy(() => import('./pages/Admin.jsx'));
```

## Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS 12+, Android 5+)

## Testing

Add testing libraries:

```bash
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom
```

Create `src/__tests__/example.test.jsx` for component tests.

## Common Issues

### API URL Not Working

- Ensure backend is running on `localhost:5000`
- Check CORS settings in backend
- Verify API routes are correct

### Hot Reload Not Working

- Check Vite config settings
- Clear cache: `rm -rf node_modules/.vite`
- Restart dev server

### Build Fails

```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Token Issues

Clear localStorage:

```javascript
localStorage.clear();
window.location.reload();
```

## Debugging

### Enable DevTools

In browser F12, check:

1. **Console Tab** - Error messages
2. **Network Tab** - API requests
3. **Application Tab** - localStorage auth token
4. **React DevTools** - Component state

### Common Error Messages

- `404 Not Found` - Check API endpoint URL
- `401 Unauthorized` - Token missing or invalid
- `403 Forbidden` - Not admin for admin routes
- `500 Server Error` - Check backend logs

## Production Checklist

- [ ] Update API base URL to production backend
- [ ] Test all authentication flows
- [ ] Test all CRUD operations
- [ ] Verify responsive design on mobile
- [ ] Test error handling
- [ ] Check for console errors
- [ ] Enable HTTPS
- [ ] Set up analytics (Google Analytics)
- [ ] Configure SEO meta tags
- [ ] Set up error tracking (Sentry)

## Accessing Admin Features

After deployment:

1. Create an account on production
2. Have backend admin update your user (set `isAdmin: true`)
3. You'll see "Admin" button in navbar
4. Click to access admin dashboard

## Environment Variables

Create `.env.local` for local development:

```
VITE_API_URL=http://localhost:5000/api
```

Create `.env.production` for production:

```
VITE_API_URL=https://your-backend.onrender.com/api
```

Access in code:

```javascript
const apiUrl = import.meta.env.VITE_API_URL;
```
