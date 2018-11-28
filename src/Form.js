import React, {Component} from 'react';
import Axios from 'axios';
import PrintTeams from './PrintTeams'

class Form extends Component {
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
      <div>
        <p>Please select a league.</p>
        <form action="" onSubmit={this.handleSubmit}>
          <select name="league" id="league" placeholder="Please select a league" value={this.state.league} onChange={this.handleChange}>
            <option value="mlb">Major League Baseball</option>
            <option value="nhl">National Hockey League</option>
            <option value="nfl">National Football League</option>
            <option value="nba">National Basketball Association</option>
          </select>
          <input type="submit" value="Go!"/>
        </form>
        <PrintTeams teams={this.state.teams}/>
      </div>
    )
  }
}

export default Form;