import React from "react";
import { Link } from "react-router-dom";
import '../CardContainer/CardContainer.css';
import './playerCardContainer.css';
import ttsm from "../../images/ttsm.svg"

export default function PlayerCardContainer(props) {
  console.log("data", props.data)
  return (
    <>
      {props?.data?.length ?(
        props.data && Object.values(props.data).map((value,i)=>
        
          <div className="card_wrapper">
            
            <div className="card_container">
              <div className="left_side">
              <Link to = {"/profile/"+value?.id} key={i} className ="text-black text
               -decoration-none" > 
              <img
                height="100px"
                width="100px"
                  src={value?.image}
                  alt="playerimg"
                  className="rounded-circle"
                />
                </Link>
              </div>
              {/* <Link to = {"/profile/"+value?.id} key={i} className ="text-black text
               -decoration-none" > */}
              <div className="right_side">
                
              {props?.isDraw ? 
              
                
                <div className="d-flex justify-content-between">
                  <h5>{value?.name}</h5>
                 
                </div>
                :<h5>{value?.name}</h5>
              }
                <div className="card_dates">
                  <div><span className="text-muted">Gender:</span> {value?.gender} </div>
                  <div><span className="text-muted">email:</span> {value?.email}</div>
                  {/* <div className="button">
                  <input type="button" value="+" className="bg-danger border-0 h6 px-2 py-1 rounded-circle text-white" />
                  
                  </div> */}
                </div>
              </div>
             
            </div>
          </div>
        
      )):(
        <div className="empty_space text-secondary">
            You have not added any Players
            <Link className="btn btn-info mb-3 text-white" to="/add-player">Add Players</Link>
        </div>
      )}
    </>
  );
}