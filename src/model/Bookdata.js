const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://adv:adv123@cluster0.iy6ncyz.mongodb.net/BooksDB?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((succ)=> {
    console.log('Connected to DB');
}).catch((err)=> {
    console.log('Error connecting to DB', err.message);
});


const Schema = mongoose.Schema;

var NewBookSchema = new Schema({
    bookId : Number,
    bookName : String,
    bookCode : String,
    releaseDate : String,
    description : String,
    price : Number,
    starRating :Number,
    imageUrl : String
});

var Bookdata = mongoose.model('book', NewBookSchema); 

module.exports = Bookdata;