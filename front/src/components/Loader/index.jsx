import React from 'react'

const loader = ({ text = 'Loading' }) => {
    return (
        <div className="loader-bg">
            <div className="loader-track">
                <div className="loader-fill">{text}</div>
            </div>
        </div>
    )
}

export default loader
