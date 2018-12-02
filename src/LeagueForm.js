import React, {Component} from 'react';

class LeagueForm extends Component {
  displayForm = () => {
    return (
      <section className="league">
        <h2 className="section-title">Leagues</h2>
        <form
          action=""
          className="league-form"
          onSubmit={this.props.handleSubmit}>
          <select
            name="league"
            id="league"
            className="league-select"
            placeholder="Please select a league"
            value={this.props.league}
            onChange={this.props.handleChange}>
            <option value="nhl">National Hockey League</option>
            <option value="nba">National Basketball Association</option>
            <option value="nfl">National Football League</option>
            <option value="mlb">Major League Baseball</option>
          </select>
          <input
            type="submit"
            value="Go!"
            className="league-submit" />
        </form>
      </section>
    )
  }
  render() {
    return (
      <div>
        {
          this.displayForm()
        }
      </div>
    )
  }
}

export default LeagueForm;