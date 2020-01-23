import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

// components
import BookList from './components/BookList';
import AddBook from './components/AddBook';
import AddAuthor from './components/AddAuthor'

// apollo client setup
const client = new ApolloClient({
    uri: 'http://localhost:4545/graphql'
});

class App extends Component {
  render() {
    return (
        <ApolloProvider client={client}>
            <div id="main">
                <h1>Dummy's Reading List</h1>
                <BookList />
                <div><AddBook /></div>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <div><AddAuthor /></div>
            </div>
        </ApolloProvider>
    );
  }
}

export default App;