import React, {Component} from 'react';
import Axios from 'axios';

class Form extends Component {
  constructor() {
    super();
    this.state = {
      league: 4424
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    console.log('form changing', this.state.league);
  }
  getLeague = () => {
    Axios.get(`https://www.thesportsdb.com/api/v1/json/1/search_all_teams.php?l=4424`)
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: parseInt(e.target.value)
    })
  }
  render() {
    return (
      <div>
        <p>Please select a league.</p>
        <form action="" onSubmit={this.handleSubmit}>
          <select name="league" id="league" placeholder="Please select a league" value={this.state.league} onChange={this.handleChange}>
            <option value="4424">Major League Baseball</option>
            <option value="4380">National Hockey League</option>
            <option value="4391">National Football League</option>
            <option value="4387">National Basketball Association</option>
          </select>
          <input type="submit"/>
        </form>
      </div>
    )
  }
}

export default Form;