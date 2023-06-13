import React,{useEffect,useState} from 'react'
import { Link } from "react-router-dom";
import {Alert} from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux';
import '../CardContainer/CardContainer.css';
import '../playerCardContainer/playerCardContainer.css';
import {addPlayerToTournaments} from "../../actions/tournamentActions/addPlayerToTournamentAction"
import { removePlayerFromTournament } from "../../actions/tournamentActions/removePlayerFromTournamentAction"


export default function CardDraw(props) {
  const dispatch = useDispatch();
  const [button, toogleButton] = useState(!props.is_added);
  const [selectedPlayer, setSelectedPlayer] = useState(props?.selectedPlayer)
  const [error, setError] = useState({ state: false, message: null})

  const addPlayer = useSelector(state => state.tournament.addPlayerToTournament)
  const removePlayer = useSelector(state => state.tournament.removePlayerFromTournament)

  const toggleAlert = interval =>{ 
    setTimeout(()=>{
      setError({ state:false, message:""})
    }, interval)
  }

  useEffect(()=>{
    console.log("addPlayer", addPlayer)
    if(addPlayer?.success){
      props.setSelectedPlayer(selectedPlayer)
    } else if(addPlayer?.error){
      setError({state: true, 
        message: <Alert variant={'danger'} className="mb-2 w-100"> {addPlayer?.error}</Alert>})
      toggleAlert(5000)
    }
  },[addPlayer])

  useEffect(()=>{
    if(removePlayer?.success){
      props.setSelectedPlayer(selectedPlayer)
    } else if(removePlayer?.error){
      setError({state: true, 
        message: <Alert variant={'danger'} className="mb-2 w-100"> {removePlayer?.error}</Alert>})
      toggleAlert(5000)
    }
  },[removePlayer])

  const tournamentId = localStorage.getItem('tournament_id')  

  const handleRemovePlayer = (id) => {
    let arr = selectedPlayer
    if(selectedPlayer.includes(id)){
      let index = selectedPlayer.indexOf(id)
      arr.splice(index, 1);
      setSelectedPlayer([...arr])
      dispatch(removePlayerFromTournament(tournamentId, id))
    }
  };

  const handleAddPlayer =(id) => {
    let arr = selectedPlayer
    if(!selectedPlayer.includes(id)){
      arr.push(id);
      setSelectedPlayer([...arr])
      dispatch(addPlayerToTournaments(tournamentId, id))
    } 
  }

  return (
    <>
      {props?.data?.length ?(<>
        {error.state && <div>{error.message}</div>}
        {props.data && Object.values(props.data).map((value,i)=>
        
          <div className="card_wrapper" key={i}>
            
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
                 <div className="button">
                  {selectedPlayer.includes(value?.id) || value?.is_added ? 
                  <input type="button" value="-" className="bg-info border-0 h6 px-2 py-1 rounded-circle text-white" onClick={(id) => handleRemovePlayer(value?.id)} />
                  :<input type="button" value="+" className="bg-danger border-0 h6 px-2 py-1 rounded-circle text-white" onClick={(id)=> handleAddPlayer(value?.id)} />}
                  </div> 
                </div>
              </div>
             
            </div>
          </div>
        
      )} </>):(
        <div className="empty_space text-secondary">
            You have not added any Players
            <Link className="btn btn-info mb-3 text-white" to="/add-player">Add Players</Link>
        </div>
      )}
    </>
  );
}