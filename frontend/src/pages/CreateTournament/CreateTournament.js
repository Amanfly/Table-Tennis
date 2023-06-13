import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { Form, Button, Alert } from 'react-bootstrap';
import { Link, useHistory, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Footer from '../../components/Footer'
import addimage from '../../images/addimage.svg'
import "../CreateTournament/createTournament.css";
import { getTournament } from "../../actions/tournamentActions/getTournament";
import { editTournament } from '../../actions/tournamentActions/editTournament';
import { addTournaments } from "../../actions/tournamentActions/addTournament"
import { get_localStorage } from '../../utils/localstorage'

export default function CreateTournament(props) {
  const { register, handleSubmit, formState: { errors }, getValues,setValue, clearErrors } = useForm();
  const [error, setError] = useState({ state: false, message: null })
  const history = useHistory();
  const dispatch = useDispatch();
  const [image, setImage] = useState(addimage);
  const [preview, setPreview] = useState(addimage)
  let tournament = useSelector(state => state.tournament.addTournament)
  let update = useSelector(state => state.tournament.editTournament)

  const [detailTournament, setDetailTournament] = useState([]);
  let detail = useSelector(state => state.tournament.tournamentDetail);

  const toggleAlert = interval => {
    setTimeout(() => {
      setError({ state: false, message: "" })
    }, interval)
  }

  useEffect(() => {
    //compoment did mount
    setError({ state: false, message: '' })
    let token = get_localStorage("token");
    if (!token) {
      props.history.push('/')
    }
  }, [])

  useEffect(() => {
    console.log(detail)
    if (detail.success) {
      setDetailTournament(detail?.data)
    }
  }, [detail])

  useEffect(() => {
    dispatch(getTournament(props.match.params.id))
  }, [props.match.params.id])

  useEffect(() => {
    if(detailTournament?.data)
    setValue("start_date",detailTournament?.data?.start_date && format(new Date(detailTournament?.data?.start_date), 'yyyy-MM-dd'))
    setValue("registration_end_date",detailTournament?.data?.registration_end_date && format(new Date(detailTournament?.data?.registration_end_date),'yyyy-MM-dd'))
    setValue("tournament_name",(detailTournament?.data?.tournament_name))
    setValue("max_score",(detailTournament?.data?.max_score))
    setValue("type",(detailTournament?.data?.type))
  }, [detailTournament])

  useEffect(() => {
    console.log("AUTH", tournament)
    if (tournament.success) {
      console.log("here")
      Error({
        state: true,
        message: <Alert variant={'success'} className="mb-2 w-100"> Tournament Added Successfully </Alert>
      })
      props.history.push("/")

    } else if (tournament.error) {
      setError({
        state: true,
        message: <Alert variant={'danger'} className="mb-2 w-100"> {tournament?.error}</Alert>
      })
      toggleAlert(5000)
    }
  }, [tournament])

  useEffect(() => {
    console.log("AUTH", update)
    if (update.success) {
      console.log("here")
      Error({
        state: true,
        message: <Alert variant={'success'} className="mb-2 w-100"> Tournament updated Successfully </Alert>
      })
      props.history.push("/tournament")

    } else if (update.error) {
      setError({
        state: true,
        message: <Alert variant={'danger'} className="mb-2 w-100"> {update?.error}</Alert>
      })
      toggleAlert(5000)
    }
  }, [update])


  const handleUpload = (e) => {
    console.log(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
    setImage(e.target.files[0]);
    console.log(image);
  };

  const tournamentSubmit = (data, e) => {
    console.log("data", data)
    e.preventDefault();
    let formdata = new FormData()
    for (var key in data) {
      formdata.append(key, data[key])
    }
    console.log("formdata", formdata)
    formdata.append("image", image)
    if (props.match.params.id) {
      dispatch(editTournament(formdata, props.match.params.id))
    } else {

      dispatch(addTournaments(formdata))
    }
  };


  return (
    <div className="form_wrapper">
      <Form onSubmit={handleSubmit(tournamentSubmit)} className="form_container">
        <h3 className="text-center mb-3">Create Tournament</h3>
        {error.state && <div>{error.message}</div>}

        <Form.Group className="mb-3 image_con">
          <img src={detailTournament?.data?.image} alt="addimage" className="img_preview" />
          <input
            type="file"
            id="image-upload"
            accept="image/*"
            name="image"
            onChange={(e) => handleUpload(e)}
            //{...register("image")}
            defaultValue={detailTournament?.data?.image}
          />
          <label htmlFor="image-upload" className="image-button">
            Add Photo
          </label>
        </Form.Group>
        <Form.Group className="mb-3 input_container" controlId="formBasicName">
          <Form.Control
            type="text"
            placeholder="Tournament Name"
            {...register("tournament_name", { required: true })}
            defaultValue={detailTournament?.data?.tournament_name}
          />
          {errors?.tournament_name?.type === "required" && <div className="text-danger"> This Field Is Required </div>}
        </Form.Group>
        <Form.Group className="mb-3 input_container" controlId="formBasicDate">
          <Form.Control
            type="date"
            placeholder="Start Date (DD-MM-YYYY)"
            {...register("start_date", { required: true })}
            defaultValue={(detailTournament?.data?.start_date) ? format(new Date(detailTournament?.data?.start_date), 'yyyy-MM-dd'):'' }
          />
          {errors?.start_date?.type === "required" && <div className="text-danger"> This Field Is Required </div>}
        </Form.Group>
        <Form.Group className="mb-3 input_container" controlId="formBasicDate">
          <Form.Control
            type="date"
            placeholder=" Registration End Date (DD-MM-YYYY) "
            {...register("registration_end_date", { required: true })}
            defaultValue={(detailTournament?.data?.registration_end_date) ? format(new Date(detailTournament?.data?.registration_end_date), 'yyyy-MM-dd'):'' }
            // defaultValue={detailTournament?.data?.registration_end_date}

          />
          {errors?.registration_end_date?.type === "required" && <div className="text-danger"> This Field Is Required </div>}
        </Form.Group>
        <Form.Group
          className="mb-3 input_container maxscore"
          controlId="formBasicScore"
        >
          <Form.Label className="left_maxscore">Max Score per set</Form.Label>
          <Form.Control
            type="number"
            className="right_maxscore"
            placeholder="Max Score"
            {...register("max_score", { required: true })}
            defaultValue={detailTournament?.data?.max_score}
          />
          {errors?.max_score?.type === "required" && <div className="text-danger"> This Field Is Required </div>}
        </Form.Group>

        <Form.Group
          className="type_select input_container"
          controlId="formTournamentType"
        >
          <Form.Label className="mr-5 type_label">
            Choose Tournament type{" "}
          </Form.Label>
        </Form.Group>
        <Form.Group className="mb-1">
          <Form.Check.Input
            {...register("type", { required: true })}
            type="radio"
            value="private"
            defaultChecked={detail?.data?.type == "private"}
          />
          <Form.Check.Label>Private</Form.Check.Label>
          <Form.Check.Input
            {...register("type", { required: true })}
            type="radio"
            value="public"
            defaultChecked={detail?.data?.type == "public"}
          />
          <Form.Check.Label>Public</Form.Check.Label>

          {errors?.type?.type === "required" && <div className="text-danger"> This Field Is Required </div>}
        </Form.Group>
        <div className="d-flex">
          <input className="btn btn-primary m-2" type="submit" value={props.match.params.id ? "Update" : "save"} />
          <div className="btn btn-danger m-2" onClick={() => history.goBack()} > Cancel</div>
        </div>
      </Form>
      <div className="footer-optional">
        <Footer />
      </div>
    </div>
  );
}
