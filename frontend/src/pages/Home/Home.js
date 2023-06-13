import React, {useEffect} from 'react'

import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import {get_localStorage} from '../../utils/localstorage';

import '../Home/home.css'

export default function Home(props) {
    useEffect(()=>{
        //compoment did mount
        let token = get_localStorage("token");
        if(token){
          props.history.push('/player-profile')
        }
    }, [])
    return (
        <div className="indexWrapper">
            <div className="btnContainer p-5">
                <h3 className="">Table Tennis pros</h3>
                <Link to="/user-login" className="btn btn-primary btn-lg mb-3 d-flex justify-content-center">Login</Link>
                <Link to="/user-signup" className="btn btn-outline-primary btn-lg d-flex justify-content-center">Sign Up</Link>
            </div>
        </div>
    )
}
