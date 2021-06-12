const experss = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = experss();
const BookModel = require('./model/BookModel');

app.use(experss.json());
app.use(cors());

mongoose.connect(
    "mongodb+srv://code1234:code1234@crud.kmviv.mongodb.net/FoodData?retryWrites=true&w=majority",
    { useNewUrlParser: true }
);

app.post('/read', async (req, res) => {
    BookModel.find({}, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
})

app.post('/insert', async (req, res) => {
    const newBook = new BookModel(req.body);
    await newBook.save();
    res.send("Success!");
})

app.put('/modify', async (req, res) => {
    try {
        BookModel.findOne({ BookId: req.body.BookId }, async(err, result) => {
            result.BookCategory = req.body.BookCategory;
            result.BookName = req.body.BookName;
            result.BookAuthor = req.body.BookAuthor;
            result.BookBoughtDate = req.body.BookBoughtDate;
            result.BookPublisher = req.body.BookPublisher;
            result.save();
            res.send(result);
        });
    } catch {
        res.send(err);
    }
})

app.delete("/delete/:id", async (req, res) => {
    await BookModel.findOneAndDelete({BookId: req.params.id}, (err, result) => {
        if (err)
            res.send(err);
        else 
            res.send("success");
    });
})

app.listen(3001, () => {
    console.log("server running on port3001");
});