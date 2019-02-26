const express = require('express');
const graphqlHTTP = require('express-graphql');

const server = express();

server.use('/graphql', graphqlHTTP({

}));


server.listen(4000, () =>{
    console.log('listening on 4000 port');
});