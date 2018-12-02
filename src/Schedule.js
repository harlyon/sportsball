import React, {Component} from 'react';

class Schedule extends Component {
  displaySchedule = (category) => {
    return (
      <div>
        <h2>{category}</h2>
        {
          Object.entries(this.props.favoriteTeams)
          .filter((league) => {
            const currentLeague = league[1].teamLeague
            if (currentLeague === `${category}`) {
              return true;
            } else {
              return null;
            }
          })
          .map((team) => {
            return (
              <div key={team[0]}>
                <h2>{team[1].teamName}</h2>
                <div>
                  {
                    team[1].teamSchedule.map((game) => {
                      const date = game[0];
                      const awayTeam = game[1];
                      const homeTeam = game[2];
                      return (
                        <div>
                          <p>{date} - {awayTeam} @ {homeTeam}</p>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            ) 
          })
        }
      </div>
    )
  }
  displayAllSchedules = () => {
    return (
      <div>
        {this.displaySchedule('NBA')}
        {this.displaySchedule('NHL')}
        {this.displaySchedule('NFL')}
        {/* {this.displaySchedule('MLB')} */}
      </div>
    )
  }
  noSchedule = () => {
    return (
      <div>
        <p>Not a fan?</p>
        <button onClick={this.props.showLeague}>Find some teams to follow!</button>
      </div>
    )
  }
  render() {
    return (
      <div>
        <h2>Schedules</h2>
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