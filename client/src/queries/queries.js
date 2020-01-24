import { gql } from 'apollo-boost';

const getAuthorsQuery = gql`
    {
        authors {
            name
            id
        }
    }
`;

const getBooksQuery = gql`
    {
        books {
            name
            id
        }
    }
`;

const getISBNsQuery = gql`
    {
        isbns {
            isbn
            id
        }
    }
`;

const addBookMutation = gql`
    mutation AddBook($name: String!, $genre: String!, $authorId: ID!, $isbnId: ID!){
        addBook(name: $name, genre: $genre, authorId: $authorId, isbnId: $isbnId){
            name
            id
        }
    }
`;

const addAuthorMutation = gql`
    mutation AddAuthor($name: String!, $age: Int) {
      addAuthor(name: $name, age: $age){
        name
        id
     }
    }
`;

const addISBNMutation = gql`
    mutation addISBN($isbn: String!) {
      addISBN(isbn: $isbn){
        isbn
        id
     }
    }
`;


const getBookQuery = gql`
    query GetBook($id: ID){
        book(id: $id) {
            id
            name
            genre
            isbn {
              id
              isbn
            }
            author {
                id
                name
                age
                books {
                    name
                    id
                }
            }
        }
    }
`;

export { getAuthorsQuery, getBooksQuery, addBookMutation, getBookQuery, addAuthorMutation, getISBNsQuery, addISBNMutation };