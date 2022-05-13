const express = require('express');
const employees = express.Router();
const db = require('../config/database');

employees.post("/", async (req, res, next) => { // Adds a new employee to the database
    const {Name, Last_Name, Phone_Number, Email, Address} = req.body;

    if(Name && Last_Name && Phone_Number && Email && Address){
        let query = "INSERT INTO employees (Name, Last_Name, Phone_Number, Email, Address)";
        query += ` VALUES('${Name}', '${Last_Name}', '${Phone_Number}', '${Email}', '${Address}')`;

        const rows = await db.query(query);

        if(rows.affectedRows == 1){
            return res.status(201).json({code: 201, message: "New employee added to system"});
        }
        return res.status(500).json({code: 500, message: "An error ocurred"})
    }
    return res.status(500).json({code: 500, message: "Incomplete fields"})
});

employees.get("/", async (req, res, next) => { // Returns all the employees
    const emp = await db.query("SELECT * FROM employees");
    return res.status(200).json({code: 200, message: emp});
});

/*employees.get('/:id([0-9]{1,3})', (req, res, next) => {
    const id = req.params.id - 1;
    return (id >= 0 && id <= 150) ? res.status(200).send(pk[req.params.id - 1]) : res.status(404).send("Pokémon no encontrado");
    
});*/

employees.get('/:name([A-Za-z]+)', async (req, res, next) => { // Returns an employee by name
    const emp_name = req.params.name;
    const emp = await db.query("SELECT * FROM employees WHERE Name='"+emp_name+"';")
    
    if (emp.length > 0) {
        return res.status(200).json({code: 200, message: emp});
    }
    return res.status(404).json({code: 404, message: "Employee not found"})
});

module.exports = employees;