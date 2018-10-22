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
            const sql = 'SELECT * FROM invoice_lines';
            pool.query(sql)
            .then(res => {
                callback(res.rows);
            })
            .catch(e => {
                throw e;
            });
        }
    },
    findById: (invoice_line_id, callback) => {
        if(pool){
            const sql = `SELECT * FROM invoice_lines WHERE id=${invoice_line_id}`;
            pool.query(sql)
            .then(res => {
                callback(res.rows[0]);
            })
            .catch(e => {
                throw e;
            });
        }
    },
    findByInvoiceId: (invoice_id, callback) => {
        if(pool){
            const sql = `SELECT * FROM invoice_lines WHERE invoice_id=${invoice_id}`;
            pool.query(sql)
            .then(res => {
                callback(res.rows);
            })
            .catch(e => {
                throw e;
            });
        }
    },
    save: (invoice_line, callback) => {
        if(pool){
            const {description,unit_cost,quantity,amount,invoice_id} = invoice_line;
            const query = {
                text: `INSERT INTO invoice_lines(description,unit_cost,quantity,amount,invoice_id)
                VALUES($1,$2,$3,$4,$5) RETURNING *`,
                values: [description,unit_cost,quantity,amount,invoice_id]
            }
            pool.query(query)
            .then(result => {
                callback(result.rows[0]);
            })
            .catch(e => {
                throw e;
            });
        }
    },
    delete: (invoice_line_id,callback) => {
        if(pool){
            const query = {
                text: 'DELETE FROM invoice_lines WHERE id=$1',
                values:[invoice_line_id]
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
    deleteAllByInvoiceId: (invoice_id, callback) => {
        if(pool){
            const query = {
                text: 'DELETE FROM invoice_lines WHERE invoice_id=$1',
                values:[invoice_id]
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