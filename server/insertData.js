const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const BookModel = require("./model/BookModel");
const bookData = require("./data/book-data");

app.use(express.json());
app.use(cors());

mongoose.connect(
    "mongodb+srv://code1234:code1234@crud.kmviv.mongodb.net/FoodData?retryWrites=true&w=majority",
    { useNewUrlParser: true }
);

var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function() {
    console.log("Connection Successful!");
    bookData.map((item) => {
        const book = new BookModel(item);
        book.save();
    })
});

app.listen(3003, () => {
    console.log("server running on port3003");
});
