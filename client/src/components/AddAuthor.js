import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import flowright from "lodash.flowright";
import { addAuthorMutation, getAuthorsQuery } from '../queries/queries';

class AddAuthor extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            age: '',
        };
    }

    submitForm(e){
        e.preventDefault()
        // use the addBookMutation
        this.props.addAuthorMutation({
            variables: {
                name: this.state.name,
                age: this.state.age,
            },
            refetchQueries: [{ query: getAuthorsQuery }]
        });
        this.setState({
          name: '',
          age: '',
        })
    }
    render(){
        return(
            <form id="add-author" onSubmit={ this.submitForm.bind(this) } >
                <div className="field">
                    <label>Author name:</label>
                    <input type="text" 
                    onChange={ (e) => this.setState({ name: e.target.value }) } 
                    value = {this.state.name}
                    />
                </div>
                <div className="field">
                    <label>Age:</label>
                    <input type="text" 
                    onChange={ (e) => this.setState({ age: Number(e.target.value) }) }
                    value = {this.state.age}
                    />
                </div>
                <button>Add Author</button>
            </form>
        );
    }
}

export default flowright(
    graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
    graphql(addAuthorMutation, { name: "addAuthorMutation" })
)(AddAuthor);