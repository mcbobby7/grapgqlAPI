const grapgql = require('graphql');
const _ = require('lodash')

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList } = grapgql;

// dummy data
var books = [
    {name: 'Name of the wind', genre: 'Sci-Fi', id: '1', authorId: '1' },
    {name: 'Chika obi', genre: 'Fantacy', id: '2', authorId: '1' },
    {name: 'Obi goes to school', genre: 'Fantacy', id: '3', authorId: '1' },
    {name: 'Ada is a girl', genre: 'Fantacy', id: '4', authorId: '2' },
    {name: 'The long earth', genre: 'Sci-Fi', id: '5', authorId: '2' },
    {name: 'The miz', genre: 'Sci-Fi', id: '6', authorId: '2' },
    {name: 'Quaker', genre: 'Sci-Fi', id: '7', authorId: '1' },
    {name: 'Kingdom man', genre: 'Sci-Fi', id: '8', authorId: '3' }
];

var authors = [
    {name: 'Mcbobby', age: '40', id: '1' },
    {name: 'Wong', age: '30', id: '2' },
    {name: 'Smiley', age: '32', id: '3' },
    {name: 'Miemie', age: '24', id: '4' },
    {name: 'Madu', age: '60', id: '5' }
];

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args){
                return _.find(authors, {id: parent.authorId});
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return _.filter(books, {authorId: parent.id});
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                //get data from DB 
                return _.find(books, {id: args.id});
            }
        },
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                //get data from DB 
                return _.find(authors, {id: args.id});
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});