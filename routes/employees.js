const express = require('express');
const employees = express.Router();
const db = require('../config/database');

employees.post("/", async (req, res, next) => { // Adds a new employee to the database
    const {Name, Last_Name, Phone_Number, Email, Address} = req.body;

    if(Name && Last_Name && Phone_Number && Email && Address){
        let query = "INSERT INTO employees (Name, Last_Name, Phone_Number, Email, Address)";
        query += ` VALUES('${Name}', '${Last_Name}', ${Phone_Number}, '${Email}', '${Address}')`;

        const rows = await db.query(query);

        if(rows.affectedRows == 1){
            return res.status(201).json({code: 201, message: "New employee added to system"});
        }
        return res.status(500).json({code: 500, message: "An error ocurred"})
    }
    return res.status(500).json({code: 500, message: "Incomplete fields"})
});

employees.delete("/:id([0-9]{1,3})", async (req, res, next) => {
    const query = `DELETE FROM employees WHERE Emp_Id=${req.params.id}`;

    const rows = await db.query(query);

    if(rows.affectedRows == 1){
        return res.status(201).json({code: 201, message: "Employee deleted from system"});
    }
    return res.status(500).json({code: 500, message: "Employee not found"})
});

employees.put("/:id([0-9]{1,3})", async (req, res, next) => {
    const {Name, Last_Name, Phone_Number, Email, Address} = req.body;

    if(Name && Last_Name && Phone_Number && Email && Address){
        let query = `UPDATE employees SET Name='${Name}',Last_Name='${Last_Name}',`;
        query += `Phone_Number=${Phone_Number},Email='${Email}',Address='${Address}' WHERE Emp_Id=${req.params.id}`;

        const rows = await db.query(query);

        if(rows.affectedRows == 1){
            return res.status(200).json({code: 200, message: "Employee Updated"});
        }
        return res.status(500).json({code: 500, message: "An error ocurred"})
    }
    return res.status(500).json({code: 500, message: "Incomplete fields"})
});

employees.get("/", async (req, res, next) => { // Returns all the employees
    const emp = await db.query("SELECT * FROM employees");
    return res.status(200).json({code: 200, message: emp});
});

employees.get('/:name([A-Za-z]+)', async (req, res, next) => { // Returns an employee by name
    const emp_name = req.params.name;
    const emp = await db.query("SELECT * FROM employees WHERE Name='"+emp_name+"';")
    
    if (emp.length > 0) {
        return res.status(200).json({code: 200, message: emp});
    }
    return res.status(404).json({code: 404, message: "Employee not found"})
});

module.exports = employees;