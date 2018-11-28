import React, { Component } from 'react';
import Axios from 'axios';
import PrintTeams from './PrintTeams';

class App extends Component {
  constructor() {
    super();
    this.state = {
      league: '',
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
    console.log(this.state.league)
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
        <div className="wrapper">
          <h1>Fan Feed</h1>
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
              <option value="">Please select a league</option>
              <option value="mlb">Major League Baseball</option>
              <option value="nhl">National Hockey League</option>
              <option value="nfl">National Football League</option>
              <option value="nba">National Basketball Association</option>
            </select>
            <input
              type="submit"
              value="Go!"
              className="league-submit" />
          </form>
          <PrintTeams teams={this.state.teams}/>
        </div>
      </div>
    );
  }
}

export default App;
