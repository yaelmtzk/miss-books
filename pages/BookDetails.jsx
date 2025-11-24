import { bookService } from "../services/book.service.js"
import { LongTxt } from "../cmps/LongTxt.jsx"

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
    const { title, subtitle, id, description, 
        pageCount, publishedDate, authors, 
        listPrice: {amount, currencyCode}} = book

    let readingLvl
    if (pageCount>500)  readingLvl = 'Serious Reading'
    else if (pageCount>200) readingLvl = 'Decent Reading'
    else readingLvl = 'Light Reading'
    
    const currYear = new Date().getFullYear()
    let publishStat = ''
    if (currYear - publishedDate>10)  publishStat = 'Vintage'
    else if (currYear - publishedDate < 1) readingLvl = 'New'

    return (
        <section className="book-details container">
            <h1>{title}</h1>
            <h2>{subtitle}</h2>
            <img src={`../assets/img/${id}.jpg`} alt="Book Image" />
            <p>Author: {authors}</p>
            <p>Price: {currencyCode} {amount}</p>
            <p>Published At: {publishedDate} - <span>{publishStat}</span></p>
            <p>Pages: {pageCount} - <span>{readingLvl}</span></p>
            <LongTxt txt={description} />
            <button onClick={onBack}>Back</button>
        </section>
    )
}