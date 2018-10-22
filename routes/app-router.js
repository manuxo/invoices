const express = require('express');
const customerRepo = require('../models/customers');
const invoiceRepo = require('../models/invoices');
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
    invoiceRepo.findAll(invoices => {
        customerRepo.findAll(customers => {
            invoices.forEach(invoice => {
                invoice.customer = customers.find(customer => {
                    return customer.id === invoice.customer_id;
                });
            });
            res.render('index', {
                path:'invoices',
                tittle:'MAE - Invoices',
                model: {
                    customers: customers,
                    invoices: invoices
                }
            });
        });
    });
});
