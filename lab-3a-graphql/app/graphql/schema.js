const { GraphQLSchema, GraphQLObjectType, GraphQLID } = require( 'graphql' );
const { UserType } = require( './typeDefinitions' );
const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: {
            user: {
                type: UserType,
                args: {
                    user_id: { type: GraphQLID },
                },
                resolve: (_, {user_id}, context) => {
                    return context.userRepository.findById(user_id);
                },
            },
        },
    }),
});
module.exports = { schema };