# SmartCart Frontend Deployment Checklist

## Pre-Deployment Verification ✓

### 1. API URLs Configuration
- [ ] Updated `BASE_URL` in `script.js` (Line 5)
- [ ] Updated `BASE_URL` in `login.html` (Line 168-169)
- [ ] Updated `BASE_URL` in `signup.html` (Line 101-102)
- [ ] Updated `BASE_URL` in `cart.html` (Line 138-139)
- [ ] No `localhost:5000` references remaining in any frontend files
- [ ] All URLs use HTTPS (not HTTP)

### 2. Code Quality
- [ ] No console errors in browser DevTools
- [ ] All API endpoints working correctly:
  - [ ] `/api/products` - Returns product list
  - [ ] `/api/users/login` - Login working
  - [ ] `/api/users/register` - Signup working
  - [ ] `/api/users/profile/{email}` - Profile working
  - [ ] `/api/orders` - Order placement working
- [ ] Cart functionality working locally
- [ ] Search and filter working
- [ ] UI unchanged and responsive

### 3. Local Testing
- [ ] Test signup → creates account
- [ ] Test login → redirects to homepage
- [ ] Test product listing → displays all products
- [ ] Test search → filters products correctly
- [ ] Test add to cart → items appear in cart
- [ ] Test checkout → places order successfully
- [ ] Test profile update → saves user data
- [ ] Test logout → clears session

### 4. Browser Compatibility
- [ ] Tested in Chrome
- [ ] Tested in Firefox
- [ ] Tested in Safari
- [ ] Tested on mobile devices
- [ ] Mobile responsiveness working

### 5. File Structure
```
frontend/
├── index.html           ✓
├── login.html           ✓
├── signup.html          ✓
├── profile.html         ✓
├── cart.html            ✓
├── script.js            ✓ (with BASE_URL)
├── style.css            ✓
├── API_CONFIG.md        ✓
└── DEPLOYMENT.md        ✓
```

### 6. Backend Requirements
- [ ] Render backend deployed and running
- [ ] Backend has CORS enabled for your Netlify domain
- [ ] All API endpoints implemented and tested
- [ ] MongoDB connection working
- [ ] Email service configured (for order notifications)
- [ ] Backend URL is accessible from frontend

## Deployment Steps

### Step 1: Verify Render Backend URL
```bash
# Your Render URL should look like:
https://your-app-name.onrender.com
```

### Step 2: Update Frontend BASE_URL (if not done)
Search for all `BASE_URL` constants and update with your Render URL

### Step 3: Push to GitHub
```bash
git add .
git commit -m "Update API URLs to Render backend"
git push -u origin main
```

### Step 4: Connect Netlify
1. Go to https://netlify.com
2. Click "New site from Git"
3. Connect your GitHub repository
4. Build settings:
   - Base directory: `frontend`
   - Build command: (leave empty - static site)
   - Publish directory: `frontend`
5. Click "Deploy site"

### Step 5: Verify Deployment
- [ ] Site deployed to Netlify (URL shown)
- [ ] Homepage loads without errors
- [ ] Products display correctly
- [ ] Try login/signup
- [ ] Check browser DevTools → Network tab:
  - [ ] All API requests go to your Render URL
  - [ ] No 404 or CORS errors
  - [ ] Responses are successful (200 status)

### Step 6: Test Production
1. Open your Netlify deployed URL
2. Test all workflows:
   - [ ] Sign up as new user
   - [ ] Log in
   - [ ] Browse products
   - [ ] Add to cart
   - [ ] Place order (check email for confirmation)
   - [ ] Update profile
   - [ ] Log out

### Step 7: Enable Custom Domain (Optional)
1. In Netlify settings, add custom domain
2. Update DNS records (if needed)
3. Enable SSL certificate (automatic with Netlify)

## Troubleshooting

### Frontend not connecting to backend
- ✓ Check `BASE_URL` is correct in all files
- ✓ Check Render backend is running
- ✓ Check CORS headers on backend
- ✓ Look at Network tab in DevTools

### 404 errors for API endpoints
- ✓ Verify backend routes match frontend calls
- ✓ Check backend is deployed correctly
- ✓ Test backend directly: `curl https://your-backend.onrender.com/api/products`

### CORS errors
- ✓ Backend must allow your Netlify domain
- ✓ Add to backend CORS config:
  ```javascript
  app.use(cors({
    origin: 'https://your-netlify-url.netlify.app'
  }));
  ```

### Cart not syncing
- ✓ Check if user is logged in
- ✓ Check `/api/users/cart` endpoint is working
- ✓ Check localStorage in DevTools

## Final Checklist
- [ ] All BASE_URL values updated
- [ ] No localhost references remain
- [ ] All tests pass locally
- [ ] Code committed to GitHub
- [ ] Netlify deployment successful
- [ ] Production testing complete
- [ ] All team members notified

## Important Notes
- **Do NOT commit `.env` file to GitHub** (contains sensitive data)
- **HTTPS is required** for secure API communication
- **Test thoroughly** before production release
- **Monitor Render backend** for uptime (free tier has limitations)
- **Keep API_CONFIG.md and DEPLOYMENT.md** for future reference

---
**Status:** Ready for Netlify deployment ✓
**Backend:** Render (https://your-render-url.onrender.com)
**Frontend:** Netlify (https://your-app-name.netlify.app)
