import moment from "moment";

const defaultState = {
    Bookdata: [],
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
        action.data.sort((a, b) => {
            return a.BookId - b.BookId;
        });
        return {
            ...state,
            Bookdata: action.data,
            bookInLocalStorage: action.data
        }
    }
    if (action.type === 'handleChange') {
        return {
            ...state,
            inputValue: action.value,
        }
    }
    if (action.type === 'handleSearch') {
        const data = state.Bookdata.filter((item) => {
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
        const targetBook = state.bookInLocalStorage.filter((item) => {
            return item.BookId === action.value;
        })
        for (let i = 0; i < fieldData.length; i++) {
            if (fieldData[i].name[0] === "BookBoughtDate") {
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
        action.data.sort((a, b) => {
            return a.BookId - b.BookId;
        });
        return {
            ...state,
            Bookdata: action.data,
            bookInLocalStorage: action.data,
            isModalVisible: false,
        }
    }
    if (action.type === 'closeModal') {
        return {
            ...state,
            isModalVisible: false,
        }
    }
    if (action.type === "showAddModal") {
        return {
            ...state,
            isAddModalVisable: true,
        }
    }
    if (action.type === "closeAddModal") {
        return {
            ...state,
            isAddModalVisable: false,
        }
    }
    if (action.type === "addBook") {
        action.data.sort((a, b) => {
            return a.BookId - b.BookId;
        });
        console.log(action.data);
        return {
            ...state,
            Bookdata: action.data,
            bookInLocalStorage: action.data,
            isAddModalVisable: false,
        }
    }
    return state;
}