import React, { Component } from 'react';
import Axios from 'axios';
import firebase from './firebase';


// class-based/simple functional components
import LeagueForm from './LeagueForm';
import TeamsInLeague from './TeamsInLeague';
import DisplayFavoriteTeams from './DisplayFavoriteTeams';
import Schedule from './Schedule'


// reference to the root of the firebase database
const dbRef = firebase.database().ref();

// moment.js to fix date issues
const moment = require('moment');
moment().format();

class App extends Component {
  constructor() {
    super();
    this.state = {
      league: 'nhl', // default league
      teamsByLeague: [],
      favoriteTeams: {},
      currentView: 'schedule', // default view
      // the folllowing are for pushing favorite team info to firebase
      teamBadge: '',
      teamID: 0,
      teamLeague: '',
      teamName: '',
      teamSchedule: {},
      selectedLeagues: {}
    }
  }
  componentDidMount() {
    dbRef.on('value', (snapshot) => {
      this.setState({
        favoriteTeams: snapshot.val()
      })
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.fetchLeague();
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
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
    const getTeamLeague = e.target.value;
    const getTeamName = e.target.getAttribute('data-team-name');
    this.setState({
      teamBadge: getTeamBadge,
      teamID: getTeamID,
      teamLeague: getTeamLeague,
      teamName: getTeamName,
    })
    Axios.get(`https://www.thesportsdb.com/api/v1/json/1/eventsnext.php?id=${e.target.id}`, {
    }).then((res) => {
      const upcomingGames = res.data.events.map((game) => {
        // console.log(game);
        const regDate = moment(`${game.dateEvent}`).format('dddd MMMM D, YYYY');
        const nbaDate = moment(`${game.dateEvent} ${game.strTime}`).subtract(5, 'hours').format('dddd MMMM D, YYYY');
        // NBA info returns time of game in UTC which messes up the date of the game in most cases (late-night games return as next day).
        // NHL, NFL does not return time of game at all so the date can  be formatted without adjustment.
        // NHL returned incorrect home and away teams (swapped).
        // Can't verify MLB as currently off-season and does not return any information.
        if (game.strLeague === 'NHL') {
          return [regDate, game.strHomeTeam, game.strAwayTeam]
        } else if (game.strLeague === 'NBA') {
          return [nbaDate, game.strAwayTeam, game.strHomeTeam]
        } else {
          return [regDate, game.strAwayTeam, game.strHomeTeam]
        }
      })
      const leaguesToPrint = res.data.events.map((game) => {
        return game.strLeague
      })
      const temporaryLeagueArray = [];
      temporaryLeagueArray.push(leaguesToPrint);
      this.setState({
        teamSchedule: upcomingGames,
        selectedLeagues: temporaryLeagueArray
      })
      const userSelectedTeam = {
        teamBadge: this.state.teamBadge,
        teamID: this.state.teamID,
        teamLeague: this.state.teamLeague,
        teamName: this.state.teamName,
        teamSchedule: this.state.teamSchedule
      }
      dbRef.push(userSelectedTeam);
      console.log(this.state.selectedLeagues);
    })
  }
  removeTeam = (e) => {
    const firebaseKey = e.target.id;
    const teamRef = firebase.database().ref(`/${firebaseKey}`);
    teamRef.remove();
  }
  showFavoriteTeams = () => {
    this.setState({
      currentView: 'favoriteTeams'
    })
  }
  showSchedule = () => {
    this.setState({
      currentView: 'schedule'
    })
  }
  showLeague = () => {
    this.setState({
      currentView: 'league'
    })
  }
  render() {
    return (
      <div className="App">
        <div>
          <header className="header">
            <div className="wrapper">
              <nav>
                <button
                  onClick={this.showFavoriteTeams}
                  className={this.state.currentView === 'favoriteTeams' ? 'selected button button-schedule' : 'button button-favorite-teams'}>
                  My Teams</button>
                <button
                  onClick={this.showSchedule}
                  className={this.state.currentView === 'schedule' ? 'selected button button-schedule' : 'button button-schedule'}>
                  Schedules</button>
                <button
                  onClick={this.showLeague}
                  className={this.state.currentView === 'league' ? 'selected button button-schedule' : 'button button-leagues'}>
                  Leagues</button>
              </nav>
              <h1 className="header-title">Fan Feed</h1>
            </div>
          </header>
          <main>
            <div className="wrapper">
                {
                  this.state.currentView === 'schedule'
                  ?
                  <Schedule 
                    favoriteTeams={this.state.favoriteTeams}
                    showLeague={this.showLeague} />
                  :
                  null
                }
                {
                  this.state.currentView === 'favoriteTeams'
                  ?
                  <DisplayFavoriteTeams
                    favoriteTeams={this.state.favoriteTeams}
                    removeTeam={this.removeTeam}
                    showLeague={this.showLeague} />
                  :
                  null
                }
                {
                  this.state.currentView === 'league'
                  ?
                  <div>
                    <LeagueForm
                      handleSubmit={this.handleSubmit}
                      handleChange={this.handleChange}
                      league={this.state.league}
                      teams={this.state.teamsByLeague} />
                    <TeamsInLeague
                      teams={this.state.teamsByLeague}
                      captureTeam={this.captureTeam}
                      fetchTeamSchedule={this.fetchTeamSchedule} />
                  </div>
                  :
                  null
                }
            </div>
          </main>
        </div>
        <footer className="footer">
          <p>&copy; Jonathan 2018</p>
          <p>API information courtesy of <a href="https://www.thesportsdb.com/api.php">TheSportsDB</a></p>
        </footer>
      </div>
    );
  }
}

export default App;
