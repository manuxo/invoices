//Dependencies

const { Pool } = require('pg');

const connectionString = 'postgres://postgres:admin@localhost:5432/db_invoice';

const pool = new Pool({
    connectionString: connectionString,
    ssl: true
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
};