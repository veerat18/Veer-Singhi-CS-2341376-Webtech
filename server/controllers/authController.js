const User = require("../models/User");

exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    console.log("Registering User:", { username, email });

    try {
        const newUser = new User({ username, email, password });
        await newUser.save();
        res.redirect("/login");
    } catch (err) {
        console.log("Database Error:", err);
        if (err.code === 11000) { // MongoDB duplicate key error code
            return res.send("❌ Email already exists!");
        } else {
            return res.send("❌ Database error occurred!");
        }
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email, password });
        if (user) {
            return res.redirect("/");
        } else {
            return res.send("❌ Invalid Email or Password");
        }
    } catch (err) {
        console.log(err);
        return res.send("Error occurred during login");
    }
};
