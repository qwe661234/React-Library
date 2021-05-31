import moment from "moment";
import { bookData } from "../data/book-data"

const defaultState = {
    inputValue: "",
    bookInLocalStorage: [],
    isModalVisible: false,
    isAddModalVisable: false,
    targetBook: [{
        "name": [
            "BookId"
        ],
        "value": ""
    }, {
        "name": [
            "BookName"
        ],
        "value": ""
    }, {
        "name": [
            "BookAuthor"
        ],
        "value": ""
    }, {
        "name": [
            "BookBoughtDate"
        ],
        "value": ""
    }, {
        "name": [
            "BookCategory"
        ],
        "value": ""
    }, {
        "name": [
            "BookPublisher"
        ],
        "value": ""
    }],
}


// eslint-disable-next-line import/no-anonymous-default-export
export default (state = defaultState, action) => {
    if (action.type === "getBookData") {
        var data = JSON.parse(localStorage.getItem("books"));
        if (data === null) {
            data = bookData;
            localStorage.setItem("books", JSON.stringify(data));
        }
        return {
            ...state,
            bookInLocalStorage: data,
        }
    }
    if (action.type === 'handleChange') {
        return {
            ...state,
            inputValue: action.value,
        }
    }
    if (action.type === 'handleSearch') {
        const books = JSON.parse(localStorage.getItem("books"));
        const data = books.filter((item) => {
            return item.BookName.includes(state.inputValue);
        })
        return {
            ...state,
            bookInLocalStorage: data,
        }
    }
    if (action.type === 'showModal') {
        const fieldData = [{
            "name": [
                "BookId"
            ],
            "value": ""
        }, {
            "name": [
                "BookName"
            ],
            "value": ""
        }, {
            "name": [
                "BookAuthor"
            ],
            "value": ""
        }, {
            "name": [
                "BookBoughtDate"
            ],
            "value": ""
        }, {
            "name": [
                "BookCategory"
            ],
            "value": ""
        }, {
            "name": [
                "BookPublisher"
            ],
            "value": ""
        }]
        const books = JSON.parse(localStorage.getItem("books"));
        const targetBook = books.filter((item) => {
            return item.BookId === action.value;
        })
        for (let i = 0; i < fieldData.length; i++) {
            if(fieldData[i].name[0] === "BookBoughtDate") {
                fieldData[i].value = moment(targetBook[0][fieldData[i].name[0]], "YYYY-MM-DD");
            } else {
                fieldData[i].value = targetBook[0][fieldData[i].name[0]];
            }
            console.log(fieldData[i].name)
            
        }
        return {
            ...state,
            isModalVisible: true,
            targetBook: fieldData,
        }
    }
    if (action.type === 'submitForm') {
        action.data.BookBoughtDate = action.data.BookBoughtDate.format("YYYY-MM-DD");
        const books = JSON.parse(localStorage.getItem("books"));
        const targetBook = books.map((item, index) => {
            if (item.BookId === action.data.BookId) {
                books.splice(index, 1, action.data);
                localStorage.setItem("books", JSON.stringify(books));
            }
        })
        return {
            ...state,
            bookInLocalStorage: books, 
            isModalVisible: false,
        }
    }
    if (action.type === 'closeModal') {
        return {
            ...state,
            isModalVisible: false,
        }
    }
    if (action.type === 'deleteBook') {
        const books = JSON.parse(localStorage.getItem("books"));
        books.map((item, index) => {
            if (item.BookId === action.value) {
                books.splice(index, 1);
                localStorage.setItem("books", JSON.stringify(books));
            }
        })
        const data = books.filter((item) => {
            return item.BookName.includes(state.inputValue);
        })
        return {
            ...state,
            bookInLocalStorage: data,
        }
    }
    if(action.type === "showAddModal") {
        return {
            ...state,
            isAddModalVisable: true,
        }
    }
    if(action.type === "closeAddModal") {
        return {
            ...state,
            isAddModalVisable: false,
        }
    }
    if (action.type === "addBook") {
        const books = JSON.parse(localStorage.getItem("books"));
        const IdCount = books[books.length - 1].BookId;
        action.value.BookId = IdCount + 1;
        action.value.BookBoughtDate = action.value.BookBoughtDate.format("YYYY-MM-DD");
        books.push(action.value);
        localStorage.setItem("books", JSON.stringify(books));
        return {
            ...state,
            bookInLocalStorage: books,
            isAddModalVisable: false,
        }
    }
    return state;
}