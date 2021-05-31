import { bookData } from "../data/book-data"

const defaultState = {
    inputValue: "",
    bookInLocalStorage: [],
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = defaultState, action) => {  
    if (action.type === "getBookData") {
        var data = JSON.parse(localStorage.getItem("books"));
        if(data === null) {
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
    if (action.type === 'deleteBook') {
        const books = JSON.parse(localStorage.getItem("books"));
        books.map((item, index) => {
            if (item.BookId === action.value) {
                books.splice(index, 1);
                localStorage.setItem("books", JSON.stringify(books));
            }
        })
        return {
            ...state,
           bookInLocalStorage: books,
        }
    }
    return state;
}