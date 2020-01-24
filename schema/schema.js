const graphql = require('graphql');
const Author = require('../models/author');
const Book = require('../models/book');
const ISBN = require('../models/isbn')
const _ = require('lodash');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const BookType = new GraphQLObjectType({ //we have a booktype, it takes in fields id, name, genre, and author
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType, //author is searched with its own resolver
      resolve(parent, args) {
        return Author.findById(parent.authorId);
      }
    },
    isbn: {
      type: ISBNType,
      resolve(parent, args) {
        return ISBN.findById(parent.isbnId)
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType), //book is searched with its own resolver
      resolve(parent, args) {
        return Book.find({ authorId: parent.id });
      }
    }
  })
});

const ISBNType = new GraphQLObjectType({
  name: 'ISBN',
  fields: () => ({
    id: { type: GraphQLID },
    isbn: { type: GraphQLString },
    book: {
      type: new GraphQLList(BookType), //book is searched with its own resolver
      resolve(parent, args) {
        return Book.findById({ isbn: parent.id });
      }
    }
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Book.findById(args.id); //our root querries, this one returns a singular book, using the id to find it
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Author.findById(args.id); //this on returns a singular author, using the ID
      }
    },
    isbn: {
      type: ISBNType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return ISBN.findById(args.id);
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return Book.find({}); //this one returns all books
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return Author.find({}); //this one returns all authors
      }
    },
    isbns: {
      type: new GraphQLList(ISBNType),
      resolve(parent, args) {
        return ISBN.find({});
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt }
      },
      resolve(parent, args) {
        console.log("in author maker") //adds an author with a name and age, auto assigns an id to tie together with books
        let author = new Author({
          name: args.name,
          age: args.age
        });
        return author.save();
      }
    },
    addISBN: {
      type: ISBNType,
      args: {
        isbn: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        console.log("in isbn maker")
        let isbn = new ISBN({
          isbn: args.isbn,
        });
        return isbn.save();
      }
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLID) },
        isbnId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        console.log("in book maker")
        let book = new Book({
          name: args.name,
          genre: args.genre,
          isbnId: args.isbnId,
          authorId: args.authorId //adds a book with authorId tied to it, much like a SQL foreign key (despite these being two mongo databasses)
        });
        return book.save();
      }
    },
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});