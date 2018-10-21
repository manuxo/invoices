const express = require('express');
const customerRepo = require('../../models/customers');
let customerRouter = express.Router();

module.exports = customerRouter;

customerRouter.get('/', (req,res) => {
    customerRepo.findAll(customers => {
        res.status(200).send(customers);
    });
});

customerRouter.get('/:id', (req,res) => {
    customerRepo.findById(req.params.id,customer => {
        res.status(200).send(customer);
    });
});

customerRouter.post('/', (req,res) => {
    const customer = {
        business_name: req.body.business_name,
        company_address: req.body.company_address,
        email_address: req.body.email_address,
        phone_number: req.body.phone_number
    };
    customerRepo.save(customer,result => {
        res.status(201).send(result);
    });
});

customerRouter.put('/', (req,res) => {
    const customer = {
        id: req.body.id,
        business_name: req.body.business_name,
        company_address: req.body.company_address,
        email_address: req.body.email_address,
        phone_number: req.body.phone_number
    };
    customerRepo.update(customer,result => {
        res.status(201).send(result);
    });
});

customerRouter.delete('/:id', (req,res) => {
    const customer_id = req.params.id;
    customerRepo.delete(customer_id, result => {
        res.status(201).send(result);
    });
})
