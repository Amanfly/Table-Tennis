import React, { useEffect, useState } from "react";
import HeaderSmall from "../../components/Header_small";
import "../profilePlayer/PlayerProfile.css";
import { Button, Modal } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux';
import { get_localStorage } from '../../utils/localstorage'
import { getPlayer, deletePlayer } from "../../actions/profile";
import { Link } from "react-router-dom";

export default function ProfilePlayer(props) {
  const dispatch = useDispatch();
  //const [error, setError] = useState({ state: false, message: null})
  const [profileDetail, setProfileDetail] = useState({});
  let profile = useSelector(state => state.player.getPlayer);
  let playerDeleteRes = useSelector(state => state.player.deletePlayer);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState('')

  useEffect(() => {
    //compoment did mount
    //setError({state: false, message: ''})
    let token = get_localStorage("token");
    if (!token) {
      props.history.push('/')
    } else {
      dispatch(getPlayer(props.match.params.id))
    }
  }, [])

  useEffect(() => {

    if (profile.success) {
      //console.log("here")
      setProfileDetail(profile?.data)
    }
  }, [profile])

  useEffect(() => {
    if (playerDeleteRes.success) {
      setSelectedPlayer('');
      setIsDeleteModal(false)
      props.history.push('/player-list');
    }
  }, [playerDeleteRes])

  const deletePlayer = (id) => {
    setIsDeleteModal(true);
    setSelectedPlayer(id)
  }

  const handleClose = () => {
    setIsDeleteModal(false)
  }

  const deleteApi = () => {
    dispatch(deletePlayer(selectedPlayer))
  }
  console.log('props.history',props.history)
  //console.log("profileDetail",profileDetail)
  return (

    <section className="text-center" >
      

      <HeaderSmall headerTitle="Player Details" />

      <div className="player_info">

        <img src={profileDetail?.data?.image || ''} alt="addimage" className="user_profile_image rounded-circle" />


        <input
          type="file"
          name="image-upload"
          id="image-upload"
          accept="image/*"
        />
      </div>
      <div className="pD ">
        {profileDetail?.data?.name || '--'} <br />
        {profileDetail?.data?.age } <br />
        {profileDetail?.data?.gender || '--'}
      </div>
      <div className="rest">
        Email :&ensp;  {profileDetail?.data?.email || '--'}<br />
        Matches Played :&ensp;  {profileDetail?.data?.match_stats.match_played || '0'}<br />
        Matches Won :&ensp;  {profileDetail?.data?.match_stats.match_won || '0'}
      </div>
      <div className=" border_bottom ">Played in tournaments </div>
      <div className="details">
        {profileDetail?.data?.tournament?.length !== 0 ? profileDetail?.data?.tournament.map((data, i) =>

          <div className="datas mt-3 mb-3" key={i}><img src={("../../images/tournamentIconUnSelected.png")} alt="icon" className="icon" /> {data?.tournament_name}  </div>
        ) :

          <div className="text-center">Player is not added in any tournament</div>
        }</div>



      {/* <button type="button" className="btn btn-danger" onClick={()=>deletePlayer(props.match.params.id)}>Delete</button> 
       <Link className="btn btn-info m-3" to={"/edit-player/"+props.match.params.id}>Edit</Link>   */}

      <Modal show={isDeleteModal} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Delete Player</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Are you sure you want to delete this player?</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>No</Button>
          <Button variant="primary" onClick={() => deleteApi()}>Yes</Button>
        </Modal.Footer>
      </Modal>

    </section>


  );
}
