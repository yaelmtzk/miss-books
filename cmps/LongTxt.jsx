const { useState } = React

export function LongTxt({ txt, length = 100 }) {

    const [isShowFullTxt, setIsShowFullTxt] = useState(false)

    function onToggleIsShowFullTxt() {
        setIsShowFullTxt(isShowFullTxt => !isShowFullTxt)
    }

    const isLongerThanLimit = txt.length > length
    const textToShow = (isShowFullTxt || !isLongerThanLimit) ? txt : (txt.substring(0, length)) + '...'
    return (
        <section className="long-txt">
            <p className="txt">{textToShow} 
                <span>
                    {isLongerThanLimit &&
                        <a className="show-txt" onClick={onToggleIsShowFullTxt}>
                            {isShowFullTxt ? ' Show Less' : ' Read More'}
                        </a>
                    }
                </span>
            </p>

        </section>
    )
}