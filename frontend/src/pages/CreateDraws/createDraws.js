import { Button, Form, InputGroup } from "react-bootstrap";
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory, Redirect } from 'react-router-dom';
import { get_localStorage } from "../../utils/localstorage";
import { createDraws } from "../../actions/drawsAction";
import { getCreateDraws } from "../../actions/tournamentActions/addPlayerToTournamentAction"
import {searchPlayers} from "../../actions/profile"
import "../CreateDraws/createDraws.css";
import HeaderSmall from "../../components/Header_small";
import CardDraw from "../../components/CardDraw";
import { Alert } from 'react-bootstrap'

export default function CreateDraws(props) {
  const [search, setSearch] = useState();
  const history = useHistory();
  const [selectedPlayer, setSelectedPlayer] = useState([]);
  const dispatch = useDispatch();
  const [playerList, setPlayerList] = useState({});
  let get_draws = useSelector(state => state.draws.getCreateDraw)
  // let list = useSelector(state => state.player.listPlayer)replay this with reducer of tournament get draws
  let draws = useSelector(state => state.draws.createdraws)
  let searchIt = useSelector(state => state.draws.searchPlayer)
  //useSelector for serach api
  const [error, setError] = useState({ state: false, message: null });
  const id = localStorage.getItem('tournament_id')

  const toggleAlert = interval => {
    setTimeout(() => {
      setError({ state: false, message: "" })
    }, interval)
  }

  useEffect(() => {
    let token = get_localStorage("token");
    if (!token) {
      props.history.push('/')
    } else {
      dispatch(getCreateDraws(id))
    }
  }, [])

  useEffect(() => {
      if (get_draws.success) {
        setPlayerList(get_draws?.data?.results)
      }
    }, [get_draws])

  // useEffect(() => {
  //   if (list.success) {
  //     setPlayerList(list ?.data ?.results)
  //   }
  // }, [list]) replayers this with tournament get draws 

  useEffect(() => {
    if (draws.success) {
      props.history.push("/match-list");
    } else if (draws ?.error) {
      setError({
        state: true,
        message: <Alert variant={'danger'} className="mb-2 w-100"> {draws ?.error}</Alert>
      })
      toggleAlert(5000)
    }
  }, [draws])

  useEffect(() => {
    if (searchIt.success) {
      setSearch(searchIt?.data?.results)
    }
  }, [searchIt])

  //useEffect(()=>{serach api result})

  const handleSearch = (e) => {
    setSearch(e.target.value);
    dispatch(searchPlayers(id));
    //dispatch serach api 
  };

  const handleDraw = () => {
    dispatch(createDraws(id));
  };

  return (
    <>
      <HeaderSmall headerTitle="Create Draws" />

      <div className="search_container">
        <Form.Control
          type="text"
          placeholder="Search here.."
          className="search_input"
          name="search"
          defaultValue={search}
          onChange={(e) => handleSearch(e)}
        />
      </div>
      <span className="suggestions">Suggestions</span>
      <CardDraw data={playerList} isDraw={true} setSelectedPlayer={setSelectedPlayer} selectedPlayer={selectedPlayer} />
      <div className="draws_btn_bottom">
        <Button
          variant="primary"
          className="draws_btn btn-lg footer_btn"
          onClick={handleDraw}
        >
          Generate Draws
        </Button>
      </div>
    </>
  );
}