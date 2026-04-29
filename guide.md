# Project Guide & Change Log

This document serves as a persistent record of the project's architecture, major changes, and development progress.

---

## 🏛️ Architecture
The project follows a **Modular MVC-lite** architecture:
- **Frontend (`/client`)**: Vanilla HTML/CSS/JS served statically.
- **Backend (`/server`)**: Node.js and Express server.
- **Database**: MongoDB (Mongoose) for user data storage.
- **Hosting**: Render

---

## 🛠️ Change Log

### [2026-04-29] - Major Reorganization & Modularization
- **Modular Structure**: Moved frontend files from `public/` to `client/` and backend logic to `server/`.
- **Backend Refactoring**:
    - Extracted database connection logic.
    - Moved authentication logic to controllers.
    - Main entry point set to `server/index.js`.
- **Cleanup**: Removed redundant folders and files.

### [2026-04-29] - Migration to MongoDB & Deployment Prep
- **Database Migration**: Switched from MySQL to MongoDB using **Mongoose**.
- **Environment Variables**: Added `dotenv` and created `.env` for secrets (ignored in Git).
- **Architecture Updates**:
    - Created `server/models/User.js` schema.
    - Updated `authController.js` and `db.js` for MongoDB logic.
- **Deployment**: Prepared project for **Render** hosting.

---

## 📝 Ongoing Notes
- Ensure `MONGODB_URI` in `.env` is updated with your production string.
- All new routes should be added to `server/routes/` and logic to `server/controllers/`.
- Use Cloudinary for any image uploads to avoid Render's ephemeral storage issues.
