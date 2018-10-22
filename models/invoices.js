//Dependencies
const { Pool } = require('pg');
const connectionString = 'postgres://mzywvzzvixramb:8f57daa6f46b1fc666cc2cf70b97c556259f311ad620ddb66e544f1e28f33d40@ec2-54-243-61-194.compute-1.amazonaws.com:5432/d5lpsgb1u61t4i';
const pool = new Pool({
    connectionString: connectionString,
    ssl: true
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