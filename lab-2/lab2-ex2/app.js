const mysql = require( 'mysql2/promise' );
require( 'dotenv' ).config( { path: './.env' } );
const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const app = express();
app.use( bodyParser.json() );

const pool = mysql.createPool( {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
} );


async function getUsers(req, res) {
    console.log('Request to get all users from the database');
    let connection
    try {
        connection = await pool.getConnection();
        const [rows, fields] = await connection.query('select * from lab2_users');
        res.status(200).send(rows);
    } catch (err) {
        res.status(500).send(`Error fetting users: ${err}`);
    } finally {
        connection.release();
    }
}

app.get('/users', getUsers)

async function getUser(req, res) {
    console.log('Request to get user from the database by id');
    let connection
    try {
        connection = await pool.getConnection();
        sql = 'select * from lab2_users where user_id = ?'
        values = [req.params.id]
        const [rows, fields] = await connection.query(sql, [values]);
        if (rows.length > 0) {
            res.status(200).send(rows[0]);
        } else {
            res.status(404).send('User Not Found')
        }
    } catch (err) {
        res.status(500).send(`Error getting user: ${err}`);
    } finally {
        connection.release();
    }
}

app.get('/users/:id', getUser)

async function postUser( req, res ) {
    console.log( 'Request to add a new user to the database' );
    let connection
    try {
        connection = await pool.getConnection();
        const sql = 'insert into lab2_users (username) values ( ? )';
        const values = [ req.body.username ];
        const [fields] = await connection.query( sql,  values  );
        res.status( 201 )
            .send(`User successfully added to the database with id ${fields.insertId}`);
    } catch( err ) {
        res.status( 500 )
            .send( `ERROR posting user: ${ err }` )
    } finally {
        connection.release();
    }
}
app.post( '/users', postUser );

async function putUser(req, res) {
    console.log('Request to update a user');
    let connection
    try {
        connection = await pool.getConnection();
        const sql = 'UPDATE lab2_users SET username=? WHERE user_id=?';
        const values = [req.body.username, req.params.id];
        await connection.query(sql, values);
        res.status(201).send('User successfully updated')
    } catch (err) {
        res.status(500).send(`ERROR updating user: ${ err }`)
    } finally {
        connection.release();
    }
}
app.put('/users/:id', putUser)

async function deleteUser(req, res) {
    console.log('Request to delete user');
    let connection
    try {
        connection = await pool.getConnection();
        const sql = 'delete from lab2_users where user_id = ?';
        const values = [req.params.id];
        await connection.query(sql, [values]);
        res.status(200).send('User successfully deleted')
    } catch (err) {
        res.status(500).send(`ERROR deleting user: ${ err }`)
    } finally {
        connection.release();
    }
}
app.delete('/users/:id', deleteUser)

async function getConversations(req, res) {
    console.log('Request to get all conversations')
    let connection
    try {
        connection = await pool.getConnection();
        const [rows, fields] = await connection.query('select * from lab2_conversations');
        res.status(200).send(rows);
    } catch (err) {
        res.status(500).send(`Error fetching conversations: ${err}`);
    } finally {
        connection.release();
    }
}
app.get('/conversations', getConversations);

async function getConversation(req, res) {
    console.log('request to get conversation by id')
    let connection
    try {
        connection = await pool.getConnection();
        sql = 'select * from lab2_conversations where convo_id = ?'
        values = [req.params.id]
        const [rows, fields] = await connection.query(sql, [values]);
        if (rows.length > 0) {
            res.status(200).send(rows[0]);
        } else {
            res.status(404).send('Conversation Not Found')
        }
    } catch (err) {
        res.status(500).send(`Error getting conversation: ${err}`);
    } finally {
        connection.release();
    }
}
app.get('/conversations/:id', getConversation)

async function postConversation(req, res){
    console.log('request to post conversation');
    let connection
    try {
        connection = await pool.getConnection();
        const sql = 'insert into lab2_conversations (convo_name) values ( ? )';
        const values = [ req.body.convo_name ];
        await connection.query( sql, [ values ] );
        res.status( 201 )
            .send(`Conversation successfully added to the database`);
    } catch( err ) {
        res.status( 500 )
            .send( `ERROR posting conversation: ${ err }` )
    } finally {
        connection.release();
    }
}
app.post('/conversations', postConversation)

async function putConversation(req, res) {
    console.log('request to update conversation')
    let connection
    try {
        connection = await pool.getConnection();
        const sql = 'update lab2_conversations set convo_name = ? where convo_id = ?';
        values = [req.body.convo_name, req.params.id];
        await connection.query(sql, values);
        res.status(201).send('Conversation successfully updated')
    } catch (err) {
        res.status(500).send(`ERROR updating conversation: ${ err }`)
    } finally {
        connection.release();
    }
}
app.put('/conversations/:id', putConversation)

async function deleteConversation(req, res) {
    console.log('request to delete conversation')
    let connection
    try {
        connection = await pool.getConnection();
        const sql = 'delete from lab2_conversations where convo_id = ?';
        const values = [req.params.id];
        await connection.query(sql, [values]);
        res.status(200).send('conversation successfully deleted')
    } catch (err) {
        res.status(500).send(`ERROR deleting conversation: ${ err }`)
    } finally {
        connection.release();
    }
}
app.delete('/conversations/:id', deleteConversation)

async function getMessages(req, res) {
    let connection
    console.log('request to get messages for a conversation')
    try {
        connection = await pool.getConnection()
        const sql = 'select * from lab2_messages where convo_id  = ?'
        const values = [req.params.id]
        const [rows, fields] = await  connection.query(sql, [values])
        res.status(200).send(rows)
    } catch (err) {
        res.status(500).send(`ERROR getting messages: ${err}`)
    } finally {
        connection.release();
    }
}
app.get('/conversations/:id/messages', getMessages)

async function getMessage(req, res) {
    console.log('request to get message')
    let connection
    try {
        connection = await pool.getConnection()
        const sql = 'select * from lab2_messages where convo_id  = ? and message_id = ?'
        const values = [req.params.id, req.params.message_id]
        const [rows, fields] = await  connection.query(sql, values)
        if (rows.length > 0) {
            res.status(200).send(rows[0])
        } else {
            res.status(404).send('Message Not Found')
        }
    } catch (err) {
        res.status(500).send(`ERROR getting messages: ${err}`)
    } finally {
        connection.release();
    }
}
app.get('/conversations/:id/messages/:message_id', getMessage)

async function postMessage(req, res) {
    console.log('request to post message')
    let connection
    try {
        connection = await pool.getConnection()
        const sql = 'insert into lab2_messages (convo_id, user_id, message) values (?, ?, ?)'
        const values = [req.params.id, req.body.user_id, req.body.message]
        const [rows, fields] = await connection.query(sql, values)
        connection.release();
        res.status(201).send('message added successfully')
    } catch (err) {
        connection.release();
        res.status(500).send(`Error posting message: ${err}`)
    } finally {
        connection.release();
    }
}
app.post('/conversations/:id/messages', postMessage)

const port = process.env.PORT || 3000;
app.listen( port, () => {
    console.log( `Listening on port: ${ port }` );
} );
