
export function BookPreview({ book }) {
    const {title, id, subtitle, listPrice :{isOnSale}} = book
    return (
        <article className="book-preview">
            <img src={`../assets/img/${id}.jpg`} alt="Book Image" />
            {isOnSale && 
            (<span className="sale-badge">Sale</span>)}
           
            <h4>{title}</h4>
            <p>{subtitle}</p>
        </article>
    )
}