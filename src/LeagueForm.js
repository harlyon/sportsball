import React, {Component} from 'react';
import TeamsInLeague from './TeamsInLeague';
import firebase from './firebase';
import swal from 'sweetalert';
import Axios from 'axios';

// reference to the root of the firebase database
const dbRef = firebase.database().ref();

// moment.js to fix date issues
const moment = require('moment');
moment().format();

class LeagueForm extends Component {
  constructor() {
    super();
    this.state = {
      league: 'nhl', // default league
      teamsByLeague: [],
      teamBadge: '',
      teamID: 0,
      teamLeague: '',
      teamName: '',
      teamSchedule: {},
    }
  }
  fetchLeague = () => {
    Axios.get(`https://www.thesportsdb.com/api/v1/json/1/search_all_teams.php?l=${this.state.league}`, {
    }).then((res) => {
      this.setState({
        teamsByLeague: res.data.teams
      })
    })
  }
  fetchTeamSchedule = (e) => {
    e.preventDefault();
    const getTeamBadge = e.target.getAttribute('data-team-badge');
    const getTeamID = e.target.id;
    const getTeamLeague = e.target.getAttribute('data-team-league');
    const getTeamName = e.target.getAttribute('data-team-name');
    this.setState({
      teamBadge: getTeamBadge,
      teamID: getTeamID,
      teamLeague: getTeamLeague,
      teamName: getTeamName
    });
    swal(`${getTeamName} has been added to your favorite teams.`);
    Axios.get(`https://www.thesportsdb.com/api/v1/json/1/eventsnext.php?id=${e.target.id}`, {
    }).then((res) => {
      if (res.data.events !== null) {
        const upcomingGames = res.data.events.map((game) => {
          const regDate = moment(`${game.dateEvent}`, 'YYYY-MM-DD').format('dddd MMMM D, YYYY');
          const nbaDate = moment(`${game.dateEvent} ${game.strTime}`, 'YYYY-MM-DD HH:mm').subtract(5, 'hours').format('dddd MMMM D, YYYY');
          if (game.strLeague === 'NHL') {
            return [regDate, game.strHomeTeam, game.strAwayTeam]
          } else if (game.strLeague === 'NBA') {
            return [nbaDate, game.strAwayTeam, game.strHomeTeam]
          } else {
            return [regDate, game.strAwayTeam, game.strHomeTeam]
          }
        })
        this.setState({
          teamSchedule: upcomingGames,
        })
        const userSelectedTeam = {
          teamBadge: this.state.teamBadge,
          teamID: this.state.teamID,
          teamLeague: this.state.teamLeague,
          teamName: this.state.teamName,
          teamSchedule: this.state.teamSchedule
        }
        dbRef.push(userSelectedTeam);
      }
    })
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.fetchLeague();
  }
  displayForm = () => {
    return (
      <section className="league">
        <h2 className="section-title">Leagues</h2>
        <form
          action=""
          className="league-form"
          onSubmit={this.handleSubmit}>
          <select
            name="league"
            id="league"
            className="league-select"
            placeholder="Please select a league"
            value={this.state.league}
            onChange={this.handleChange}>
            <option value="nhl">National Hockey League</option>
            <option value="nba">National Basketball Association</option>
            <option value="nfl">National Football League</option>
            <option value="mlb">Major League Baseball</option>
          </select>
          <input
            type="submit"
            value="Go!"
            className="league-submit" />
        </form>
      </section>
    )
  }
  render() {
    return (
      <div>
        {this.displayForm()}
        <TeamsInLeague 
          teamsByLeague={this.state.teamsByLeague}
          fetchTeamSchedule={this.fetchTeamSchedule} />
      </div>
    )
  }
}

export default LeagueForm;