import React from "react";
import userprofileimg from "../../images/userprofileimg.png";
import '../MatchCard/matchCard.css'

export default function MatchCard(props) {

  console.log(props.data)
  return (
    <>
    {props?.data?.length ?(
        props.data && Object.values(props.data).map((value,i)=>

      <div className="match_container">
        <div className="match_wrapper">
          <div className="match_left">
            <img src={value?.image} alt="playerimg" className="p_img" />
            <span className="mb-2 fw-bold">{value?.player1}</span>
          </div>
          <div className="col-sm-6 bg-light text-center m-auto">
          <span className="border rounded-circle bg-light">v/s</span>
        </div>
          <div className="match_right">
          <img src={value?.image} alt="playerimg" className="p_img" />
            <span className="mb-2 fw-bold">{value?.player2}</span>
          </div>
        </div>
      </div>

  )):<>
  </>
  }
 </>
 );
}