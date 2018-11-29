import React, { Component } from 'react';
import Axios from 'axios';
import LeagueForm from './LeagueForm';
import TeamForm from './TeamForm';

class App extends Component {
  constructor() {
    super();
    this.state = {
      league: 'mlb',
      teamsByLeague: [],
      favoriteTeams: []
    }
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
    const userSelectedTeam = this.state.favoriteTeams;
    userSelectedTeam.push(e.target.value);
    this.setState({
      favoriteTeams: userSelectedTeam
    });
    console.log('the team ID being added', e.target.value);
    console.log('the unchanged full team array', this.state.teamsByLeague);
    console.log('the updated list of fav teams', this.state.favoriteTeams);
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
