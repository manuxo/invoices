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
            const sql = 'SELECT * FROM invoices';
            pool.query(sql)
            .then(res => {
                callback(res.rows);
            })
            .catch(e => {
                throw e;
            });
        }
    },
    findById: (invoice_id,callback) => {
        if(pool){
            const sql = `SELECT * FROM invoices WHERE id=${invoice_id}`;
            pool.query(sql)
            .then(res => {
                callback(res.rows[0]);
            })
            .catch(e => {
                throw e;
            });
        }
    },
    save: (invoice, callback) => {
        if(pool){
            const {subtotal,tax,total,customer_id} = invoice;
            const query = {
                text: 'INSERT INTO invoices(subtotal,tax,total,customer_id) VALUES($1,$2,$3,$4)',
                values: [subtotal,tax,total,customer_id]
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
}