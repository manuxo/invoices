const express = require('express');
const customerRepo = require('../models/customers');
let appRouter = express.Router();

module.exports = appRouter;

appRouter.get('/', (req,res) => {
    res.render('index',{
        path:'home',
        tittle:'MAE - Home',
        model: {}
    });
});

appRouter.get('/customers', (req,res) => {
    customerRepo.findAll((customers) => {
        res.render('index',{
            path:'customers',
            tittle:'MAE - Customers',
            model: {
                customers:customers
            }
        });
    });
});

appRouter.get('/invoices', (req,res) => {
    customerRepo.findAll(customers => {
        res.render('index', {
            path:'invoices',
            tittle:'MAE - Invoices',
            model: {
                customers: customers
            }
        });
    });
});
