const db = require( '../config/db' );
const errors = require( '../services/errors' );

const findAll = async function() {
    const sqlStatement = 'SELECT * FROM `lab2_users`';
    try {
        const [ users ] = await db.getPool().query( sqlStatement );
        return users;
    } catch( err ) {
        errors.logAndThrowSqlError( 'Error accessing the database: ' + err );
    }
};
const findById = async function( id ) {
    const sqlStatement = 'SELECT * FROM `lab2_users` WHERE user_id = ?';
    try {
        const [ users ] = await db.getPool().query( sqlStatement, id );
        if( users.length < 1 ) {
            return null;
        } else {
            return users[0];
        }
    } catch( err ) {
        errors.logAndThrowSqlError( 'Error accessing the database: ' + err );
    }
};
module.exports = { findAll, findById }