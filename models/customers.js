//Dependencies

const { Pool } = require('pg');

const connectionString = 'postgres://postgres:admin@localhost:5432/db_invoice';

const pool = new Pool({
    connectionString: connectionString,
    ssl: false
});

module.exports = {
    findAll: callback => {
        if(pool){
            const sql = 'SELECT * FROM customers';
            pool.query(sql)
            .then(res => {
                callback(res.rows);
            })
            .catch(e => {
                throw e;
            });
        }
    },
    findById: (customer_id,callback) => {
        if(pool){
            const sql = `SELECT * FROM customers WHERE id=${customer_id}`;
            pool.query(sql)
            .then(res => {
                callback(res.rows[0]);
            })
            .catch(e => {
                throw e;
            });
        }
    },
    save: (customer,callback) => {
        if(pool){
            const {business_name,company_address,email_address,phone_number} = customer;
            const query = {
                text: 'INSERT INTO customers(business_name,company_address,email_address,phone_number) VALUES($1,$2,$3,$4)',
                values: [business_name,company_address,email_address,phone_number]
            }
            pool.query(query)
            .then(result => {
                callback(result);
            })
            .catch(e => {
                throw e;
            });
        }
    },
    update: (customer,callback) => {
        if(pool){
            const {business_name,company_address,email_address,phone_number,id} = customer;
            const query = {
                text:'UPDATE customers SET business_name=$1,company_address=$2,email_address=$3,phone_number=$4 WHERE id=$5',
                values:[business_name,company_address,email_address,phone_number,id]
            }
            pool.query(query)
            .then(result => {
                callback(result);
            })
            .catch(e => {
                throw e;
            });
        }
    },
    delete: (customer_id, callback) => {
        if(pool){
            const query = {
                text: 'DELETE FROM customers WHERE id=$1',
                values: [customer_id]
            }
            pool.query(query)
            .then(result => {
                callback(result);
            })
            .catch(e => {
                throw e;
            });
        }
    }
};