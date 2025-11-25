import { eventBusService } from '../services/event-bus.service.js'
const { useEffect, useState, useRef } = React

export function UserMsg() {
    const [msg, setMsg] = useState(null)
    const intervalIdRef = useRef()

    useEffect(() => {
        const unsubscribe = eventBusService.on('show-user-msg', (msg) => {
            setMsg(msg)
            intervalIdRef.current = setTimeout(() => {
                onCloseMsg()
            }, 2500);
        })

        return () => unsubscribe()

    }, [])

    function onCloseMsg() {
        clearTimeout(intervalIdRef.current)
        setMsg(null)
    }

    if (!msg) return null
    return (
        <div className={'user-msg ' + msg.type}>
            <p>{msg.txt}</p>
            <button onClick={onCloseMsg}>x</button>
        </div>
    )
}