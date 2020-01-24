const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// allow cross-origin requests
app.use(cors());

app.use(express.static(path.join(__dirname, './client/public')));  //serving anythin in the public folder as needed

app.get('/build/bundle.js', (req, res) => {
  console.log('in server.js');
  res.sendFile(path.join(__dirname, './build/bundle.js'));  //servering the bundle
});

// bind express with graphql
app.use('/graphql', graphqlHTTP({  //this is ht eexpress graphql middleware, it takes in the schema, and if we navigate straight 
    //to http://localhost:4545/graphql, we get the graphiql canned UI
    schema,
    graphiql: true
}));

app.listen(4545, () => {
    console.log('now listening for requests on port 4545');
});
