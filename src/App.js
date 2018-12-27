import React, { Component } from 'react';
import Axios from 'axios';
import firebase from './firebase';
import swal from 'sweetalert';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import './styles.scss';

// class-based/simple functional components
import LeagueForm from './LeagueForm';
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
      // the folllowing are for pushing favorite team info to firebase
      teamBadge: '',
      teamID: 0,
      teamLeague: '',
      teamName: '',
      teamSchedule: {},
    }
  }
  componentDidMount() {
    dbRef.on('value', (snapshot) => {
      this.setState({
        favoriteTeams: snapshot.val()
      })
    });
  }
  // handleSubmit = (e) => {
  //   e.preventDefault();
  //   this.fetchLeague();
  // }
  // handleChange = (e) => {
  //   this.setState({
  //     [e.target.id]: e.target.value
  //   })
  // }
  // fetchLeague = () => {
  //   Axios.get(`https://www.thesportsdb.com/api/v1/json/1/search_all_teams.php?l=${this.state.league}`, {
  //   }).then((res) => {
  //     console.log('league results', res);
      
  //     this.setState({
  //       teamsByLeague: res.data.teams
  //     })
  //   })
  // }
  // fetchTeamSchedule = (e) => {
  //   e.preventDefault();
  //   const getTeamBadge = e.target.getAttribute('data-team-badge');
  //   const getTeamID = e.target.id;
  //   const getTeamLeague = e.target.getAttribute('data-team-league');
  //   const getTeamName = e.target.getAttribute('data-team-name');
  //   this.setState({
  //     teamBadge: getTeamBadge,
  //     teamID: getTeamID,
  //     teamLeague: getTeamLeague,
  //     teamName: getTeamName
  //   });
  //   swal(`${getTeamName} has been added to your favorite teams.`);
  //   Axios.get(`https://www.thesportsdb.com/api/v1/json/1/eventsnext.php?id=${e.target.id}`, {
  //   }).then((res) => {
  //     console.log('team sched results', res);
      
  //     if (res.data.events !== null) {
  //       const upcomingGames = res.data.events.map((game) => {
  //         const regDate = moment(`${game.dateEvent}`, 'YYYY-MM-DD').format('dddd MMMM D, YYYY');
  //         const nbaDate = moment(`${game.dateEvent} ${game.strTime}`, 'YYYY-MM-DD HH:mm').subtract(5, 'hours').format('dddd MMMM D, YYYY');
  //         if (game.strLeague === 'NHL') {
  //           return [regDate, game.strHomeTeam, game.strAwayTeam]
  //         } else if (game.strLeague === 'NBA') {
  //           return [nbaDate, game.strAwayTeam, game.strHomeTeam]
  //         } else {
  //           return [regDate, game.strAwayTeam, game.strHomeTeam]
  //         }
  //       })
  //       this.setState({
  //         teamSchedule: upcomingGames,
  //       })
  //       const userSelectedTeam = {
  //         teamBadge: this.state.teamBadge,
  //         teamID: this.state.teamID,
  //         teamLeague: this.state.teamLeague,
  //         teamName: this.state.teamName,
  //         teamSchedule: this.state.teamSchedule
  //       }
  //       dbRef.push(userSelectedTeam);
  //     }
  //   })
  // }
  removeTeam = (e) => {
    const firebaseKey = e.target.id;
    const teamRef = firebase.database().ref(`/${firebaseKey}`);
    teamRef.remove();
  }
  // showFavoriteTeams = () => {
  //   this.setState({
  //     currentView: 'favoriteTeams'
  //   })
  // }
  // showSchedule = () => {
  //   this.setState({
  //     currentView: 'schedule'
  //   })
  // }
  // showLeague = () => {
  //   this.setState({
  //     currentView: 'league'
  //   })
  // }
  render() {
    return (
      <Router>
        <div className="App">
          <div>
            <header className="header">
              <div className="wrapper">
                <nav className="nav">
                  <NavLink to="/teams" className="nav__link">My Teams</NavLink>
                  <NavLink to="/schedule" className="nav__link">Schedule</NavLink>
                  <NavLink to="/leagues" className="nav__link">Leagues</NavLink>
                </nav>
                <h1 className="header-title">Boxscore Buddy</h1>
              </div>
            </header>
            <main>
              <div className="wrapper">
                  <Route path="/schedule" render={(props) =>
                    <Schedule {...props}
                      favoriteTeams={this.state.favoriteTeams}
                      showLeague={this.showLeague}
                      leaguesAlreadyAdded={this.state.leaguesAlreadyAdded}
                      />
                  } />
                  <Route path="/teams" render={(props) =>
                    <DisplayFavoriteTeams {...props}
                      favoriteTeams={this.state.favoriteTeams}
                      removeTeam={this.removeTeam}
                      showLeague={this.showLeague}
                      />
                  } />
                  <Route path="/leagues" render={(props) =>
                    <LeagueForm {...props} 
                      // handleSubmit={this.handleSubmit}
                      // handleChange={this.handleChange}
                      // league={this.state.league}
                      // teamsByLeague={this.state.teamsByLeague}
                      // fetchTeamSchedule={this.fetchTeamSchedule}
                    />
                  } />
              </div>
            </main>
          </div>
          <footer className="footer">
            <p>&copy; Jonathan 2018</p>
            <p><a href="https://jonathanhoy.com/" className="portfolio-link">Back to Portfolio</a> | API information courtesy of <a href="https://www.thesportsdb.com/api.php">TheSportsDB</a></p>
          </footer>
        </div>
      </Router>
    );
  }
}

export default App;
