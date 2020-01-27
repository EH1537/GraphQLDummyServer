const mongoose = require('mongoose');
const Mongoose = require('mongoose').Mongoose;
const Schema = mongoose.Schema;
const urls = require('./urls');


const MONGO_URI = urls.books;


let mongooseBooks = new Mongoose();

mongooseBooks.connect(MONGO_URI, {
  // options for the connect method to parse the URI
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // sets the name of the DB that our collections are part of
  dbName: 'books'
})
.then(()=>console.log('Connected to Mongo DB for Books (AZURE IN California).'))
.catch(err=>console.log(err));


const bookSchema = new Schema({
    name: String,
    genre: String,
    authorId: String,
    isbnId: String
});

module.exports = mongooseBooks.model('Book', bookSchema);
