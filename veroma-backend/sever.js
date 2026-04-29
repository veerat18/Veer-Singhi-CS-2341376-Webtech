const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Virat@18",
    database: "veroma"
});

db.connect((err) => {
    if (err) {
        console.log("DB Error:", err);
    } else {
        console.log("MySQL Connected");
    }
});

app.get("/", (req, res) => {
    res.send("Server is running 🚀");
});

app.listen(3001, () => { 
   console.log("Server running on port 3001");
});