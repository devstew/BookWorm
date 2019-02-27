const graphql = require('graphql');
const lo = require('lodash');
const {
    GraphQLObjectType,
    GraphQLString, GraphQLInt,
    GraphQLSchema,
    GraphQLID,
    GraphQLList
} = graphql;

//dummy data
let books = [
    {name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorID: '1'},
    {name: 'Digital Future', genre: 'Sci-FI', id: '2', authorID: '2'},
    {name: 'Storm of the Mind', genre: 'Drama', id: '3', authorID: '3'},
    {name: 'Shipper', genre: 'Fantasy', id: '4', authorID: '1'},
    {name: 'E-builder', genre: 'Sci-FI', id: '5', authorID: '2'},
    {name: 'Digitalist', genre: 'Drama', id: '6', authorID: '3'}
];

let authors = [
    {name: 'Patrick Rothfuss', age: 44, id: '1'},
    {name: 'Brandon Sanderson', age: 32, id: '2'},
    {name: 'Terry Pratchett', age: 55, id: '3'}
];

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return lo.filter(books,{authorID: parent.id});
            }
        }
    })
});

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent, args) {
                console.log(parent);
                return lo.find(authors, {id: parent.authorID})
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
            resolve(parent, args) {
                return lo.find(books, {id: args.id})
                //code to get data from db / other source
            }
        },
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return lo.find(authors, {id: args.id})
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});