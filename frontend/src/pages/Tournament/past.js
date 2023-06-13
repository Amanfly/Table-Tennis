import React, {useState, useEffect} from "react";
import Header from "../../components/Header";
import Schedule from "../../components/Schedule";
import CardContainer from "../../components/CardContainer";
import { useSelector, useDispatch } from 'react-redux';
import {  getTournamentList } from "../../actions/tournamentActions/getTournament";
import { get_localStorage } from "../../utils/localstorage";

export default function PastTournament(props)
{
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
//console.log(list.data.results)


useEffect(()=>{
  if(list.success) {
    setTournamentList(list?.data?.results)
  }
}, [list]) 

  return (
    <>
     <div className= "bgwrapper" >
      <Header />
      <h3 className="d-flex justify-content-center m-5">Tournaments</h3>
      <Schedule active="past" />
      <div className = "ongoing">
      <CardContainer data={tournamentList} type="previous" />
      </div>
      </div>
    </>
  );
}
