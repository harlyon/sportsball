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

class App extends Component {
  constructor() {
    super();
    this.state = {
      league: 'mlb',
      teamsByLeague: [],
      favoriteTeams: {},
      currentView: 'favoriteTeams'
    }
  }
  // ANASTASIA'S WAY
  // componentDidMount() {
  //   dbRef.on('value', (snapshot) => {
  //     const object = snapshot.val();
  //     let favoriteTeams = [];
  //     for (let key in object){
  //       const team = {
  //         teamID: object[key].teamID,
  //         teamLeague: object[key].teamLeague,
  //         teamBadge: object[key].teamBadge,
  //         teamName: object[key].teamName
  //       }
  //       favoriteTeams.push(team);
  //     }
  //     console.log(favoriteTeams);
  //     this.setState({
  //       favoriteTeams: favoriteTeams
  //     })
  //   });
  // }
  componentDidMount() {
    dbRef.on('value', (snapshot) => {
      this.setState({
        favoriteTeams: snapshot.val()
      })
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.getLeague();
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  getLeague = () => {
    Axios.get(`https://www.thesportsdb.com/api/v1/json/1/search_all_teams.php?l=${this.state.league}`, {
    }).then((res) => {
      this.setState({
        teamsByLeague: res.data.teams
      })
    })
  }
  captureTeam = (e) => {
    e.preventDefault();
    const userSelectedTeam = {
      teamBadge: e.target.getAttribute('data-team-badge'),
      teamID: e.target.id,
      teamLeague: e.target.value,
      teamName: e.target.getAttribute('data-team-name'),
    }
    dbRef.push(userSelectedTeam);
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
        <header>
          <div className="wrapper">
            <h1>Fan Feed</h1>
            <div>
              <button onClick={this.showFavoriteTeams}>My Teams</button>
              <button onClick={this.showSchedule}>Schedule</button>
              <button onClick={this.showLeague}>Leagues</button>
              {/* schedule */}
            </div>
          </div>
        </header>
        <main>
          <div className="wrapper">
            {/* <DisplayFavoriteTeams 
              favoriteTeams={this.state.favoriteTeams}
              removeTeam={this.removeTeam}/>
            <LeagueForm 
              handleSubmit={this.handleSubmit}
              handleChange={this.handleChange}
              league={this.state.league}
              teams={this.state.teamsByLeague}
              />
            <TeamForm 
              teams={this.state.teamsByLeague}
              captureTeam={this.captureTeam}/> */}
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
                this.state.currentView === 'schedule'
                ?
                <Schedule favoriteTeams={this.state.favoriteTeams}/>
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
                    captureTeam={this.captureTeam} />
                </div>
                :
                null
              }
          </div>
        </main>
      </div>
    );
  }
}

export default App;
