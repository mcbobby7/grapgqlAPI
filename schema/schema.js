const grapgql = require('graphql');
const _ = require('lodash')

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = grapgql;

// dummy data
var books = [
    {name: 'Name of the wind', genre: 'Sci-Fi', id: '1' },
    {name: 'Chika obi', genre: 'Fantacy', id: '2' },
    {name: 'Obi goes to school', genre: 'Fantacy', id: '3' },
    {name: 'Ada is a girl', genre: 'Fantacy', id: '4' },
    {name: 'The long earth', genre: 'Sci-Fi', id: '5' },
];

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
                return _.find(books, {id: args.id});
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});