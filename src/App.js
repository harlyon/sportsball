import React, { Component } from 'react';
import Axios from 'axios';
import PrintTeams from './PrintTeams';
import Form from './Form';

class App extends Component {
  constructor() {
    super();
    this.state = {
      league: 'mlb',
      teams: []
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
        teams: res.data.teams
      })
      console.log(this.state.league, this.state.teams)
    })
  }
  render() {
    return (
      <div className="App">
        <header>
          <div className="wrapper">
            <h1>Fan Feed</h1>
            <Form 
              handleSubmit={this.handleSubmit}
              handleChange={this.handleChange}
              league={this.state.league}
              teams={this.state.teams}
              />
          </div>
        </header>
        <main>
          <div className="wrapper">
            <PrintTeams teams={this.state.teams}/>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
