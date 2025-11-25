import { StarRating } from "dynamic-inputs/StarRating.jsx"


export function ReviewPreview({ review, onRemoveReview }) {
    const reviewDate = new Date(review.date).toLocaleDateString('he')
    return (
        <section className='review-details'>
            <div className="reviewer-name">{review.fullName}</div>
            <div className="date">{reviewDate}</div>
            {/* {!!review.rating && <div className="rate">{review.rating}</div>} */}
            {!!review.rating && <h4><StarRating value={review.rating} /></h4>}
            <p>{review.txt}</p>
            <button className="btn-remove-review" onClick={() => onRemoveReview(review.id)}>
                <i className="fa-regular fa-trash-can"></i>
            </button>
        </section>
    )
}