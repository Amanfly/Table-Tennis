import React from 'react'
import { useHistory } from 'react-router-dom'
import './header_small.css'
import { AiOutlineArrowLeft, AiOutlineMore } from "react-icons/ai";

export default function HeaderSmall(props) {
    const history = useHistory();

    return (
        <> 
        <div className="header border shadow d-flex justify-content-between">
            <div className="btn btn-primary" onClick={() => history.goBack()} ><AiOutlineArrowLeft size="2em" color="black" />  Back</div>

            <div className="center-title">{props.headerTitle}</div>
            <div className="btn btn_btn-primary"><AiOutlineMore size="2em" color="black" />
            </div>
            {/* <div class="dropdown">
                    <span>Mouse over me</span>
                    <div class="dropdown-content">
                        <p>Hello World!</p>
                    </div> */}

        </div>
        </>
    )
}

