import { BookPreview } from "./BookPreview.jsx";

export function BookList({ books }) {

    return (
        <ul className="book-list container clean-list">
                {books.map(book => (
                    <li key={book.id}>
                    <BookPreview book={book} />
                    <section className="list-btns">
                        <button>
                            Remove
                        </button>
                        <button>
                            Details
                        </button>
                    </section>
                    </li>
                ))}
        </ul>
    )

}