//Dependencies
const { Pool } = require('pg');
const connectionString = process.env.CON_STRING || 'postgres://postgres:admin@localhost:5432/db_invoice';

let ssl = false;
if(process.env.CON_STRING)
    ssl = true;

const pool = new Pool({
    connectionString: connectionString,
    ssl: ssl
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
                text: 'INSERT INTO invoices(subtotal,tax,total,customer_id) VALUES($1,$2,$3,$4) RETURNING *',
                values: [subtotal,tax,total,customer_id]
            }
            pool.query(query)
            .then(result => {
                callback(result.rows[0]);
            })
            .catch(e => {
                throw e;
            });
        }
    }
}