const express = require('express');

let invoiceRouter = express.Router();

module.exports = invoiceRouter;

invoiceRouter.get('/', (req,res) => {
    res.status(200).send("Invoices");
});
