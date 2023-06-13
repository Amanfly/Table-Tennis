import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import Footer from '../../Footer'
import '../pageNotFound/pageNotFound.css'

export default function PageNotFound() {
    return (
        <div className="not_found_container">
           
            <div className="not_found_wrapper">
                <h1>404</h1>
                <span className="text-secondary h5 fw-normal">Page Not Found</span>
                <span className="h6 fw-normal">The page you are looking for does not exist or an error occured.</span>
                <div className="not_found_btns">
                    <Link to="/">
                    <Button variant="outline-secondary">
                        Go to Home
                    </Button>
                    </Link>
                </div>
            </div>
      <Footer />
        </div>
    )
}
