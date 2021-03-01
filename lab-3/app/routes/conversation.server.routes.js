const conversations = require('../controllers/conversation.server.controller');

module.exports = function( app ) {
        app.route( '/api/conversations' )
        .get( conversations.list )
        .post( conversations.create );

    app.route( '/api/conversations/:id' )
        .get( conversations.read )
        .put( conversations.update )
        .delete( conversations.delete );

    app.route('/api/conversations/:id/messages')
        .get(conversations.listMessages)
        .post(conversations.createMessage);

    app.route( '/api/conversations/:id/messages/:mid')
        .get(conversations.readMessage)
};