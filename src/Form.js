import React, {Component} from 'react';
import Axios from 'axios';

class Form extends Component {
  constructor() {
    super();
    this.state = {
      league: 'mlb'
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.getLeague();
  }
  getLeague = () => {
    Axios.get(`https://www.thesportsdb.com/api/v1/json/1/search_all_teams.php?l=${this.state.league}`, {      
    }).then((res) => {
      console.log(this.state.league, res.data.teams);
    })
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
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
          <input type="submit"/>
        </form>
      </div>
    )
  }
}

export default Form;