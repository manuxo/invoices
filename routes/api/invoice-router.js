const express = require('express');
const invoiceRepo = require('../../models/invoices');

let invoiceRouter = express.Router();

module.exports = invoiceRouter;

invoiceRouter.get('/', (req,res) => {
    invoiceRepo.findAll(invoices => {
        res.status(200).send(invoices);
    });
});

invoiceRouter.get('/:id', (req,res) => {
    invoiceRepo.findById(req.params.id, invoice => {
        res.status(200).send(invoice);
    });
});

invoiceRouter.post('/', (req,res) => {
    const invoice = {
        customer_id: req.body.customer_id,
        subtotal: req.body.subtotal,
        tax: req.body.tax,
        total: req.body.total
    };
    invoiceRepo.save(invoice,result => {
        res.status(201).send(result);
    });
});