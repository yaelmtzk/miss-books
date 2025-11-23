
export function BookList({ books }) {

    return (
        <tbody className="book-list container">
            {books.map(book => (
                <tr key={book.id}>
                    <td>{book.title} - {book.subtitle}</td>
                    <td className="list-btns">
                        <button>Remove</button>
                        <button>Details</button>
                    </td>
                </tr>
            ))}
        </tbody>
    )

}