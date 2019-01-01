import React, {Component} from 'react';
import TeamsInLeague from './TeamsInLeague';
import firebase from './firebase';
import swal from 'sweetalert';
import Axios from 'axios';


class DisplayLeagues extends Component {
  constructor() {
    super();
    this.state = {
      teamsByLeague: []
    }
  }
  handleClick = (e) => {
    Axios.get(`https://www.thesportsdb.com/api/v1/json/1/search_all_teams.php?l=${e.target.value}`, {
    }).then((res) => {
      const listOfTeams = res.data.teams;
      this.setState({
        teamsByLeague: listOfTeams
      })
    })
  }
  addTeamToFavorites = (e) => {
    const userRef = firebase.database().ref(`/${this.props.user.uid}`);
    const userSelectedTeam = {
      teamID: e.target.getAttribute('data-team-id'),
      teamName: e.target.getAttribute('data-team-name'),
      teamLeague: e.target.getAttribute('data-team-league'),
      teamBadge: e.target.getAttribute('data-team-badge')
    }
    userRef.push(userSelectedTeam);
    swal(`${e.target.getAttribute('data-team-name')} has been added to your favorite teams.`);
  }
  render() {
    return (
      <div>
        <section className="leagues">
          <h2 className="section-title">Leagues</h2>
            <div className="leagues__button-container">
              <button value="nhl" className="leagues__button" onClick={this.handleClick}>NHL</button>
              <button value="nba" className="leagues__button" onClick={this.handleClick}>NBA</button>
              <button value="nfl" className="leagues__button" onClick={this.handleClick}>NFL</button>
              <button value="mlb" className="leagues__button" onClick={this.handleClick}>MLB</button>
            </div>
        </section>
        <TeamsInLeague 
          teamsByLeague={this.state.teamsByLeague}
          addTeamToFavorites={this.addTeamToFavorites} />
      </div>
    )
  }
}

export default DisplayLeagues;