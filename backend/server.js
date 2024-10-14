require('dotenv').config();



const express = require("express");
const mysql = require('mysql'); // Corrected the package name
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST,        // Use environment variable
    user: process.env.DB_USERNAME,    // Use environment variable
    password: process.env.DB_PASSWORD, // Use environment variable
    database: process.env.DB_DBNAME    // Use environment variable
});


app.post('/api/signup', (req, res) => {
    const sql = "INSERT INTO students (`ID`, `email`, `password`, `firstName`, `lastName`, `yearLevel`) VALUES (?)";
    const values = [
        req.body.ID,
        req.body.email,
        req.body.password,
        req.body.firstName,
        req.body.lastName,
        req.body.yearLevel
    ];
    
    db.query(sql, [values], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json("Error");
        }
        return res.status(201).json(data);
    });
});

app.post('/api/login', (req, res) => {
    const sql = "SELECT * FROM students WHERE `email` = ? AND `password` = ?";
    
    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if (err) {
            return res.json("Error");
        }
        if (data.length > 0) {
            return res.json("Success");
        } else {
            return res.json("Failed");
        }
    });
});


app.listen(8081, () => {
    console.log("listening on port 8081");
});
