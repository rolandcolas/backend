require('dotenv').config();



const express = require("express");
const mysql = require('mysql'); // Corrected the package name
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'host',
    user: 'root',
    password: "",
    database: "school"
});

app.post('/signup', (req, res) => {
    const sql = "INSERT INTO students (`ID`, `email`, `password`, `firstName`, `lastName`, `yearLevel`) VALUES (?)";
    const values = [
        req.body.ID,
        req.body.email,
        req.body.password,
        req.body.firstName, // Corrected here
        req.body.lastName,
        req.body.yearLevel
    ];
    
    db.query(sql, [values], (err, data) => {
        if (err) {
            console.error(err); // Log the error for debugging
            return res.status(500).json("Error"); // Return a 500 status code
        }
        return res.status(201).json(data); // Return a 201 status for successful creation
    });
});

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM students WHERE `email` = ? AND  `password` = ?";

    
    db.query(sql, [req.body.email,  req.body.password], (err, data) => {
        if (err) {
            return res.json("Error")
        }
        if(data.length > 0) {
        return res.json("Success");
        }
        else {
            return res.json("Faile");
        }

})
})

app.listen(8081, () => {
    console.log("listening on port 8081");
});
