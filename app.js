const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// allow cross-origin requests
app.use(cors());

app.use(express.static(path.join(__dirname, './client/public')));

app.get('/build/bundle.js', (req, res) => {
  console.log('in server.js');
  res.sendFile(path.join(__dirname, './build/bundle.js'));
});

// bind express with graphql
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4545, () => {
    console.log('now listening for requests on port 4545');
});
