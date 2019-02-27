const graphql = require('graphql');
const lo = require('lodash');
const {GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLID} = graphql;

//dummy data
let books = [
    {name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorID:'1'},
    {name: 'Digital Future', genre: 'Sci-FI', id: '2', authorID:'2'},
    {name: 'Storm of the Mind', genre: 'Drama', id: '3', authorID:'3'}
];

let authors = [
    {name: 'Patrick Rothfuss', age: 44, id: 1},
    {name: 'Brandon Sanderson', age: 32, id: 2},
    {name: 'Terry Pratchett', age: 55, id: 3}
];

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt}
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return lo.find(books, {id: args.id})
                //code to get data from db / other source
            }
        },
        author:{
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return _.find(authors, {id: args.id})
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});