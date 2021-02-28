const db = require('../config/db');
const errors = require('../services/errors');

const findByUserId = async function(userId) {
    const sqlStatement = 'SELECT * FROM lab2_users_in_conversation WHERE user_id = ?';
    try {
        const [ usersInConversations] = await db.getPool().query(sqlStatement, [userId]);
        const conversations  = [];
        if(usersInConversations.length > 0) {
            usersInConversations.forEach( row => {
                conversations.push(findById(row.convo_id));
            });
        }
        console.log('fetching conversations for user id : ' + userId)
        console.log(conversations)
        return conversations
    } catch (err) {
        errors.logAndThrowSqlError('Error accessing the database' + err)
    }
}

const findById = async function( convId ) {
    const sqlStatement = 'SELECT * FROM lab2_conversations WHERE convo_id = ?';
    try {
        const [ conversations ] = await db.getPool().query( sqlStatement, [ convId ] )
        console.log('fetching single conversation with id: ' + convId)
        if( conversations.length < 1 ) {
            return null;
            console.log('no conversation matching')
        } else {
            console.log(conversations[0])
            return conversations[ 0 ];
        }
    } catch( err ) {
        errors.logAndThrowSqlError( "Error accessing the database: " + err );
    }
};
module.exports = { findByUserId, findById }