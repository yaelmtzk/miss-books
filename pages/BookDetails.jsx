import { bookService } from "../services/book.service.js"
import { LongTxt } from "../cmps/LongTxt.jsx"

const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

export function BookDetails() {

    const [book, setBook] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const { bookId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadBook()
    }, [bookId])

    function loadBook() {
        bookService.get(bookId)
            .then(book => setBook(book))
            .catch(err => {
                console.log('err:', err)
            })
            .finally(() => setIsLoading(false))
    }

    function onBack() {
        navigate('/index')
    }

    if (!book) return <div>Loading...</div>

    const { title, subtitle, id, description,
        pageCount, publishedDate, authors,
        listPrice: { amount, currencyCode } } = book

    let readingLvl
    if (pageCount > 500) readingLvl = 'Serious Reading'
    else if (pageCount > 200) readingLvl = 'Decent Reading'
    else readingLvl = 'Light Reading'

    const currYear = new Date().getFullYear()
    let publishStat = ''
    if (currYear - publishedDate > 10) publishStat = 'Vintage'
    else if (currYear - publishedDate < 1) publishStat = 'New'

    let priceClass = ''
    if (amount > 150) priceClass = 'red'
    else if (amount < 20) priceClass = 'green'

    const loadingClass = isLoading ? 'loading' : ''

    return (
        <section className={`book-details container ${loadingClass}`}>
            <h1>{title}</h1>
            <h2>{subtitle}</h2>
            <img src={`../assets/img/${id}.jpg`}
                onError={(ev) => ev.target.src = '/assets/img/default.jpg'}
                alt="Book Image" />
            <p>Author: {authors}</p>
            <p className={priceClass}>Price: {currencyCode} {amount}</p>
            <p>Published At: {`${publishedDate} - ${publishStat}`}</p>
            <p>Pages: {`${pageCount} - ${readingLvl}`}</p>

            <LongTxt txt={description} />
            <div className="btn-section">
                <button onClick={onBack}>Back</button>
                <button ><Link to={`/index/edit/${book.id}`}>Edit</Link></button>
            </div>

            {/* <section>
                <button><Link to={`/index/${book.prevBookId}`}>Prev</Link></button>
                <button><Link to={`/index/${book.nextBookId}`}>Next</Link></button>
            </section> */}
        </section>
    )
}