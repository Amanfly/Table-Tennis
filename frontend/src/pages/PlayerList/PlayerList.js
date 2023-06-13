import React,{useEffect,useState} from 'react'
import NavBottom from '../../components/Nav-bottom/NavBottom'
import { useSelector, useDispatch } from 'react-redux';
import { get_localStorage } from "../../utils/localstorage";
import './playerList.css'
import { Button } from 'react-bootstrap'
import { Row, Col } from "react-bootstrap";
import { Link } from 'react-router-dom'
import Header from '../../components/Header'
import PlayerCardContainer from '../../components/playerCardContainer/index'
import {listPlayer} from "../../actions/profile"

export default function PlayerList(props) {
    
    const dispatch = useDispatch();
    const [playerList, setPlayerList] = useState({});
    let list = useSelector(state => state.player.listPlayer)
   
    useEffect(()=>{
      //compoment did mount
      let token = get_localStorage("token");
      if(!token){
        props.history.push('/')
      } else{
        dispatch(listPlayer())
      }
    }, []) 
  
    useEffect(()=>{
    if(list.success){
        setPlayerList(list?.data?.results)
      }
    }, [list])
    console.log(playerList)
  
 return (
      <>
      <Header />
      <div className= "bgwrapper" >
      <h3 className="d-flex justify-content-center m-5">Players </h3>
      {/* <Row>
        <Col xs={9} className="d-flex justify-content-end">
        <Link className="btn btn-info mb-3 text-white " to="/add-player">Add Player</Link>
        </Col>
      </Row> */}
 <div className="btn-side">
        <Link className="text-decoration-none text-white" to="/add-player" title="Add Player">+</Link>
      </div>
     
     
      <PlayerCardContainer data={playerList} />
      </div>
      </>
    )
}
