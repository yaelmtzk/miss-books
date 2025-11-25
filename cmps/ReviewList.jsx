import { ReviewPreview } from "ReviewPreview.jsx"

export function ReviewList({ reviews, onRemoveReview }) {

    return (
        <div className="review-list">
            {!!reviews.length && <h3>Users recommend:</h3>}
            {reviews.map(review =>
                <ReviewPreview
                    key={review.id}
                    review={review}
                    onRemoveReview={onRemoveReview}
                />
            )}
        </div>
    )
}