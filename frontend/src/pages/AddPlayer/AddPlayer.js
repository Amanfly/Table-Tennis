import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button, Alert } from 'react-bootstrap';
import { Link, useHistory, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Footer from "../../components/Footer";
import addimage from "../../images/addimage.svg"
import "../AddPlayer/addPlayer.css";
import { get_localStorage } from "../../utils/localstorage";
import { addPlayer, getPlayer,updatePlayer } from '../../actions/profile';

export default function AddPlayer(props) {

  const {register,handleSubmit,formState: { errors },getValue,setValue,clearErrors} = useForm();
  const [error, setError] = useState({ state: false, message: null})
  const history = useHistory();
  const dispatch = useDispatch();
  const [image, setImage] = useState(addimage);
  const [preview, setPreview] = useState(addimage)
  let player = useSelector(state => state.player.addPlayer);
  let update = useSelector(state => state.player.updatePlayer);
  const [profileDetail, setProfileDetail] = useState({});
  let profile = useSelector(state => state.player.getPlayer);

  const toggleAlert = interval =>{ 
    setTimeout(()=>{
      setError({ state:false, message:""})
    }, interval)
  }
  useEffect(()=>{
      //compoment did mount
      setError({state: false, message: ''})
      let token = get_localStorage("token");
      if(!token){
        props.history.push('/')
      }
    }, [])
    useEffect(()=>{
      if(profile.success){
          //console.log("here")
          setProfileDetail(profile?.data)
      }
    },[profile])

    useEffect(() => {
      if(profileDetail?.data)
      setValue("name",(profileDetail?.data?.name))
      setValue("email",(profileDetail?.data?.email))
      setValue("gender",(profileDetail?.data?.gender))
      setValue("age",(profileDetail?.data?.age))
    }, [profileDetail])
   

    useEffect(()=>{
      dispatch(getPlayer(props.match.params.id))
    }, [props.match.params.id])

    useEffect(()=>{
      console.log("AUTH",player)
      if(player.success){
        console.log("here")
        Error({state: true, 
            message: <Alert variant={'success'} className="mb-2 w-100"> Player Added Successfully </Alert>})
            props.history.push("/")
         
      } else if(player.error){
        setError({state: true, 
          message: <Alert variant={'danger'} className="mb-2 w-100"> {player?.error}</Alert>})
          toggleAlert(5000)
        }
  },[player])

  useEffect(()=>{
    console.log("AUTH",update)
    if(update.success){
      console.log("here")
      Error({state: true, 
          message: <Alert variant={'success'} className="mb-2 w-100"> Player Updated Successfully </Alert>})
          props.history.push("/player-list")
       
    } else if(update.error){
      setError({state: true, 
        message: <Alert variant={'danger'} className="mb-2 w-100"> {update?.error}</Alert>})
        toggleAlert(5000)
      }
},[update])
  

  const handleUpload = (e) => {
    console.log(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
    setImage(e.target.files[0]);
    console.log(image);
  };
 
  const playerSubmit = (data,e) => {
        console.log("data", data)
        e.preventDefault();
        let formdata = new FormData()
        for (var key in data){
          formdata.append(key,data[key])
        }
        console.log("formdata", formdata)
        formdata.append("image",image)
        if(props.match.params.id){
          dispatch (updatePlayer(formdata, props.match.params.id))
        } else {
          dispatch (addPlayer(formdata))
        }
      };

  return (
    <div className="form_wrapper">
      <Form onSubmit={handleSubmit(playerSubmit)} className="form_container">
      {error.state && <div>{error.message}</div>}
      <h3 className="text-center mb-3">Add Player</h3>
       
      <Form.Group className="mb-3 image_con">
        <img src={profileDetail?.data?.image} alt="addimage" className="img_preview" />
          <input
            type="file"
            id="image-upload"
            accept="image/*"
            name = "image"
            onChange={(e)=> handleUpload(e)}
            //{...register("image")}
            defaultValue={profileDetail?.data?.image}
          />
          <label htmlFor="image-upload" className="image-button">
            Add Photo
          </label>
        </Form.Group>

        <Form.Group className="mb-3 input_container" controlId="formBasicName">
          <Form.Control
            type="text"
            placeholder="Name"
            className="form_input"
            {...register("name", { required: true })}
            value={profileDetail?.data?.name}
            />
           { errors?.name?.type === "required" && <div className= "text-danger"> This Field Is Required </div>}
          
        </Form.Group>
        <Form.Group className="mb-3 input_container" controlId="formBasicEmail">
          <Form.Control
            type="email"
            placeholder="Email ID"
            className="form_input"
            {...register("email", { required: true })}
            defaultValue={profileDetail?.data?.email}
          />
            { errors?.email?.type === "required" && <div className= "text-danger"> This Field Is Required </div>}
        </Form.Group>
        <Form.Group className="mb-3 select_container" controlId="formGenderSelect">
          <Form.Label className="mr-5">Gender: </Form.Label>
          <Form.Control as="select" className="select_btn" {...register("gender", {required:true})} defaultValue={profileDetail?.data?.gender}>
            <option>Choose</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Others">Others</option>
          </Form.Control>
          { errors?.gender?.type === "required" && <div className= "text-danger"> This Field Is Required </div>}
          {console.log({errors})} 
        </Form.Group>
        <Form.Group className="mb-3 input_container" controlId="formBasicEmail">
          <Form.Control
            type="number"
            placeholder="Age"
            className="form_input"
            {...register("age", { max: 49 })}
            defaultValue={profileDetail?.data?.age}
          />
            { errors?.age?.type === "required" && <div className= "text-danger"> This Field Is Required </div>}
        </Form.Group>
        <div className= "d-flex">
        <input className="btn btn-primary m-2" type="submit" value={props.match.params.id ? "Update" : "Save"} />
        <div className="btn btn-danger m-2" onClick = {()=>history.goBack()} > Cancel</div>
        </div>
      </Form>
      <div className="footer-optional">
        <Footer/>
      </div>
    </div>
  );
}
