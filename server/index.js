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

app.listen(3001, () => {
    console.log("server running on port3001");
});