import React,{useEffect,useState} from "react";
import { useForm } from 'react-hook-form';
import { Form, Button, Alert } from 'react-bootstrap';
import HeaderSmall from "../../components/Header_small";
import addimage from "../../images/addimage.svg";
import "../PlayerProfile/playerProfile.css";
import { useSelector, useDispatch } from 'react-redux';
import {set_localStorage, get_localStorage} from '../../utils/localstorage'
import { Link } from "react-router-dom";
import NavBottom from "../../components/Nav-bottom/NavBottom";
import Header from "../../components/Header";
import {  profileData } from "../../actions/profile";

export default function PlayerProfile(props) {
  const dispatch = useDispatch();
  const [image, setImage] = useState(addimage);
  const [preview, setPreview] = useState(addimage)
  let profile = useSelector(state => state.profile)
const [profileDetail, setProfileDetail] = useState({})
const [error, setError] = useState({ state: false, message: null})

  useEffect(()=>{
    //compoment did mount
    setError({state: false, message: ''})
    let token = get_localStorage("token");
    if(!token){
      props.history.push('/')
    } else{
      dispatch(profileData())
    }
  }, [])

  useEffect(()=>{
   
    if(profile.success){
        console.log("here")
        setProfileDetail(profile.data)
       
    } else if(profile.error){
      setError({state: true, 
      message: <Alert variant={'danger'} className="mb-2 w-100">Opps! Something went Wrong.</Alert>})
      }
},[profile])

const handleUpload = (e) => {
  console.log(e.target.files[0]);
  setPreview(URL.createObjectURL(e.target.files[0]));
  setImage(e.target.files[0]);
  console.log(image);
};


console.log(profileDetail)
  return (
    <>
      <div className="full_header">
        <Header />
      </div>
      <div className="mobile_header">
        <HeaderSmall headerTitle="My Profile" />
      </div>
      <div className="player_profile_container">
        <div className="cover_background"></div>
        <div className="user_details_container">
         
          <div className= "image_coverup">
          <img src={preview} alt="addimage"
          height="100px" 
          width="100px"
           background-color="rgb(226, 225, 225)"
           padding="20px"
           border-radius= "10px"
           box-shadow="0px 0px 15px -10px rgba(0, 0, 0, 0.75)"
           className="img_preview" />
          <input
            type="file"
            id="image-upload"
            accept="image/*"
            name = "image"
            onChange={(e)=> handleUpload(e)}
            //defaultValue={profileDetail?.data?.image}
          />
          </div>
          <label htmlFor="image-upload" className="image-button">
            Add Photo
          </label>
        
          <div className="mt-4 p-2 fw-bold">{profileDetail?.data?.name || '--'} </div>
          <div className="mt-2 p-2 mb-3">{profileDetail?.data?.email || '--'} </div>
          <Link  to={"/edit-player/"+profileDetail?.data?.id} className="text-decoration-none">
            {/* change the url */}
            Add More Details
          </Link>

        </div>
      </div>
      <div className="nav_mobile">
      <NavBottom />
      </div>
    </>
  );
}
