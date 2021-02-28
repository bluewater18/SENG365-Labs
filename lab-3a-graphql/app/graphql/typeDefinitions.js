const { GraphQLID, GraphQLObjectType, GraphQLString, GraphQLList } = require('graphql');
const { GraphQLScalarType } = require( 'graphql' );
const { Kind } = require ('graphql/language');
const GraphQLDate = new GraphQLScalarType({
    name : 'GraphQLDate',
    description: 'Date custom scalar type',
    parseValue(value) {
        return new Date(value); // value from the client
    },
    serialize(value) {
        return value.toLocaleString(); // value sent to the client
    },
    parseLiteral(ast) {
        if (ast.kind === Kind.INT) {
            return new Date(ast.value) // ast value is always in string format
        }
        return null;
    },
});
const MessageType = new GraphQLObjectType({
    name: 'Message',
    fields: {
        convo_id: { type: GraphQLID },
        user_id: { type: GraphQLID },
        message: { type: GraphQLString },
        sent_time: { type: GraphQLDate }
    },
});
const ConversationType = new GraphQLObjectType( {
    name: 'Conversation',
    fields: {
        convo_id: { type: GraphQLID },
        convo_name: { type: GraphQLString },
        created_on: { type: GraphQLDate },
        messages: {
            type: GraphQLList(MessageType),
            resolve: ( root, _, context) => {
                return context.messageRepository.findByConversation( root.convo_id );
            },
        }
    },
} );
const UserType = new GraphQLObjectType( {
    name: 'User',
    fields: {
        user_id: { type: GraphQLID },
        username: { type: GraphQLString },
        inConversations: {
            type: GraphQLList(ConversationType),
            resolve: ( root, _, context) => {
                return context.convRepository.findByUserId( root.user_id );
            },
        },
    },
} );
module.exports = { UserType, ConversationType, MessageType };