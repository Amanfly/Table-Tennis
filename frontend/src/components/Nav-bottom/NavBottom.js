import React from 'react'

import { Navbar, Button } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';

// import tournamenticon from '../../images/tournamenticon.svg';
import playericon from '../../images/playericon.svg'
import usericon from '../../images/usericon.svg';
import './navBottom.css'

export default function NavBottom() {
    return (
        <Navbar expand="lg" className="shadow-sm navbar_btm">
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
        </Navbar>
    )
}