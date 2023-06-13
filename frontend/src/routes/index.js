import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import history from "../history";

import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import Home from "../pages/Home/Home";
import Tournament from "../pages/Tournament/Tournament";
import AddPlayer from "../pages/AddPlayer/AddPlayer";
import CreateTournament from "../pages/CreateTournament/CreateTournament";
import PlayerList from "../pages/PlayerList/PlayerList";
import TournamentDetails from "../pages/TournamentDetails/TournamentDetails";
import MatchList from "../pages/MatchList/MatchList";
import MatchDetails from "../pages/MatchDetails/MatchDetails";
import MatchDetailsAdmin from "../pages/MatchDetailsAdmin/MatchDetailsAdmin";
import PlayerProfile from "../pages/PlayerProfile/PlayerProfile";
import Reset_password from "../pages/Reset_password/Reset_password";
import ForgotPassword from "../pages/forgot password/ForgotPassword";
import VerifyEmail from '../pages/SignUp/verify-email'
import CreateDraws from "../pages/CreateDraws/createDraws";
import { forgotPassword } from "../actions/auth";
import UpcomingTournament from "../pages/Tournament/upcoming";
import PastTournament from "../pages/Tournament/past";
import ProfilePlayer from "../pages/profilePlayer/PlayerProfile";

export default function Routes() {
  return (
    <Router history={history}>
      <Route exact path="/" component={Home} />
      <Route path="/user-login" component={Login} />
      <Route path="/user-signup" component={ SignUp} />
      <Route exact path="/tournament" component={Tournament} />
      <Route exact path="/tournament/upcoming" component={UpcomingTournament} />
      <Route exact path="/tournament/previous" component={PastTournament} />
      <Route path="/add-player" component={AddPlayer} />
      <Route path="/edit-player/:id" component={AddPlayer} />
      <Route path="/add-tournament" component={CreateTournament} />
      <Route path="/edit-tournament/:id" component={CreateTournament} />
      <Route path="/tournament/details/:id" component={TournamentDetails} />
      <Route path="/create-draws" component={CreateDraws} />
      <Route path="/match-list" component={MatchList} />
      <Route path="/player-list" component={PlayerList} />
      <Route path="/match-details" component={MatchDetails} />
      <Route path="/match-details-admin" component={MatchDetailsAdmin} />
      <Route path="/player-profile" component={PlayerProfile} />
      <Route path="/profile/:id" component={ProfilePlayer} />
      <Route path="/reset-password/:id" component={Reset_password} />
      <Route path="/forgot-password" component={ForgotPassword} />
      <Route path="/email-verify/:id" component={VerifyEmail} />
    </Router>
  );
}