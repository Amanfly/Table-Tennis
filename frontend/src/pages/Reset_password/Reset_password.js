import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button, Alert } from 'react-bootstrap';
import { Link, useHistory, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import '../Reset_password/Reset_password.css';
import { resetPassword } from '../../actions/auth';
import {set_localStorage, get_localStorage} from '../../utils/localstorage'

export default function ResetPassword(props) {
  const [ passwordVisible, setPasswordVisible ] = useState(false);
  const tooglePassword = () => {
    setPasswordVisible(!passwordVisible)};
    //const {register, handleSubmit} = useForm();
    const {register,handleSubmit,watch,formState: { errors },getValues,clearErrors} = useForm();
    const [error, setError] = useState({ state: false, message: null })
    const [token, setToken] = useState('')
    const history = useHistory();
    const dispatch = useDispatch();
    let reset = useSelector(state => state.reset)

   

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
       else{
       setToken(props.match.params.id)
       }
    }, [])

    useEffect(()=>{
      console.log("reset",reset.success)
      if(reset.success){
          console.log("here")
          setError({state: true, 
              message: <Alert variant={'success'} className="mb-2 w-100"> Password changed Successfully,Please Login to continue</Alert>})
         
      } else if(reset.error){
        setError({state: true, 
          message: <Alert variant={'danger'} className="mb-2 w-100"> {reset?.error}</Alert>})
          toggleAlert(5000)
      }
  },[reset])
    const resetSubmit = (data,e) => {
      {console.log(data)}
      e.preventDefault();
      //const {password, confirm_password} = getValues();
      dispatch(resetPassword(data?.newPassword, data?.ConfirmPassword, token))
    };

    return (
    <>
     <div className = "app-body">
    

        <Form className="reset-pass-form" onSubmit={handleSubmit(resetSubmit)}>
        <h3 className="text-center mb-3">Reset Password</h3>
        
          {error.state && <div>{error.message}</div>}

            <Form.Control className="email-input mt-3"

            type={passwordVisible ? "text" : "password" } 
            placeholder="New Password"
            {...register("newPassword", { required: true })}
          />
          {errors?.newPassword?.type === "required" && <div className= "text-danger"> This Field Is Required </div>}


          <Form.Control
            className="email-input mt-3"  
            type={passwordVisible ? "text" : "password" }
            placeholder="Confirm Password"
            {...register("ConfirmPassword", { required: true, validate: (value) => value === watch("newPassword") })}
          />
          {errors?.ConfirmPassword?.type === "required" && <div className= "text-danger"> This Field Is Required </div>}

          {errors?.ConfirmPassword?.type === "validate" && <div className= "text-danger"> Password doesn't Match </div>}

          <Button type ="submit" variant="primary" onClick = { ()=> clearErrors() } className="reset-btn mt-4">Submit</Button>
          </Form>
          
      
      </div>
     
    </>
  );
  }
