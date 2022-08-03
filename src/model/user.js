const mongoose  = require('mongoose');
const Schema = mongoose.Schema;

mongoose.createConnection('mongodb+srv://adv:adv123@cluster0.iy6ncyz.mongodb.net/Books', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const userSchema = new Schema({
    firstname: {type:String, required: true},
    lastname: {type:String},
    email: {type:String, required: true},
    password: {type:String, required: true},
    date: {type:Number, required: true}
});

module.exports = mongoose.model('user', userSchema);