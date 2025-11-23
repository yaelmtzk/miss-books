
export function BookPreview({ book }) {
    return (
        <article className="book-preview">
            <h4>{book.title}</h4>
            <p>{book.subtitle}</p>
            <img src={`../assets/img/${book.id}.jpg`} alt="Book Image" />
        </article>
    )
}