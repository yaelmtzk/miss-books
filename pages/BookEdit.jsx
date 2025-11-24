import { bookService } from "../services/book.service.js"

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
        let field = target.name
        let value = target.value
        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break
        }

        setBookToEdit(prevBook => {
            if (field === 'amount') {
                return {
                    ...prevBook,
                    listPrice: {...prevBook.listPrice, amount: value}
                }
            }
            return { ...prevBook, [field]: value }
        })

    }

    function onSaveBook(ev) {
        ev.preventDefault()
        bookService.save(bookToEdit)
            .then(savedBook => {
                console.log('savedBook:', savedBook)
                navigate('/index')
            })
            .catch(err => {
                console.log('err:', err)
            })
    }

    const { title, listPrice: { amount }, authors } = bookToEdit
    const loadingClass = isLoading ? 'loading' : ''
    return (
        <section className={`book-edit ${loadingClass}`}>
            <h1>{bookId ? 'Edit' : 'Add'} Book</h1>
            <form onSubmit={onSaveBook}>
                <label htmlFor="title">Title</label>
                <input onChange={handleChange} value={title} name="title" id="title" type="text" />

                <label htmlFor="price">Price</label>
                <input onChange={handleChange} value={amount || ''} name="amount" id="price" type="number" />

                <label htmlFor="authors">Author</label>
                <input onChange={handleChange} value={authors} name="authors" id="authors" type="text" />

                <section>
                    <button>Save</button>
                    <button type="button"><Link to="/index">Cancel</Link></button>
                </section>
            </form>
        </section>
    )
}