const express = require("express");
const path = require("path");
const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "../client")));

// Routes
app.use("/", authRoutes);

// Home Page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "index.html"));
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
