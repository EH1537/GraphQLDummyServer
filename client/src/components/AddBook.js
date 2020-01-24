import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import flowright from "lodash.flowright";
import { getAuthorsQuery, addBookMutation, getBooksQuery, getISBNsQuery } from '../queries/queries';

class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      genre: '',
      authorId: '',
      isbnId: ''
    };
  }
  displayAuthors() {
    var data = this.props.getAuthorsQuery;
    if (data.loading) {
      return (<option disabled>Loading authors</option>);
    } else {
      return data.authors.map(author => {
        return (<option key={author.id} value={author.id}>{author.name}</option>);
      });
    }
  }
  displayISBNs() {
    var data = this.props.getISBNsQuery;
    if (data.loading) {
      return (<option disabled>Loading ISBNs</option>);
    } else {
      return data.isbns.map(isbn => {
        return (<option key={isbn.id} value={isbn.id}>{isbn.isbn}</option>);
      });
    }
  }
  submitForm(e) {
    e.preventDefault()
    // use the addBookMutation
    this.props.addBookMutation({
      variables: {
        name: this.state.name,
        genre: this.state.genre,
        authorId: this.state.authorId,
        isbnId: this.state.isbnId
      },
      refetchQueries: [{ query: getBooksQuery }]
    });
    this.setState({
      name: '',
      genre: '',
      authorId: '',
      isbnId: ''
    });
  }
  render() {
    return (
      <form id="add-book" onSubmit={this.submitForm.bind(this)} >
        <div className="field">
          <label>Book name:</label>
          <input type="text"
            onChange={(e) => this.setState({ name: e.target.value })}
            value={this.state.name}
          />
        </div>
        <div className="field">
          <label>Genre:</label>
          <input type="text"
            onChange={(e) => this.setState({ genre: e.target.value })}
            value={this.state.genre}
          />
        </div>
        <div className="field">
          <label>Author:</label>
          <select onChange={(e) => this.setState({ authorId: e.target.value })} value={this.state.authorId}>
            <option>Select author</option>
            {this.displayAuthors()}
          </select>
        </div>
        <div className="field">
          <label>ISBN:</label>
          <select onChange={(e) => this.setState({ isbnId: e.target.value })} value={this.state.isbnId}>
            <option>Select author</option>
            {this.displayISBNs()}
          </select>
        </div>
        <button>Add Book</button>
      </form>
    );
  }
}

export default flowright(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(getISBNsQuery, {name: "getISBNsQuery"}),
  graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);