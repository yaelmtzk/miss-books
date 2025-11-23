import { BookPreview } from "./BookPreview.jsx";

export function BookList({ books, onRemoveBook, onSelectBookId }) {

    return (
        <ul className="book-list container clean-list">
                {books.map(book => (
                    <li key={book.id}>
                    <BookPreview book={book} />
                    <section className="list-btns">
                        <button onClick={() => onRemoveBook(book.id)}>
                            Remove
                        </button>
                        <button onClick={() => onSelectBookId(book.id)}>
                            Details
                        </button>
                    </section>
                    </li>
                ))}
        </ul>
    )

}