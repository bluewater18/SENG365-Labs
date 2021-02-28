const mysql = require( 'mysql2' );
require('dotenv' ).config( { path: './.env' } );

const connection = mysql.createConnection( {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
} );

connection.connect( err => {
    if( err ) throw err;
    console.log( 'Connected!' );
} );

connection.connect( err => {
    if( err ) throw err;
    console.log( 'Connected!' );
    let statement = 'select * from lab2_users';
    connection.query( statement, null, ( err1, result ) => {
        if( err1 ) throw err1;
        console.log( 'Users:', result );
    } );
} );

connection.connect( err => {
    if( err ) throw err;
    console.log( 'Connected!' );
    let statement = 'select * from lab2_users';
    connection.query( statement, ( err1, result1 ) => {
        if( err1 ) throw err1;
        statement = 'select * from lab2_users where username = ? ';
        connection.query( statement, result1[0].username,( err2, result2 ) => {
            if( err2 ) throw err2;
            console.log( 'Users:', result2 );
        } );
    } );
} );

