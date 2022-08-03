const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cors = require('cors');
const app = express();
const userRoutes =  require('./routes/user-routes');
const BookData = require('./src/model/Bookdata');
// create application/json parser
const jsonParser = bodyParser.json()
const path = require('path')


app.use(express.static('./dist/frontend'))

mongoose.connect("mongodb+srv://adv:adv123@cluster0.iy6ncyz.mongodb.net/?retryWrites=true&w=majority/Books",
    (err) => {
        if(err) {
            console.log("Db not connecting ...");
        }else{
            console.log("Db connected")
        }
    });

    app.use(cors());
app.use(jsonParser);
app.use('/user', userRoutes)




app.post('/api/insert', function(req,res){
    console.log('app.js: L16', req.body);
   
    var book = {       
        bookId : req.body.book.bookId,
        bookName : req.body.book.bookName,
        bookCode : req.body.book.bookCode,
        releaseDate : req.body.book.releaseDate,
        description : req.body.book.description,
        price : req.body.book.price,
        starRating : req.body.book.starRating,
        imageUrl : req.body.book.imageUrl,
   }     
//    console.log('app.js: L28', book)  
   var newBook = new BookData(book);
   newBook.save()
    .then((book)=> {
        console.log('SUCCESS-->', book);
    }).catch((error)=> {
        console.log(error);
    });
});


app.get('/api/books',function(req,res){
    
    BookData.find()
                .then(function(books){
                    console.log('Get: All books')
                    res.send(books);
                });
});
app.get('/api/books/:id',  (req, res) => {
  
    const id = req.params.id;


    BookData.findOne({"_id":id})
    .then((book)=>{
        console.log(`Get: Edit ${book.bookName}, ${book.bookId}`);
        res.send(book);
    });
})


app.put('/api/books/update',(req,res)=>{
    console.log('Put: Editing to ->', req.body.bookName, req.body.bookId)
    id=req.body._id,
    bookId= req.body.bookId,
    bookName = req.body.bookName,
    bookCode = req.body.bookCode,
    releaseDate = req.body.releaseDate,
    description = req.body.description,
    price = req.body.price,
    starRating = req.body.starRating,
    imageUrl = req.body.imageUrl
   BookData.findByIdAndUpdate({"_id":id},
                                {$set:{"bookId":bookId,
                                "bookName":bookName,
                                "bookCode":bookCode,
                                "releaseDate":releaseDate,
                                "description":description,
                                "price":price,
                                "starRating":starRating,
                                "imageUrl":imageUrl}})
   .then(function(){
       res.send();
   })
 })


 app.delete('/api/remove/:id',(req,res)=>{
   
    id = req.params.id;
    BookData.findByIdAndDelete({"_id":id})
    .then(()=>{
        console.log('success')
        res.send();
    })
  }) 

  const PORT = process.env.PORT || 8080;
// const PORT = 8080

app.get('*/', function(req,res){
    res.sendFile(path.join(__dirname + '/dist/frontend/index.html'))
});


app.listen(PORT, ()=>{
    console.log(`listening to ${PORT}`);
});