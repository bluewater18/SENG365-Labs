const mysql = require('mysql2/promise');
require("dotenv").config();

let state = {
    pool: null
};

exports.connect = async function() {
    console.log(process.env.USER)
    state.pool = await mysql.createPool({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE
    });
    await state.pool.getConnection(); //Check connection
    console.log('Succesfully connected to database');
};

exports.getPool = function() {
    return state.pool;
}