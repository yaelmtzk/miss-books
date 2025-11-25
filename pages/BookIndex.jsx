import { bookService } from "../services/book.service.js"
import { BookList } from "../cmps/BookList.jsx"
import { BookFilter } from "../cmps/BookFilter.jsx"
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

const { useState, useEffect } = React
const { Link } = ReactRouterDOM

export function BookIndex() {
    const [books, setBooks] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

    useEffect(() => {
        loadBooks()
    }, [filterBy])

    function loadBooks() {
        bookService.query(filterBy)
            .then(setBooks)
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('No books found')
            })
    }

    function onRemoveBook(bookId) {
        bookService.remove(bookId)
            .then(() => {
                setBooks(books => (
                    books.filter(book => book.id !== bookId)
                ))
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg(`Couldn't remove book`)
                navigate('/index')
            })
            .finally(() => {
                console.log('finally');
                showSuccessMsg('Book successfully removed!')                
            })
    }

    function onSetFilter(newFilterBy) {
        setFilterBy(filterBy => ({ ...filterBy, ...newFilterBy }))
    }

    if (!books) return <div>Loading...</div>

    return (
        <section className="book-index">
            <BookFilter
                defaultFilter={filterBy}
                onSetFilter={onSetFilter}
            />
            <div className="add-btn-section">
                <button className="add-btn">
                    <Link to="/index/edit">Add Book</Link>
                </button>
            </div>

            <BookList
                books={books}
                onRemoveBook={onRemoveBook}
            />
        </section>
    )
}