import React from 'react'
import "../assets/css/loading.css"
const LoadingScreen = () => {
    return (
        <div className='loader-container'>
            <div className="loader">
                <div className="inner one"></div>
                <div className="inner two"></div>
                <div className="inner three"></div>
            </div>
        </div>
    )
}

export default LoadingScreen