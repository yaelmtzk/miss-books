const { Link } = ReactRouterDOM

import { BookPreview } from "BookPreview.jsx";

export function BookList({ books, onRemoveBook }) {

    return (
        <div>
            <ul className="book-list container clean-list">
                {books.map(book => (
                    <li key={book.id}>
                    <BookPreview book={book} />
                    <section className="list-btns">
                        <button onClick={() => onRemoveBook(book.id)}>
                            Remove
                        </button>
                        <button >
                            <Link to={`/index/${book.id}`}>Details</Link>
                        </button>
                    </section>
                    </li>
                ))} 
            </ul>
            {!books.length && <p className="no-books">No books found...</p>}
        </div>

    )

}