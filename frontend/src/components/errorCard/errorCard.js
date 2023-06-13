import React from 'react'

import "./errorCard.css"

export default function ErrorCard() {
    return (
        <>
         <div className="error-card-container">
             <div className="card-wrapper">
                <div className="error-card">
                    <h5>Error</h5>
                    <span>This action cannot be performed due to some technical problem. Please try again.</span>
                </div>
             </div>
             </div>   
        </>
    )
}
