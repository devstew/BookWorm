const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const server = express();

mongoose.connect('mongodb://stewie:pass1234@ds153974.mlab.com:53974/bookworm-graph');
mongoose.connection.once('open', () => {
    console.log('Connected to DB');
});

server.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));


server.listen(4000, () =>{
    console.log('listening on 4000 port');
});