import { bookService } from "../services/book.service.js"
import { BookList } from "../cmps/BookList.jsx"
import { BookDetails } from "BookDetails.jsx"
import { BookFilter } from "../cmps/BookFilter.jsx"

const { useState, useEffect } = React

export function BookIndex() {
    const [books, setBooks] = useState(null)
    const [selectedBookId, setSelectedBookId] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())
    
    useEffect(() => {
        loadBooks()
    }, [filterBy])

    function loadBooks() {
        bookService.query(filterBy)
            .then(setBooks)
            .catch(err => {
                console.log('err:', err)
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
            })
    }

    function onSelectBookId(bookId) {
        setSelectedBookId(bookId)
    }

    function onSetFilter(newFilterBy) {
        setFilterBy(filterBy => ({ ...filterBy, ...newFilterBy }))
    }

    if (!books) return <div>Loading...</div>

    return (
        <section className="book-index">
            {!selectedBookId &&
                <React.Fragment>
                    <BookFilter
                        defaultFilter={filterBy}
                        onSetFilter={onSetFilter}
                    />
                    <BookList
                        books={books}
                        onRemoveBook={onRemoveBook}
                        onSelectBookId={onSelectBookId}
                    />
                </React.Fragment>
            }
            {selectedBookId &&
                <BookDetails
                    bookId={selectedBookId}
                    onBack={() => setSelectedBookId(null)}
                />
            }
        </section>
    )
}