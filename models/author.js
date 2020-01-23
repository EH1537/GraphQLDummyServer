const mongoose = require('mongoose');
const Mongoose = require('mongoose').Mongoose;
const Schema = mongoose.Schema;

// const MONGO_URL = "mongodb+srv://admin:ilovetesting@cluster0-lpc8k.azure.mongodb.net/test?retryWrites=true&w=majority"


const MONGO_URL = "mongodb+srv://tester:ihatetesting@cluster1-u5iv6.mongodb.net/test?retryWrites=true&w=majority"

let mongooseIre = new Mongoose();

mongooseIre.connect(MONGO_URL, {
  // options for the connect method to parse the URI
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // sets the name of the DB that our collections are part of
  dbName: 'authors'
})
.then(()=>console.log('Connected to Mongo DB for Authors. (AWS IN Ireland)'))
.catch(err=>console.log(err));


const authorSchema = new Schema({
    name: String,
    age: Number
});

module.exports = mongooseIre.model('Author', authorSchema);
