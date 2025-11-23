import { utilService } from 'util.service.js'
import { storageService } from 'async-storage.service.js'

const BOOKS_KEY = 'booksDB'
_createBooks()

export const booksService = {
    query,
    get,
    remove,
    save
}

function query() {
    return storageService.query(BOOKS_KEY)
}

function get(bookId) {
    return storageService.get(BOOKS_KEY, bookId)
}

function remove(bookId) {
    return storageService.remove(BOOKS_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOKS_KEY, book)
    } else {
        return storageService.post(BOOKS_KEY, book)
    }
}

function getEmptyBook(title = '') {
    return {
        id: '',
        title,
        description: "placerat nisi sodales suscipit tellus",
        thumbnail: '',
        listPrice: {
            "amount": 109,
            "currencyCode": "EUR",
            "isOnSale": false
        }
    }
}

function _createBooks() {
    let books = utilService.loadFromStorage(BOOKS_KEY)
    if (!books || !books.length) {
        books = [
            _createBook('The Tanakh'),
            _createBook('The Mishnah'),
            _createBook('Talmud Bavli'),
        ]
        utilService.saveToStorage(BOOKS_KEY, books)
    }
}

function _createBook(title, listPrice) {
    const book = getEmptyBook(title, listPrice)
    book.id = utilService.makeId()
    return book
}
