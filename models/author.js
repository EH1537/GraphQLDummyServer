const mongoose = require('mongoose');
const Mongoose = require('mongoose').Mongoose;
const Schema = mongoose.Schema;
const urls = require('./urls')

const MONGO_URL = urls.books;

let MongoAuthor = new Mongoose();

MongoAuthor.connect(MONGO_URL, {
  // options for the connect method to parse the URI
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // sets the name of the DB that our collections are part of
  dbName: 'authors'
})
.then(()=>console.log('Connected to Mongo DB for Authors. (AWS IN Virginia)'))
.catch(err=>console.log(err));


const authorSchema = new Schema({
    name: String,
    age: Number
});

module.exports = MongoAuthor.model('Author', authorSchema);
