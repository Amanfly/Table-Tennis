import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button, Alert } from 'react-bootstrap';
import { Link, useHistory, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import  {registers}  from '../../actions/auth';
import axios  from 'axios';
import {set_localStorage, get_localStorage} from '../../utils/localstorage'
import './signUp.css'

export function SignUp(props) { 
    const [ passwordVisible, setPasswordVisible ] = useState(false);
    const tooglePassword = () => {
      setPasswordVisible(!passwordVisible);
    }
    //const [successful, setSuccessful] = useState(false);
    const {register,handleSubmit,watch,formState: { errors },getValues,clearErrors} = useForm();
    const [error, setError] = useState({ state: false, message: null})
    const history = useHistory();
    const dispatch = useDispatch();
    let Auth = useSelector(state => state.Auth)

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
        console.log("AUTH",Auth.success)
        if(Auth.success){
            console.log("here")
            Error({state: true, 
                message: <Alert variant={'success'} className="mb-2 w-100"> Please check your email Id to verify your Email. </Alert>})
           
        } else if(Auth.error){
          setError({state: true, 
            message: <Alert variant={'danger'} className="mb-2 w-100"> {Auth?.error}</Alert>})
            toggleAlert(5000)
          }
    },[Auth])
  
  
    const signUpSubmit = (data,e) => {
      //{console.log(data)}
        e.preventDefault();
    //const { name, email, password, confirm_password, roles } = getValues();
    dispatch (registers(data?.name, data?.email, data?.Password, data?.confirmPassword, data?.roles))
    //.then(()=> {alert("Please Verify Your Email")})
  };
    return (
        <div className="signUp_container">
         
<Form onSubmit={handleSubmit(signUpSubmit)} className="signupForm">
          <h3 className="text-center mb-3 input_container">Sign Up</h3>
          {error.state && <div>{error.message}</div>}

          <Form.Group controlId="formBasicEmail" className="mb-3">
              <Form.Control type="text" placeholder="Name" {...register("name", { required: true, pattern : /^[a-zA-Z ]{2,30}$/ })} />

           {errors?.name?.type === "required" && <div className= "text-danger"> This Field Is Required </div>}

          </Form.Group>

          <Form.Group controlId="formBasicEmail" className="mb-3 input_container">
              <Form.Control type="email" placeholder="Email ID" {...register("email", { required: true, pattern : /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/  })} />
              {errors?.email?.type === "required" && <div className= "text-danger"> This Field Is Required </div>}

                  {errors?.email?.type === "pattern" && <div className= "text-danger"> Enter Valid Email </div>}  
          </Form.Group>

          <Form.Group controlId="formBasicType" className="mb-3 input_container">
    <Form.Text>Choose your role</Form.Text>
    <div className="checkWrapper">
      <div>
        <input
          type="checkbox"
          value="player"
          {...register("roles", {required: true})}
        />
      
        <label htmlFor="roles" className="text-secondary">
          Player
        </label>
      </div>
      <div>
        <input type="checkbox" value="admin" {...register("roles", {required: true})} />
        
        <label htmlFor="roles" className="text-secondary">
          {" "}
          Tournament Admin
        </label>
      </div>
      {errors?.roles?.type === "required" && <div className= "text-danger"> This Field Is Required </div>}
    </div>
  </Form.Group>

    <Form.Group controlId="formBasicPassword" className="input_container">
            
    <Form.Control type={passwordVisible ? "text" : "password" } placeholder="Password" {...register("Password", { required: true })}
      /> 
    {errors?.Password?.type === "required" && <div className= "text-danger" > This Field Is Required </div>}

            
    <Form.Control type="password" placeholder="Confirm Password" {...register("confirmPassword", { required: true , validate: (value) => value === watch("Password")})} className = "mt-3" />
      {errors?.confirmPassword?.type === "required" && <div className= "text-danger"> This Field Is Required </div>}

      {errors?.confirmPassword?.type === "validate" && <div className= "text-danger"> Password doesn't Match </div>}
          </Form.Group>

          <div className="btnWrapper">
              <Button type="submit" variant="primary" onClick = { ()=> clearErrors() }>Sign Up</Button>
          </div>
          <p className="text-center text-muted">Already have an account? <Link to="/user-login" className="text-decoration-none">Login</Link></p>
      </Form>
  </div>
)
}
export default SignUp;







 // (25) const { message } = useSelector((state) => state.messageReducer);
    //const [passwordVisible, setPasswordVisible] = useState(false);

    //(31) const tooglePassword = () => {
    // setPasswordVisible(!passwordVisible)

    //      .then(() => {
    //         setSuccessful(true);
    //       })
    //       .catch(() => {
    //         setSuccessful(false);
    //       });
    // 
    