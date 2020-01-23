const mongoose = require('mongoose');
const Mongoose = require('mongoose').Mongoose;
const Schema = mongoose.Schema;

// const MONGO_URI = "mongodb+srv://admin:ilovetesting@cluster0-lpc8k.azure.mongodb.net/test?retryWrites=true&w=majority"
const MONGO_URI = "mongodb+srv://admin:ilovetesting@cluster0-lpc8k.azure.mongodb.net/test?retryWrites=true&w=majority"


let mongooseVA = new Mongoose();

mongooseVA.connect(MONGO_URI, {
  // options for the connect method to parse the URI
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // sets the name of the DB that our collections are part of
  dbName: 'books'
})
.then(()=>console.log('Connected to Mongo DB for Books (AZURE IN VIRGINIA).'))
.catch(err=>console.log(err));


const bookSchema = new Schema({
    name: String,
    genre: String,
    authorId: String
});

module.exports = mongooseVA.model('Book', bookSchema);
