const morgan = require('morgan');
const express = require('express');
const app = express();
const employees = require('./routes/employees');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res, next) => { // Root address
   return res.status(200).send("Welcome to Taller de Node.js S.A. de C.V. employee system");
});

app.use("/employees", employees);

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running...");
});