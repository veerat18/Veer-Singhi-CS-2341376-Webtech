# Veroma Rugs

Veroma Rugs is a full-stack web application designed for a luxury rug business. The project showcases a collection of high-quality rugs and includes a user authentication system for managing customer accounts.

## 🚀 Project Overview

This application is built with a modular architecture to ensure scalability and ease of maintenance. It features a responsive frontend and a structured backend using the MVC (Model-View-Controller) pattern.

### Tech Stack
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Hosting**: Render
- **Image Storage**: Cloudinary (Recommended)

---

## 📂 Project Structure

```text
veroma-rugs/
├── client/                 # Frontend assets (Publicly served)
│   ├── images/             # Product and UI images
│   ├── index.html          # Homepage
│   ├── collection.html     # Rug catalog
│   ├── login.html          # User login page
│   ├── register.html       # User registration page
│   ├── style.css           # Global styles
│   └── script.js           # Frontend logic
├── server/                 # Backend logic (Node.js/Express)
│   ├── config/             # Database configuration
│   ├── controllers/        # Logic for each route (Auth, etc.)
│   └── routes/             # API and page route definitions
├── server.js               # Main server entry point
├── package.json            # Project dependencies and scripts
└── .gitignore              # Files ignored by Git
```

---

## 🛠️ Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v14 or higher)
- [MySQL](https://www.mysql.com/)

### Installation
1. Clone the repository to your local machine.
2. Navigate to the project root:
   ```bash
   cd veroma-rugs
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

### Database Setup
1. Create a MongoDB database (e.g., using MongoDB Atlas).
2. Get your connection string.
3. Update the `MONGODB_URI` in your `.env` file.

### Running the Application
To start the server, run:
```bash
npm start
```
The application will be available at `http://localhost:5000`.

---

## 🌟 Key Features
- **Responsive Design**: Optimized for both desktop and mobile viewing.
- **User Authentication**: Secure registration and login system.
- **Product Showcase**: A modular collection page displaying various luxury rugs.
- **Clean Architecture**: Backend logic is decoupled from the frontend, following modern development best practices.
