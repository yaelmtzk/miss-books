
export function StarRating({ value, onChange }) {

    const isEditable = typeof onChange === 'function'
    
    function onSetRating(rate) {
        if (!isEditable) return
        const target = { name: 'rating', value: rate };
        onChange({ target })
    }

    const editClass = isEditable ? 'edit' : ''

    return (
        <div className={`star-rating ${editClass}`} >
            {[...Array(5)].map((_, idx) => (
                <span
                    key={idx}
                    className={`star ${idx < value ? 'on' : 'off'}`}
                    onClick={() => onSetRating(idx + 1)}
                >
                    &#9733;
                </span>
            ))}
        </div>)
}