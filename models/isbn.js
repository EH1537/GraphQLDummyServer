const mongoose = require('mongoose');
const Mongoose = require('mongoose').Mongoose;
const Schema = mongoose.Schema;
const urls = require('./urls')

const MONGO_URI = urls.isbn;

let mongooseISBN = new Mongoose();

mongooseISBN.connect(MONGO_URI, {
  // options for the connect method to parse the URI
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // sets the name of the DB that our collections are part of
  dbName: 'isbn'
})//
.then(()=>console.log('Connected to Mongo DB for ISBN (Google IN Belgium).'))
.catch(err=>console.log(err));


const isbnSchema = new Schema({
    isbn: String,
});

module.exports = mongooseISBN.model('ISBN', isbnSchema);
