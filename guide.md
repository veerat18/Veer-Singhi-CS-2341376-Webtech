# Project Guide & Change Log

This document serves as a persistent record of the project's architecture, major changes, and development progress.

---

## 🏛️ Architecture
The project follows a **Modular MVC-lite** architecture:
- **Frontend (`/client`)**: Vanilla HTML/CSS/JS served statically.
- **Backend (`/server`)**: Modular logic (routes, controllers, models).
- **Entry Point (`server.js`)**: Located in the root for easy deployment.
- **Database**: MongoDB (Mongoose) for user data storage.
- **Hosting**: Render

---

## 🛠️ Change Log

### [2026-04-29] - Major Reorganization & Modularization
- **Modular Structure**: Moved frontend files from `public/` to `client/` and backend logic to `server/`.
- **Backend Refactoring**: Extracted database logic and authentication controllers.
- **Cleanup**: Removed redundant folders and files.

### [2026-04-29] - Migration to MongoDB & Deployment Prep
- **Database Migration**: Switched from MySQL to MongoDB using **Mongoose**.
- **Environment Variables**: Added `dotenv` and created `.env` for secrets.
- **Entry Point**: Moved the main entry point back to `server.js` in the root (as requested) to simplify the **Render** start command.

---

## 📝 Ongoing Notes
- Ensure `MONGODB_URI` in `.env` is updated with your production string.
- All new routes should be added to `server/routes/` and logic to `server/controllers/`.
- Use Cloudinary for any image uploads to avoid Render's ephemeral storage issues.
