const grapgql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = grapgql;

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        genre: { type: GraphQLString }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {id: {type: GraphQLString}},
            resolve(parent, args){
                //get data from DB 
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});