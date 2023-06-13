import React, {useState, useEffect} from "react";
import Header from "../../components/Header";
import { useSelector, useDispatch } from 'react-redux';
import {  getTournamentList } from "../../actions/tournamentActions/getTournament";
import { get_localStorage } from "../../utils/localstorage";
import Schedule from "../../components/Schedule";
import CardContainer from "../../components/CardContainer";

export default function UpcomingTournament(props) {

const dispatch = useDispatch();
const [tournamentList, setTournamentList] = useState([]);
let list = useSelector(state => state.tournament.listTournament)

useEffect(()=>{
  //compoment did mount
  let token = get_localStorage("token");
  if(!token){
    props.history.push('/')
  } else{
    dispatch(getTournamentList())
  }
}, [])

useEffect(()=>{
  if(list.success){
    setTournamentList(list?.data?.results)
  }
}, [list]) 
  return (
    <>
      <div className= "bgwrapper" >
      <Header />
      <h3 className="d-flex justify-content-center m-5">Tournaments</h3>
      <Schedule active="upcoming" />
      <div className = "ongoing">
      <CardContainer data={tournamentList} type="upcoming" />
      </div>
      </div>
    </>

  );
}
