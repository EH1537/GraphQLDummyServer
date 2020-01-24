import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import flowright from "lodash.flowright";
import { addAuthorMutation, getAuthorsQuery, addISBNMutation, getISBNsQuery } from '../queries/queries';

class AddISBN extends Component {
    constructor(props){
        super(props);
        this.state = {
            isbn: '',
        };
    }

    submitForm(e){
        e.preventDefault()
        // use the addBookMutation
        this.props.addISBNMutation({
            variables: {
                isbn: this.state.isbn,
            },
            refetchQueries: [{ query: getISBNsQuery }]
        });
        this.setState({
          isbn: '',
        })
    }
    render(){
        return(
            <form id="add-isbn" onSubmit={ this.submitForm.bind(this) } >
                <div className="field">
                    <label>ISBN Number:</label>
                    <input type="text" 
                    onChange={ (e) => this.setState({ isbn: e.target.value }) } 
                    value = {this.state.isbn}
                    />
                </div>
                <button>Add ISBN</button>
            </form>
        );
    }
}

export default flowright(
    graphql(getISBNsQuery, { name: "getISBNsQuery" }),
    graphql(addISBNMutation, { name: "addISBNMutation" })
)(AddISBN);