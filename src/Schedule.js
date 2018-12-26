import React, {Component} from 'react';

class Schedule extends Component {
  displaySchedule = () => {
    return (
      Object.entries(this.props.favoriteTeams)
        .map((team) => {
          return (
            <div key={team[0]} className="schedule__team-card">
              <div className="schedule__team-info">
                <img src={team[1].teamBadge} alt="" className="schedule__team-image" />
                <h2 className="schedule__team-name">{team[1].teamName}</h2>
                <p className="schedule__team-league">{team[1].teamLeague}</p>
              </div>
              <div>
                {
                  team[1].teamSchedule.map((game) => {
                    const date = game[0];
                    const awayTeam = game[1];
                    const homeTeam = game[2];
                    return (
                      <div key={date} className="event">
                        <p>
                          <span className="event__away-team">{awayTeam}</span>
                          {team[1].teamName === awayTeam ? ' @ ' : ' vs. '}
                          <span className="event__home-team">{homeTeam}</span>
                        </p>
                        <p className="event__date">{date}</p>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          )
        })
    )
  }

  displayAllSchedules = () => {
    return (
      <div className="schedule">
        {this.displaySchedule()}
      </div>
    )
  }

  noSchedule = () => {
    return (
      <div className="not-a-fan-banner">
        <p>Not a fan?</p>
        <button onClick={this.props.showLeague}>Find some teams to follow!</button>
      </div>
    )
  }
  render() {
    return (
      <div>
        <h2 className="section-title">Schedules</h2>
        {
          this.props.favoriteTeams
          ?
          this.displayAllSchedules()
          :
          this.noSchedule()
        }
      </div>
    )
  }
}
export default Schedule;