const mongoose  = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb+srv://adv:adv123@cluster0.iy6ncyz.mongodb.net/BooksDB?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((succ)=> {
    console.log('Connected to DB');
}).catch((err)=> {
    console.log('Error connecting to DB', err.message);
});

const userSchema = new Schema({
    firstname: {type:String, required: true},
    lastname: {type:String},
    email: {type:String, required: true},
    password: {type:String, required: true},
    date: {type:Number, required: true}
});

module.exports = mongoose.model('user', userSchema);