import React from 'react'

import { NavLink } from 'react-router-dom'

import '../Schedule/schedule.css'

export default function Schedule(props) { 
    return (
        <>
            <div className="btn_container w-50">
                <div className="btn_group w-100">
                <NavLink to="/tournament" className={props.active === 'ongoing' ? "btn_link_active btn_link text-white" : "btn_link"}>Ongoing</NavLink>
                <NavLink to="/tournament/upcoming"className={props.active === 'upcoming' ? "btn_link_active btn_link text-white" : "btn_link"}>Upcoming</NavLink>
                <NavLink to ="/tournament/previous" className={props.active === 'past' ? "btn_link_active btn_link text-white" : "btn_link"}>Previous</NavLink>
                </div>
            </div>
        </>
    )
}
