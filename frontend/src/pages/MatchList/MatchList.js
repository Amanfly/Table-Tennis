
import React, { useState, useEffect } from 'react';
import HeaderSmall from "../../components/Header_small";
import MatchCard from "../../components/MatchCard";
import { Link, useHistory, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import "../MatchList/matchList.css";
import { showMatches } from "../../actions/matchAction";
import { get_localStorage } from "../../utils/localstorage";

export default function MatchList(props) {
 
    const history = useHistory();
    // const { id } = useParams();
    const [round, setRound] = useState();
    const [matchList, setMatchList] = useState({});
    const dispatch = useDispatch();
    let list = useSelector(state => state.match)

    
    useEffect(()=>{
      let token = get_localStorage("token");
      if(!token){
        props.history.push('/')
      } else{
        dispatch(showMatches())
      }
    }, []) 
   
    useEffect(()=>{
      console.log(list)
    if(list.success){
        setMatchList(list?.data?.results)
      }
    }, [list])
    console.log(matchList)

    useEffect(() => {
      dispatch(showMatches(round));
    }, [round]);

    const handleRound = (e) => {
      setRound(e.target.value);
    };

  return (
    <>
    <HeaderSmall headerTitle="Matches" />
      <div className="d-flex align-items-center mb-3 p-2">
        View Matches for:
        <select
          className="w-25"
          id="round_select"
          onChange={(e) => handleRound(e)}
        >
          <option value="1">Round 1</option>
          <option value="2">Round 2</option>
        </select>
      </div>
        
      < MatchCard data={matchList} /> 
    </>
  );
}
