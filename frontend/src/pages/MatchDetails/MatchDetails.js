import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import HeaderSmall from "../../components/Header_small";
import userprofileimg from "../../images/userprofileimg.png";
import "../MatchDetails/matchDetails.css";

export default function MatchDetails() {
  return (
    <>
      <HeaderSmall headerTitle="Match" />
      <Container className="match_details">
        <Row>
          <Col className="left_match">
            <b>swati</b>
            <div className="user_img_container">
              <img
                src={userprofileimg}
                alt="user_profile_image"
                className="userProfileImg"
              />
            </div>
            <div className="score_container">7</div>
          </Col>
          <Col className="center_match">
            <div className="vl"></div>
            <div className="mid_match">v/s</div>
            <div className="set_container">
        <div className="set_score">
            <span className="p-2">7</span>
            <span className="p-2 fw-bold">Set 1</span>
            <span className="p-2">5</span>
        </div>
        <div className="set_score"><span className="p-2">-</span>
            <span className="p-2 fw-bold">Set 2</span>
            <span className="p-2">-</span></div>
        <div className="set_score">
        <span className="p-2">-</span>
            <span className="p-2 fw-bold">Set 3</span>
            <span className="p-2">-</span>
        </div>
        </div>
          </Col>
          <Col className="right_match">
            <b>mukesh</b>
            <div className="user_img_container">
              <img
                src={userprofileimg}
                alt="user_profile_image"
                className="userProfileImg"
              />
            </div>
            <div className="score_container">5</div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
