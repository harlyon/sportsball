import React, { Component } from 'react';
import Axios from 'axios';
import firebase from './firebase';


// class-based/simple functional components
import LeagueForm from './LeagueForm';
import TeamForm from './TeamForm';
import DisplayTeams from './DisplayTeams';


// reference to the root of the firebase database
const dbRef = firebase.database().ref();

class App extends Component {
  constructor() {
    super();
    this.state = {
      league: 'mlb',
      teamsByLeague: [],
      favoriteTeams: {}
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
      console.log(this.state.league, this.state.teamsByLeague)
    })
  }
  captureTeam = (e) => {
    const userSelectedTeam = {
      teamBadge: e.target.getAttribute('data-team-badge'),
      teamID: e.target.id,
      teamLeague: e.target.value,
      teamName: e.target.getAttribute('data-team-name'),
    }
    dbRef.push(userSelectedTeam);
    console.log('The team being added is', userSelectedTeam.teamName, userSelectedTeam.teamID)
  }
  render() {
    return (
      <div className="App">
        <header>
          <div className="wrapper">
            <h1>Fan Feed</h1>
            <LeagueForm 
              handleSubmit={this.handleSubmit}
              handleChange={this.handleChange}
              league={this.state.league}
              teams={this.state.teamsByLeague}
              />
          </div>
        </header>
        <main>
          <div className="wrapper">
            <DisplayTeams 
              favoriteTeams={this.state.favoriteTeams}/>
            <TeamForm 
              teams={this.state.teamsByLeague}
              captureTeam={this.captureTeam}/>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
