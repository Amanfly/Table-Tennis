import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button, Alert } from 'react-bootstrap';
import { Link, useHistory, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import '../forgot password/forgotPassword.css'
import { forgotPassword } from '../../actions/auth';
import {set_localStorage, get_localStorage} from '../../utils/localstorage'

export default function ForgotPassword(props) {
    //const {register, handleSubmit} = useForm();
     const {register,handleSubmit,formState: { errors },getValues,clearErrors} = useForm();
     const [error, setError] = useState({ state: false, message: null})
      const history = useHistory();
      const dispatch = useDispatch();
      let forgot = useSelector(state => state.forgot)

      const toggleAlert = interval =>{ 
        setTimeout(()=>{
          setError({ state:false, message:""})
        }, interval)
      }
  
      useEffect(()=>{
        //compoment did mount
        setError({state: false, message: ''})
        let token = get_localStorage("token");
        if(token){
          props.history.push('/player-profile')
        }
      }, [])
  
     
      useEffect(()=>{
        console.log("forgot",forgot.success)
        if(forgot.success){
            console.log("here")
            setError({state: true, 
                message: <Alert variant={'success'} className="mb-2 w-100"> Reset password link has been sent to your email id.</Alert>})
           
        } else if(forgot.error){
          setError({state: true, 
            message: <Alert variant={'danger'} className="mb-2 w-100"> {forgot?.error}</Alert>})
            toggleAlert(5000)
        }
    },[forgot])
    
      const forgotSubmit = (data,e) => {
        e.preventDefault();
        //const {email} = getValues();
        dispatch(forgotPassword(data?.email))
      };
    
  return (
    <>
     <div className = "app-body">
     
      <Form className="forgot-pass-form" onSubmit={handleSubmit(forgotSubmit)}>
      <h3 className="text-center mb-3">Forgot Password</h3>
        
          {error.state && <div>{error.message}</div>}
          <Form.Control
            type="email"
            className="email-input mt-3"
            placeholder="Email ID"
            {...register("email", { required: true, pattern : /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/ })}
          />
          {errors?.email?.type === "required" && <div className= "text-danger"> This Field Is Required </div>}

          {errors?.email?.type === "pattern" && <div className= "text-danger"> Enter Valid Email </div>} 

          <Button type = "submit" variant="primary" onClick = { ()=> clearErrors() }className="reset-btn-lg mb-3 mt-4 d-flex justify-content-center">Submit</Button>
          </Form>
          
      
      </div>
      
      
    </>
  
  );
}
