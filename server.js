const express = require("express");
const app = express();
const path = require("path");
const mysql = require("mysql2");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// MySQL Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Virat@18",  // 🔴 change this
    database: "veroma_db"
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
    } else {
        console.log("Connected to MySQL Database.");

        // 🔎 CHECK WHICH DATABASE IS ACTIVE
        db.query("SELECT DATABASE()", (err, result) => {
            if (err) {
                console.log("Error checking database:", err);
            } else {
                console.log("Connected Database:", result);
            }
        });
    }
});
// ================= ROUTES =================

// Home
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Register Page
app.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "register.html"));
});

// Register POST
app.post("/register", (req, res) => {
    const { username, email, password } = req.body;

    console.log("Form Data:", req.body);

    const query = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";

    db.query(query, [username, email, password], (err, result) => {
        if (err) {
            console.log("Database Error:", err);

            if (err.code === "ER_DUP_ENTRY") {
                return res.send("❌ Email already exists!");
            } else {
                return res.send("❌ Database error occurred!");
            }
        }
        res.redirect("/login");
    });
});

// Login Page
app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "login.html"));
});

// Login POST
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    const query = "SELECT * FROM users WHERE email = ? AND password = ?";

    db.query(query, [email, password], (err, results) => {
        if (err) {
            console.log(err);
            return res.send("Error occurred");
        }

        if (results.length > 0) {
            return res.redirect("/");   // 🔥 IMPORTANT: return here
        } else {
            return res.send("❌ Invalid Email or Password");
        }
    });
});

// Start Server
app.listen(5000, () => {
    console.log("🚀 Server running at http://localhost:5000");
});