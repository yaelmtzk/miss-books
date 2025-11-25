import { bookService } from "../services/book.service.js"
import { LongTxt } from "../cmps/LongTxt.jsx"
import { showErrorMsg } from "../services/event-bus.service.js";
import { AddReview } from "../cmps/AddReview.jsx";
import { ReviewList } from "../cmps/ReviewList.jsx";


const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

export function BookDetails() {

    const [book, setBook] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isShowReviewModal, setIsShowReviewModal] = useState(null)
    const { bookId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadBook()
    }, [bookId])

    function loadBook() {
        bookService.get(bookId)
            .then(book => setBook(book))
            .catch(() => {
                showErrorMsg('Couldn\'t get book...')
                navigate(`/book`)
            })
            .finally(() => setIsLoading(false))
    }

    if (!book) return <div>Loading...</div>

    const { title, subtitle, id, description,
        pageCount, publishedDate, authors,
        listPrice: { amount, currencyCode } } = book

    function getBookYearStat() {
        const currYear = new Date().getFullYear()
        const diff = currYear - publishedDate
        if (diff > 10) return 'Vintage'
        if (diff < 1) return 'New'
    }
    function getReadLvl() {
        if (pageCount > 500) return 'Serious Reading'
        if (pageCount > 200) return 'Descent Reading'
        return 'Light Reading'
    }

    function getPriceColor() {
        if (amount > 150) return 'red'
        if (amount < 20) return 'green'
        return ''
    }

    function onToggleReviewModal() {
        setIsShowReviewModal((prevIsReviewModal) => !prevIsReviewModal)
    }

    function onSaveReview(reviewToAdd) {
        bookService.saveReview(book.id, reviewToAdd)
            .then((review => {
                setBook(book => ({
                    ...book,
                    reviews: [review, ...book.reviews]
                }))
            }))
            .catch(() => {
                showErrorMsg(`Review to ${book.title} Failed!`)
            })
    }

    function onRemoveReview(reviewId) {
        bookService.removeReview(book.id, reviewId)
            .then(() => {
                setBook(book => {
                    const filteredReviews = book.reviews.filter(review => review.id !== reviewId)
                    return { ...book, reviews: filteredReviews }
                })
            })
    }

    const loadingClass = isLoading ? 'loading' : ''

    return (
        <section className={`book-details container ${loadingClass}`}>
            <h1>{title}</h1>

            <h2>{subtitle}</h2>

            <img src={`../assets/img/${id}.jpg`}
                onError={(ev) => ev.target.src = '/assets/img/default.jpg'}
                alt="Book Image" />

            <p>Author: {authors}</p>

            <p className={getPriceColor()}>Price: {currencyCode} {amount}</p>

            <p>Published At: {`${publishedDate} - ${getBookYearStat()}`}</p>

            <p>Pages: {`${pageCount} - ${getReadLvl()}`}</p>

            <LongTxt txt={description} />

            <div className="btn-section">
                <button><Link to={`/index`}>Back</Link></button>
                <button ><Link to={`/index/edit/${book.id}`}>Edit</Link></button>
            </div>

            {/* <section>
                <button><Link to={`/index/${book.prevBookId}`}>Prev</Link></button>
                <button><Link to={`/index/${book.nextBookId}`}>Next</Link></button>
            </section> */}

            <button onClick={onToggleReviewModal}>Add Review</button>

            {isShowReviewModal && (
                <AddReview
                    toggleReview={onToggleReviewModal}
                    saveReview={onSaveReview}
                />
            )}

            <div className='review-container'>
                {book.reviews && <ReviewList reviews={book.reviews} onRemoveReview={onRemoveReview} />}
            </div>
        </section>
    )
}