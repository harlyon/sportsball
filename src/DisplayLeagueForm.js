import React, {Component} from 'react';
import TeamsInLeague from './TeamsInLeague';
import firebase from './firebase';
import swal from 'sweetalert';
import Axios from 'axios';

const dbRef = firebase.database().ref();

class DisplayLeagueForm extends Component {
  constructor() {
    super();
    this.state = {
      league: 'nhl', // default league
      teamsByLeague: []
    }
  }
  displayForm = () => {
    return (
      <section className="leagues">
        <h2 className="section-title">Leagues</h2>
        <form
          action=""
          className="form"
          onSubmit={this.handleSubmit}>
          <select
            name="league"
            id="league"
            className="form__select"
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
            value="Go"
            className="form__submit" />
        </form>
      </section>
    )
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
  fetchLeague = () => {
    Axios.get(`https://www.thesportsdb.com/api/v1/json/1/search_all_teams.php?l=${this.state.league}`, {
    }).then((res) => {
      this.setState({
        teamsByLeague: res.data.teams
      })
    })
  }
  addTeamToFavorites = (e) => {
    const userSelectedTeam = {
      teamID: e.target.getAttribute('data-team-id'),
      teamName: e.target.getAttribute('data-team-name'),
      teamLeague: e.target.getAttribute('data-team-league'),
      teamBadge: e.target.getAttribute('data-team-badge')
    }
    dbRef.push(userSelectedTeam);
    swal(`${e.target.getAttribute('data-team-name')} has been added to your favorite teams.`);
  }
  render() {
    return (
      <div>
        {this.displayForm()}
        <TeamsInLeague 
          teamsByLeague={this.state.teamsByLeague}
          favoriteTeams={this.props.favoriteTeams}
          addTeamToFavorites={this.addTeamToFavorites} />
      </div>
    )
  }
}

export default DisplayLeagueForm;