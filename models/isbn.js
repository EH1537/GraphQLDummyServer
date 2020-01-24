const mongoose = require('mongoose');
const Mongoose = require('mongoose').Mongoose;
const Schema = mongoose.Schema;

// const MONGO_URI = "mongodb+srv://admin:ilovetesting@cluster0-lpc8k.azure.mongodb.net/test?retryWrites=true&w=majority"
const MONGO_URI = "mongodb+srv://admin:ilovetesting@cluster0-rcp2u.mongodb.net/test?retryWrites=true&w=majority"


let mongooseISBN = new Mongoose();

mongooseISBN.connect(MONGO_URI, {
  // options for the connect method to parse the URI
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // sets the name of the DB that our collections are part of
  dbName: 'isbn'
})
.then(()=>console.log('Connected to Mongo DB for ISBN (AWS IN Oregon).'))
.catch(err=>console.log(err));


const isbnSchema = new Schema({
    isbn: String,
});

module.exports = mongooseISBN.model('ISBN', isbnSchema);
