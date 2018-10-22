const express = require('express');
const invoiceLinesRepo = require('../../models/invoice-lines');
let invoiceLinesRouter = express.Router();

module.exports = invoiceLinesRouter;

invoiceLinesRouter.get('/', (req,res) => {
    invoiceLinesRepo.findAll(invoiceLines => {
        res.status(200).send(invoiceLines);
    });
});

invoiceLinesRouter.get('/:id', (req,res) => {
    invoiceLinesRepo.findById(req.params.id, invoiceLine => {
        res.status(200).send(invoiceLine);
    });
});

invoiceLinesRouter.post('/', (req,res) => {
    const invoiceLine = {
        description: req.body.description,
        unit_cost: req.body.unit_cost,
        quantity: req.body.quantity,
        amount: req.body.amount,
        invoice_id: req.body.invoice_id
    }
    invoiceLinesRepo.save(invoiceLine, result => {
        res.status(201).send(result);
    });
});

invoiceLinesRouter.delete('/:id', (req,res) => {
    invoiceLinesRepo.delete(req.params.id, result => {
        res.status(200).send(result);
    });
});

invoiceLinesRouter.get('/invoice/:invoice_id', (req,res) => {
    invoiceLinesRepo.findByInvoiceId(req.params.invoice_id, invoiceLines => {
        res.status(200).send(invoiceLines);
    });
});

invoiceLinesRouter.delete('/invoice/:invoice_id',(req,res) => {
    invoiceLinesRepo.deleteAllByInvoiceId(req.params.invoice_id, result => {
        res.status(200).send(result);
    });
})

