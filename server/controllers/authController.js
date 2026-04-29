const db = require("../config/db");

exports.register = (req, res) => {
    const { username, email, password } = req.body;
    console.log("Registering User:", { username, email });

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
};

exports.login = (req, res) => {
    const { email, password } = req.body;

    const query = "SELECT * FROM users WHERE email = ? AND password = ?";

    db.query(query, [email, password], (err, results) => {
        if (err) {
            console.log(err);
            return res.send("Error occurred");
        }

        if (results.length > 0) {
            return res.redirect("/");
        } else {
            return res.send("❌ Invalid Email or Password");
        }
    });
};
