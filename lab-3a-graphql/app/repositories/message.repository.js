const db = require('../config/db');
const errors = require('../services/errors');

const findByConversation = async function (convoId) {
    const sqlStatement = 'SELECT * FROM lab2_messages WHERE convo_id = ?';
    try {
        const [messages] = await db.getPool().query( sqlStatement, [convoId]);
        return messages
    } catch (err) {
        errors.logAndThrowSqlError('Error accessing the database: ' + err);
    }
};

module.exports = {findByConversation}