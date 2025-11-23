import { bookService } from "../services/book.service.js"

const { useState, useEffect } = React

export function BookDetails({ bookId, onBack }) {

    const [book, setBook] = useState(null)

    useEffect(() => {
        loadBook()
    }, [])

    function loadBook() {
        bookService.get(bookId)
            .then(book => setBook(book))
            .catch(err => {
                console.log('err:', err)
            })
    }

    if (!book) return <div>Loading...</div>
    const { title, subtitle } = book
    return (
        <section className="book-details container">
            <h1>{title}</h1>
            <h2>{subtitle}</h2>
            <img src={`../assets/img/${book.id}.jpg`} alt="Book Image" />
            <p>Author: {book.authors}</p>
            <p>Price {book.listPrice.currencyCode} {book.listPrice.amount}</p>
            <p>Published At: {book.publishedDate}</p>
            <p>{book.description}</p>
            <button onClick={onBack}>Back</button>
        </section>
    )
}