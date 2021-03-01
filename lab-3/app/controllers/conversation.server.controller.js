const conversation = require('../models/conversation.server.model');

exports.list = async function(req, res){
    console.log('\nRequest to list conversations...');
    try {
        const result = await conversation.getAll();
        res.status(200).send(result)
    } catch (err) {
        res.status(500).send(`ERROR getting conversations ${err}`)
    }
};

exports.create = async function(req, res){
    console.log('\nRequest to create a new conversation...');
    const convo_name = req.body.convo_name;
    try {
        const result = await conversation.insert(convo_name);
        res.status(201).send({convo_id: result.insertId})
    } catch (err) {
        res.status(500).send(`ERROR creating conversation ${err}`)
    }
};

exports.read = async function(req, res){
    console.log('\nRequest to read a conversation...');
    const id = req.params.id
    try {
        const result = await conversation.getOne(id);
        if(result.length === 0){
            res.status(404).send('Not Found')
        } else {
            res.status(200).send(result)
        }
    } catch (err) {
        res.status(500).send(`ERROR getting conversation ${id}: ${err}`)
    }
};

exports.update = async function(req, res){
    console.log( '\nRequest to update a conversation...' );
    const convo_name = req.body.convo_name;
    try {
        const id = req.params.id;
        const result = await conversation.alter( id, convo_name );
        res.status( 200 )
            .send( 'Updated' );
    } catch( err ) {
        res.status( 500 )
            .send( `ERROR updating conversation ${req.params.id}: ${ err }` );
    }
};

exports.delete = async function(req, res){
    console.log('\nRequest to read a conversation...');
    const id = req.params.id
    try {
        const result = await conversation.remove(id);
        res.status(200).send('Deleted')
    } catch (err) {
        res.status(500).send(`ERROR deleting conversation ${id}: ${err}`)
    }
};

exports.listMessages = async function(req, res) {
    console.log('\nRequest to list messages...');
    try {
        const result = await conversation.getAllMessages();
        res.status(200).send(result)
    } catch (err) {
        res.status(500).send(`ERROR getting messages ${err}`)
    }
};

exports.readMessage = async function(req, res) {
    console.log('\nRequest to read a conversation...');
    const id = req.params.id;
    const message_id = req.params.mid;
    try {
        const result = await conversation.getOneMessage(id, message_id);
        if(result.length === 0){
            res.status(404).send('Not Found')
        } else {
            res.status(200).send(result)
        }
    } catch (err) {
        res.status(500).send(`ERROR getting message ${message_id} from conversation ${id}: ${err}`)
    }
};

exports.createMessage = async function(req, res) {
    console.log('\nRequest to create a new message...');
    const convo_id = req.params.id;
    const user_id = req.body.user_id;
    const message = req.body.message;
    try {
        const result = await conversation.insertMessage(convo_id, user_id, message);
        res.status(201).send({message_id: result.insertId})
    } catch (err) {
        res.status(500).send(`ERROR creating message ${err}`)
    }
};
