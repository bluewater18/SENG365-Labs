exports.logAndThrowSqlError = function( err ) {
    console.error( `An error occurred when executing: \n${ err.sql } \nERROR: ${ err.sqlMessage }` );
    err.hasBeenLogged = true;
    throw err;
};
