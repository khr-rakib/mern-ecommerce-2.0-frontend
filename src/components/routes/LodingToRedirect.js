import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

const LodingToRedirect = () => {
    const [count, setCount] = useState(5)
    let history = useHistory()

    useEffect(() => {
        const interval = setInterval(() => {
            setCount(currentCount => --currentCount)
        }, 1000)

        count === 0 && history.push('/')
        // clean up interval
        return () => clearInterval(interval)

    }, [count])

    return (
        <div className="container p-5 text-center">
            <p>Redirect you in {count} seconds</p>
        </div>
    )
}

export default LodingToRedirect
