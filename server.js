require("dotenv").config();
const express = require("express");
const path = require("path");
const connectDB = require("./server/config/db");
const authRoutes = require("./server/routes/authRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Static Files
const clientPath = path.join(__dirname, "client");
app.use(express.static(clientPath));

// Auth Routes
app.use("/", authRoutes);

// Clean URL Routing for HTML files
const pages = ["about", "collection", "contact", "login", "register"];
pages.forEach(page => {
    app.get(`/${page}`, (req, res) => {
        res.sendFile(path.join(clientPath, `${page}.html`));
    });
});

// Home Page
app.get("/", (req, res) => {
    res.sendFile(path.join(clientPath, "index.html"));
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
