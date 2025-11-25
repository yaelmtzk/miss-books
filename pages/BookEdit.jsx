import { bookService } from "../services/book.service.js"
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'

const { useState, useEffect } = React
const { Link, useNavigate, useParams } = ReactRouterDOM

export function BookEdit() {

    const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const { bookId } = useParams()

    useEffect(() => {
        if (bookId) loadBook()
    }, [])

    function loadBook() {
        setIsLoading(true)
        bookService.get(bookId)
            .then(book => setBookToEdit(book))
            .catch(err => console.log('err:', err))
            .finally(() => setIsLoading(false))
    }

    function handleChange({ target }) {
        const { type, name: field } = target
        let { value } = target

        switch (type) {
            case 'range':
            case 'number':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break;
        }
        setBookToEdit(prevBook => ({ ...prevBook, [field]: value }))
    }

    function handlePriceAmountChange({ target }) {
        const { type, name: field } = target
        let { value } = target

        switch (type) {
            case 'range':
            case 'number':
                value = +value
                break;
            case 'checkbox':
                value = target.checked
                break;
        }
        setBookToEdit(prevBook => ({
            ...prevBook,
            listPrice: { ...prevBook.listPrice, [field]: value }
        }))
    }

    function onSaveBook(ev) {
        ev.preventDefault()
        bookService.save(bookToEdit)
            .then(savedBook => {
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg(`Couldn't save book`)
            })
            .finally(() => {
                showSuccessMsg('Book successfully saved!')
                navigate('/index')
            })
    }

    const {title, authors, listPrice,
        description, pageCount} = bookToEdit

    const loadingClass = isLoading ? 'loading' : ''
    return (
        <section className={`book-edit ${loadingClass}`}>
            <h1>{bookId ? 'Edit' : 'Add'} Book</h1>
            <form onSubmit={onSaveBook}>
                <label htmlFor="title">Title: </label>
                <input onChange={handleChange} value={title}
                    id='title' type="text" name='title' />

                <label htmlFor="authors">Authors: </label>
                <input onChange={handleChange} value={authors}
                    id='authors' type="text" name='authors' />

                <label htmlFor="price">Price: </label>
                <input onChange={handlePriceAmountChange} value={listPrice.amount}
                    id='price' type="number" name='amount' />

                <label htmlFor="description">Description: </label>
                <input onChange={handleChange} value={description}
                    id='description' type="text" name='description' />

                <label htmlFor="pages">Number of pages: </label>
                <input onChange={handleChange} value={pageCount}
                    id='pages' type="number" name='pageCount' />

                <label htmlFor="isOnSale">On Sale: </label>
                <input onChange={handlePriceAmountChange} checked={listPrice.isOnSale}
                    id='isOnSale' type="checkbox" name='isOnSale' />

                <section>
                    <button>Save</button>
                    <button type="button"><Link to="/index">Cancel</Link></button>
                </section>
            </form>
        </section>
    )
}