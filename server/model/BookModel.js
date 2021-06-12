const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    BookId: {
        type: Number,
        required: true,
    },
    BookCategory: {
        type: String,
        required: true,
    },
    BookName: {
        type: String,
        required: true,
    },
    BookAuthor: {
        type: String,
        required: true,
    },
    BookBoughtDate: {
        type: String,
        required: true,
    },
    BookPublisher: {
        type: String,
        required: true,
    }
})

const Book = mongoose.model("BookData", BookSchema);
module.exports = Book;