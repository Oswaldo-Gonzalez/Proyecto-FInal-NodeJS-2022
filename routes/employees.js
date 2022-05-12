const express = require('express');
const employees = express.Router();
const db = require('../config/database');

employees.post("/", (req, res, next) => {
    return res.status(200).send(req.body.name);
});

employees.get("/", async (req, res, next) => { // Returns all the employees
    const emp = await db.query("SELECT * FROM employees");
    return res.status(200).json(emp);
});

employees.get('/:id([0-9]{1,3})', (req, res, next) => {
    const id = req.params.id - 1;
    return (id >= 0 && id <= 150) ? res.status(200).send(pk[req.params.id - 1]) : res.status(404).send("Pokémon no encontrado");
    
});

employees.get('/:name([A-Za-z]+)', (req, res, next) => { // Returns an employee by name
    const name = req.params.name;
    const pkmn = pk.filter((p) => {
        return (p.name.toUpperCase() == name.toUpperCase()) ? p : null;
    });

    return (pkmn.length > 0) ? res.status(200).send(pkmn) : res.status(404).send("Pokémon no encontrado");
});

module.exports = employees;