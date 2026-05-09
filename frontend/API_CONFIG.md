# SmartCart Frontend API Configuration Guide

## Overview
All frontend files have been updated to use a centralized `BASE_URL` constant for API calls instead of hardcoded `localhost:5000` URLs.

## Files Updated
- ✅ `script.js` - Main application logic
- ✅ `login.html` - Login page
- ✅ `signup.html` - Signup page
- ✅ `cart.html` - Cart and checkout page
- ✅ `profile.html` - Uses script.js

## Updating the Base URL

### Current Configuration
```javascript
const BASE_URL = "https://your-render-url.onrender.com";
```

### Step 1: Get Your Render Backend URL
1. Go to your Render dashboard: https://dashboard.render.com
2. Select your SmartCart backend service
3. Copy the full URL from the "Web Service" section
4. Example: `https://smartcart-backend.onrender.com`

### Step 2: Update All Files
You have **3 locations** to update:

#### Location 1: `script.js` (Line 5)
```javascript
const BASE_URL = "https://your-actual-render-url.onrender.com";
```

#### Location 2: `login.html` (Line 168-169)
```javascript
const BASE_URL = "https://your-actual-render-url.onrender.com";
```

#### Location 3: `signup.html` (Line 101-102)
```javascript
const BASE_URL = "https://your-actual-render-url.onrender.com";
```

#### Location 4: `cart.html` (Line 138-139)
```javascript
const BASE_URL = "https://your-actual-render-url.onrender.com";
```

### Step 3: Verify Updates
After updating, verify that all API calls work:
- **Login Page**: Try logging in → should connect to `/api/users/login`
- **Products Page**: Check if products load → should connect to `/api/products`
- **Profile Page**: Update profile → should connect to `/api/users/profile`
- **Cart Page**: Add to cart & checkout → should connect to `/api/orders`

## API Endpoints Used
All endpoints use the same `BASE_URL` prefix:

| Feature | Endpoint | Method |
|---------|----------|--------|
| Login | `/api/users/login` | POST |
| Register | `/api/users/register` | POST |
| Get Products | `/api/products` | GET |
| Get Profile | `/api/users/profile/{email}` | GET |
| Update Profile | `/api/users/profile/{email}` | PUT |
| Sync Cart | `/api/users/cart/{email}` | PUT |
| Place Order | `/api/orders` | POST |

## Testing

### Local Testing (Before Deployment)
Replace `BASE_URL` with:
```javascript
const BASE_URL = "http://localhost:5000";
```

### Production Testing (After Deployment)
1. Deploy frontend to Netlify
2. Open the deployed URL
3. Test all features:
   - Sign up with new account
   - Browse products
   - Add to cart
   - Place order
   - Update profile

## Troubleshooting

### "Failed to fetch" Errors
- ✓ Check if `BASE_URL` is correct in all 4 files
- ✓ Verify Render backend is running
- ✓ Check CORS settings on backend
- ✓ Open browser DevTools → Network tab to see actual requests

### 404 Errors
- ✓ Verify the endpoint path is correct
- ✓ Check backend has all required routes
- ✓ Ensure backend is deployed to Render

### localStorage Issues
- ✓ Check browser console for errors
- ✓ Clear browser cache/localStorage if needed
- ✓ Try in incognito mode

## Security Notes
⚠️ The `BASE_URL` will be visible in browser DevTools (it's client-side code)
- Use HTTPS only (Render provides this by default)
- Don't commit sensitive credentials in frontend
- Use environment variables in deployment (if needed)

## Quick Reference
**Before Deployment:**
- Replace all `BASE_URL` values with your Render backend URL
- Test all functionality locally
- Verify no `localhost` references remain

**After Deployment:**
- Frontend on Netlify: https://your-app.netlify.app
- Backend on Render: https://your-backend.onrender.com
- Both should communicate without issues
