import React from 'react'

import { Navbar, Button } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import playericon from '../../images/playericon.svg'
import usericon from '../../images/usericon.svg';
import '../Header/header.css';
import {logoutUser} from '../../utils/logout';
import {get_localStorage} from '../../utils/localstorage'

export default function Header(props) {
    const {success} = useSelector((state=>state.user))
    const logoutFun = () =>{
        console.log(props)
        let user = logoutUser();
        if(user){
            props.history.push('/')
        }
    }
    return (
        <div className ="headerwrapper">
        <Navbar expand="lg" className="shadow-sm navbar_container">
            <NavLink to="/tournament" exact activeClassName="active_class" className="navLink">
                {window.location.href.includes('tournament') ? <img src={require("../../images/tournamentIcon.png")} alt="icon" /> : <img src={require("../../images/tournamentIconUnSelected.png")} alt="icon" />}
                Tournaments
            </NavLink>
            <NavLink to="/player-list"  activeClassName="active_class" className="navLink">
                {window.location.href.includes('player-list') ? <img src={require("../../images/players-active.png")} alt="icon" /> : <img src={playericon} alt="icon" />} 
                Players
            </NavLink>
            <NavLink to="/Player-profile"  activeClassName="active_class" className="navLink">
                {window.location.href.includes('player-profile') ? <img src={require("../../images/profile-active.png")} alt="icon" /> : <img src={usericon} alt="icon" />} 
                My Profile
            </NavLink>
       
        {
            get_localStorage('token') ?
            <Link to="/user-login" className="home_link">
                <Button variant="outline-primary" size="sm" type="button" onClick={()=>logoutFun()} className="log_btn" >Logout</Button>
                </Link>
            :
            <Link to="/" className="home_link"><Button variant="primary" size="sm" className="log_btn">Login/Signup</Button></Link>
        }
        
         </Navbar>
         </div>
    )
}