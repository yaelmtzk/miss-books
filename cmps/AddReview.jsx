import { bookService } from "../services/book.service.js"
import { StarRating } from "dynamic-inputs/StarRating.jsx"

const { useState, useRef, useEffect } = React

export function AddReview({ saveReview, toggleReview }) {
    const [review, setReview] = useState(bookService.getEmptyReview())

    function onAddReview(ev) {
        ev.preventDefault()
        review.date = new Date(review.date).getTime()
        saveReview(review)
        toggleReview()
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

        setReview((prevReview) => ({ ...prevReview, [field]: value }))
    }

    const { fullName, date, txt, rating } = review
    return (
        <section onClick={toggleReview} className='review-add'>
            <div className='review-modal'>
                <form onClick={ev => ev.stopPropagation()} onSubmit={onAddReview} className='review-form'>

                    <h1>Add review</h1>

                    <button className='btn-toggle-modal' onClick={toggleReview}>X</button>

                    <input
                        autoFocus
                        placeholder='Enter your name'
                        name='fullName'
                        type='text'
                        id='fullname'
                        value={fullName}
                        onChange={handleChange}
                        autoComplete='off'
                    />

                    <input
                        type='date'
                        id='date'
                        name='date'
                        value={new Date(date).toISOString().slice(0, 10)}
                        onChange={handleChange}
                    />

                    <StarRating value={rating} onChange={handleChange} />

                    <textarea
                        name='txt'
                        cols='30'
                        rows='10'
                        value={txt}
                        onChange={handleChange}
                    />
                    <button>Save</button>

                </form>
            </div>
        </section>
    )
}


