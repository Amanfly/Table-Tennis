import React, {useEffect, useState} from 'react'

import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import {get_localStorage} from '../../utils/localstorage';
import {verify_email} from '../../actions/auth'
import { useSelector, useDispatch } from 'react-redux';

import '../Home/home.css'

export default function VerifyEmail(props) {
    const dispatch = useDispatch();
    let verify = useSelector(state => state.verify)

    const[isVerified, setIsVerified]= useState(false)
    useEffect(()=>{
        
        //compoment did mount
        let token = get_localStorage("token");
        if(token){
          props.history.push('/player-profile')
        } else {
            //dispatch api of verify mail
            dispatch (verify_email(props.match.params.id))
            
        }
      }, [])

      useEffect(()=>{
        console.log("verify",verify.success)
        if(verify.success){
            console.log("here")
            setIsVerified(true)
           
        } else if(verify.error){
            setIsVerified(false)
           
          }
    },[verify])

    return (
        <div className="indexWrapper">
           { isVerified ?
            <div className="btnContainer p-5 text-center">
                <h3 className="">Table Tennis pros</h3>
                <p>Your email is successfully verified.</p>
                <p> Please login to continue</p>
                <Link to="/user-login" className="btn btn-primary btn-lg mb-3 d-flex justify-content-center">Login</Link>
            </div> :
             <div className="btnContainer p-5 text-center">
                <h3 className="">Table Tennis pros</h3>
                <p>Invalid Token</p>
                
                <Link to="/" className="btn btn-primary btn-lg mb-3 d-flex justify-content-center">Home</Link>
            </div> 
           }
        </div>
    )
}
