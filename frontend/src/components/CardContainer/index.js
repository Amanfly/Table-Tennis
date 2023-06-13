import React from "react";
import { Link } from "react-router-dom";
import "../CardContainer/CardContainer.css";
import ttsm from "../../images/ttsm.svg"
import { IMG_URL } from "../../constants/apiContants";

export default function CardContainer(props) {
  console.log(props.data)
  return (
    <>
      {props?.data?.length ?(
        props.data && Object.values(props.data).map((value,i)=>
       
        value?.status==props.type &&

         <div className ="tournament">

         <Link to = {"/tournament/details/"+value?.id} key={i} className ="text-black text-decoration-none" >
          <div className="card_wrapper">
            <div className="card_container">
              <div className="left_side">
                <img
                height="100px"
                width="100px"
                  src={value?.image}
                  alt="tournamentimg"
                  className="rounded-circle"
                />
              </div>


              <div className="right_side ">
                
                <h5>{value?.tournament_name}</h5>
                <div className="card_dates">
                  <div><span className="text-muted">Start Date:</span> {value?.start_date} </div>
                  <div><span className="text-muted">Last Date of registration:</span> {value?.registration_end_date}</div>
                </div>
              </div>
            </div>
          </div>
        </Link>
        </div>
      
      )):(
        <div className="text-center">No record found</div>
      )}
    </>
  );
}