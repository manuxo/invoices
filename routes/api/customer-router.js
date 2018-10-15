const express = require('express');

let customerRouter = express.Router();

module.exports = customerRouter;

customerRouter.get('/', (req,res) => {
    res.status(200).send("Customers");
});

