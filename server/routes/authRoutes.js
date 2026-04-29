const express = require("express");
const router = express.Router();
const path = require("path");
const authController = require("../controllers/authController");

// Page Routes
router.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, "../../client/register.html"));
});

router.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "../../client/login.html"));
});

// Action Routes
router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;
