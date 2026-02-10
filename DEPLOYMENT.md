# Vercel Deployment Guide

## Prerequisites
- Vercel account (https://vercel.com)
- Git repository

## Server Deployment (Backend)

1. **Navigate to server directory**
   ```bash
   cd server
   ```

2. **Deploy to Vercel**
   ```bash
   vercel
   ```

3. **Set Environment Variables in Vercel Dashboard**
   - Go to your project settings
   - Add all variables from `.env`:
     - MONGO_URL
     - PORT
     - SECRET_KEY
     - FRONTEND_URL (update to your client URL)
     - API_KEY
     - API_SECRET
     - CLOUD_NAME
     - CLIENT_ID_KEY
     - PAYPAL_SECRET_KEY
     - NODE_ENV
     - ADMIN_EMAIL
     - ADMIN_PASSWORD

4. **Note your server URL** (e.g., https://your-server.vercel.app)

## Client Deployment (Frontend)

1. **Update API URLs in client**
   - Update all API base URLs to point to your deployed server
   - Files to update:
     - `src/Features/api/authApi.js`
     - `src/Features/api/courseApi.js`
     - `src/Features/api/courseProgressApi.js`
     - `src/Features/api/purchaseApi.js`

2. **Navigate to client directory**
   ```bash
   cd client/client
   ```

3. **Build the project**
   ```bash
   npm run build
   ```

4. **Deploy to Vercel**
   ```bash
   vercel
   ```

## Post-Deployment

1. **Update FRONTEND_URL** in server environment variables to your deployed client URL
2. **Update CORS settings** if needed
3. **Test all functionality**:
   - Student registration/login
   - Admin login at `/admin-login`
   - Course creation
   - File uploads
   - Payment integration

## Important Notes

- Server and client should be deployed as separate projects
- Make sure MongoDB Atlas allows connections from anywhere (0.0.0.0/0) or add Vercel IPs
- Cloudinary and PayPal credentials must be valid
- Admin credentials are secure in environment variables

## Troubleshooting

- If CORS errors occur, check FRONTEND_URL in server environment
- If database connection fails, check MongoDB Atlas network access
- If file uploads fail, verify Cloudinary credentials
