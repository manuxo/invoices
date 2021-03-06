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