import React, {Component} from 'react';

class Schedule extends Component {
  constructor() {
    super();
    this.state = {
      leagues: ['NHL', 'NFL', 'NBA']
    }
  }
  displaySchedule = (category) => {
    return (
      <div className="schedule-tile">
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
                        <div key={date}>
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
        {this.state.leagues.includes('NHL') === true
        ?
        this.displaySchedule('NHL')
        :
        null
        }
        {this.state.leagues.includes('NBA') === true
        ?
        this.displaySchedule('NBA')
        :
        null
        }
        {this.state.leagues.includes('NFL') === true
        ?
        this.displaySchedule('NFL')
        :
        null
        }
        {this.state.leagues.includes('MLB') === true
        ?
        this.displaySchedule('MLB')
        :
        null
        }
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