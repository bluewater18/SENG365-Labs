const db = require('../../config/db');

exports.getAll = async function(){
    console.log( 'Request to get all conversations from the database...' );
    const conn = await db.getPool().getConnection();
    const query = 'select * from lab2_conversations';
    const [ rows ] = await conn.query( query );
    conn.release();
    return rows
};

exports.getOne = async function(id){
    console.log( `Request to get conversation ${id} from the database...` );
    const conn = await db.getPool().getConnection();
    const query = 'select * from lab2_conversations where convo_id = ?';
    const [ rows ] = await conn.query( query, [ id ] );
    conn.release();
    return rows;
};

exports.insert = async function(convo_name){
    console.log( `Request to insert conversation ${convo_name} into the database...` );
    const conn = await db.getPool().getConnection();
    const query = 'insert into lab2_conversations (convo_name) values ( ? )';
    const [ result ] = await conn.query( query, [ convo_name ] );
    conn.release();
    return result;
};

exports.alter = async function(id, convo_name){
    console.log(`Request to update conversation ${id} with conversation name ${convo_name}`);
    const conn = await db.getPool().getConnection();
    const query = 'update lab2_conversations set convo_name = ? where convo_id=?';
    const [result] = await conn.query(query, [convo_name, id]);
    conn.release();
    return result
};

exports.remove = async function(id){
    console.log(`Request to delete conversation ${id}`);
    const conn = await db.getPool().getConnection();
    const query = 'delete from lab2_conversations where convo_id=?';
    const [result] = await conn.query(query, [id]);
    conn.release();
    return result
};

exports.getAllMessages = async function(id){
    console.log( `Request to get all messages from conversation ${id} from the database...` );
    const conn = await db.getPool().getConnection();
    const query = 'select * from lab2_messages where convo_id = ?';
    const [ rows ] = await conn.query( query, [ id ] );
    conn.release();
    return rows;
};

exports.getOneMessage = async function(convo_id, message_id){
    console.log( `Request to get message ${message_id} from conversation ${convo_id} from the database...` );
    const conn = await db.getPool().getConnection();
    const query = 'select * from lab2_messages where convo_id = ? and message_id = ?';
    const [ rows ] = await conn.query( query, [ convo_id, message_id ] );
    conn.release();
    return rows;
};

exports.insertMessage = async function (convo_id, user_id, message) {
    console.log( `Request to insert message ${message} into conversation ${convo_id} by user ${user_id} into the database...` );
    const conn = await db.getPool().getConnection();
    const query = 'insert into lab2_messages (convo_id, user_id, message) values ( ?,?,? )';
    const [ result ] = await conn.query( query, [ convo_id, user_id, message ] );
    conn.release();
    return result;
};

