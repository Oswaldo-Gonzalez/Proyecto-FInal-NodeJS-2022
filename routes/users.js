const express = require('express');
const jwt = require('jsonwebtoken');
const users = express.Router();
const db = require('../config/database');

users.post("/signin", async (req, res, next) => {
    const {Username, User_Email, User_Password} = req.body;

    if(Username && User_Email && User_Password){
        let query = "INSERT INTO users(Username, User_Email, User_Password) ";
        query += `VALUES ('${Username}', '${User_Email}', '${User_Password}');`;

        const rows = await db.query(query);

        if(rows.affectedRows == 1){
            return res.status(201).json({code: 201, message: "User created"});
        }
        return res.status(500).json({code: 500, message: "An error ocurred"});
    }
    return res.status(500).json({code: 500, message: "Incomplete fields"});
});

users.post("/login", async (req, res, next) => {
    const { User_Email, User_Password} = req.body; 

    if(User_Email && User_Password){
        const query = `SELECT * FROM users WHERE User_Email='${User_Email}' AND User_Password='${User_Password}';`;
        const rows = await db.query(query);

        if(rows.length == 1){
            const token = jwt.sign({
                user_id: rows[0].User_Id,
                user_mail: rows[0].User_Email
            }, "debugkey");
            return res.status(200).json({code: 200, message: token});
        }
        else{
            return res.status(401).json({code: 401, message: "Wrong User or password"});
        }
    }
    return res.status(500).json({code: 500, message: "Incomplete fields"});
    
});

module.exports = users;