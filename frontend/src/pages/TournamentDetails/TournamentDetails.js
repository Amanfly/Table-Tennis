import HeaderSmall from "../../components/Header_small";
import React, { useState, useEffect } from "react";
import { Button, Modal,Dropdown } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux';
import { getTournament } from "../../actions/tournamentActions/getTournament";
import { deleteTournament } from '../../actions/tournamentActions/deleteTournament';
import { get_localStorage } from "../../utils/localstorage";
import { AiOutlineArrowLeft, AiOutlineMore } from "react-icons/ai";
import { Link, useHistory } from "react-router-dom";
import "../TournamentDetails/TournamentDetails.css";

export default function TournamentDetails(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [detailTournament, setDetailTournament] = useState([]);
  let detail = useSelector(state => state.tournament.tournamentDetail);
  let tournamentDeleteRes = useSelector(state => state.tournament.deleteTournament);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [selectedTournament, setSelectedTournament] = useState('')

  useEffect(() => {
    //compoment did mount
    let token = get_localStorage("token");
    if (!token) {
      props.history.push('/')
    } else {
      dispatch(getTournament(props.match.params.id))
    }
  }, [])

  useEffect(() => {
    if (detail.success) {
      setDetailTournament(detail?.data.data)
    }
  }, [detail])

  useEffect(() => {
    if (tournamentDeleteRes.success) {
      setSelectedTournament('');
      setIsDeleteModal(false)
      props.history.push('/tournament');
    }
  }, [tournamentDeleteRes])

  const deleteTournamentDetail = (id) => {
    setIsDeleteModal(true);
    setSelectedTournament(id)
  }

  const handleClose = () => {
    setIsDeleteModal(false)
  }

  const deleteApi = () => {
    dispatch(deleteTournament(selectedTournament))
  }
  const createDrawFun = (tournament_id) => {
    localStorage.setItem("tournament_id", tournament_id)
    props.history.push("/create-draws");
  }
  console.log('props.history',props.history)

  return (

    <section className="text-center" >

      {/* <HeaderSmall headerTitle="Tournament Details" /> */}

      <div className="flex-fill d-flex justify-content-between">
        <div onClick={() => props.history.goBack()}  ><AiOutlineArrowLeft size="2em" color="black" /> </div>
        <div className="center-title">{props.headerTitle}</div>
        {/* <div className="btn btn_btn-primary"><AiOutlineMore size="2em" color="black" /></div> */}
        <div>
        <Dropdown>
  <Dropdown.Toggle variant="link">
  <AiOutlineMore size="2em" color="black" />
  </Dropdown.Toggle>

  <Dropdown.Menu>
    <Dropdown.Item href={"/edit-tournament/" + props.match.params.id}>Edit</Dropdown.Item>
    <Dropdown.Item onClick={() => deleteTournamentDetail(detailTournament?.id)}>Delete</Dropdown.Item>
    <Dropdown.Item onClick={(id) => createDrawFun(props.match.params.id)}>Create Draws</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>
</div>
</div>      

          {/* <div className="dropdown-content position-relative">
            {detailTournament?.is_delete && <div className=" text-primary" onClick={() => deleteTournamentDetail(detailTournament?.id)}>Delete</div>} */}

            {/* {detailTournament?.is_editable && <Link className="text-primary" to={"/edit-tournament/" + props.match.params.id}>Edit</Link>} */}

            {/* <div className="text-primary" onClick={(id) => createDrawFun(props.match.params.id)}>Create Draw</div>
          </div> */}
        
      

      <h4>{detailTournament?.tournament_name || "--"}</h4>

      <div className="tournament_info">
        <div className="info_items">
          <span className="text-secondary">Started on: </span>
          <span>{detailTournament?.start_date || "--"}</span>
        </div>
        <div className="info_items">
          <span className="text-secondary">Status: </span>
          <span>{detailTournament?.type || "--"}</span>
        </div>
        <div className="info_items">
          <span className="text-secondary">Last Date of Registration: </span>
          <span>{detailTournament?.registration_end_date || "--"}</span>
        </div>
        <div className="info_items">
          <span className="text-secondary">Maximum Score per set: </span>
          <span>{detailTournament?.max_score || "--"}</span>
        </div>
      </div>

      {/* <div className="info_items">
          <span className="text-secondary">Total Players </span>
          <span>{detailTournament?.tournament_type || "--"}</span>
        </div> */}


      <Modal show={isDeleteModal} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Delete Tournament</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Are you sure you want to delete this tournament?</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>No</Button>
          <Button variant="primary" onClick={() => deleteApi()}>Yes</Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
}
