import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button, Alert } from 'react-bootstrap';
import { Link, useHistory, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login } from "../../actions/auth";
import './login.css';
import {set_localStorage, get_localStorage} from '../../utils/localstorage'


export function Login(props) {
    const {register,handleSubmit,formState: { errors },getValues,clearErrors} = useForm();
    const [error, setError] = useState({ state: false, message: null })
    const dispatch = useDispatch();
    let user = useSelector(state => state.user)

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
      //compoment did update  when user get updated
      if(user.success){
        set_localStorage(user.data.data.token.access, "token");
        props.history.push('/player-profile')
      } else if(user.error){
        setError({state: true, 
          message: <Alert variant={'danger'} className="mb-2 w-100"> {user?.error}</Alert>})
          toggleAlert(5000)
      }
    }, [user])
  
    const loginSubmit = (data,e) => {
      setError({state: false, message: ''})
      e.preventDefault();
      //const {email, password} = getValues();
      dispatch(login(data?.email, data?.password))
    };
  
  // if (isLoggedIn) {
  //   return <Redirect to="/profile" />;
  // }
    return (
        <div className="loginform_container">
      <Form onSubmit={handleSubmit(loginSubmit)} className="loginForm">
        <h3 className="text-center mb-3">Login</h3>
        {error.state && <div>{error.message}</div>}

          <Form.Group controlId="formBasicEmail" className="mb-3 form_input">
          <Form.Control type="email" placeholder="Enter email" {...register("email", { required: true , pattern : /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/ })} />
{errors?.email?.type === "required" && <div className= "text-danger"> This Field Is Required </div>}

{errors?.email?.type === "pattern" && <div className= "text-danger"> Enter Valid Email </div>}  
            </Form.Group>

                    <Form.Group controlId="formBasicPassword" className="mb-3 form_input">
                        <Form.Control type="password" placeholder="Password" {...register("password", { required: true })} />

                        {errors?.password?.type === "required" && <div className= "text-danger"> This Field Is Required </div>}
                    </Form.Group>

                    <div className="fPass">
                      <Link to = "/forgot-password" className = "text-decoration-none">
                        <Form.Text className="text-primary">
                           Forgot Password?
                      </Form.Text>
                        </Link>
                    </div>

                    <div className="btnWrapper">
                        <Button type="submit" variant="primary" onClick = { ()=> clearErrors() }> Login</Button>
                    </div>
                    <p className="text-muted text-center">New Here? <Link to="/user-signup" className="text-decoration-none">Sign Up</Link></p>
                </Form>
            </div>
    )
}
export default Login;