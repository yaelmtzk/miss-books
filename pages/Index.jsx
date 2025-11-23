import { bookService } from "../services/book.service.js"
import { BookList } from "../cmps/BookList.jsx"


const { useState, useEffect } = React

export function BookIndex() {
    const [books, setBooks] = useState(null)
    // 

    useEffect(() => {
        loadBooks()
    }, [])

    function loadBooks() {
        bookService.query()
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


    if (!books) return <div>Loading...</div>

    return (
        <section className="book-index">
            {<React.Fragment>
                <BookList
                    books={books}
                    onRemoveBook={onRemoveBook}
                />
            </React.Fragment>
            }
        </section>
    )

}