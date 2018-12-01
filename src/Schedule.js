import React, {Component} from 'react';
import Axios from 'axios';


class Schedule extends Component {
  constructor() {
    super();
  }
  displaySchedule = () => {
    return (
      Object.entries(this.props.favoriteTeams).map((team) => {
        // console.log(team[1]);
        return (
          <div key={team[0]}>
            <h2>{team[1].teamName}</h2>
            <div>
              {
                team[1].teamSchedule.map((game) => {
                  return (
                    <p>{game}</p>
                  )
                })
              }
            </div>
          </div>
        ) 
      })
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
          this.displaySchedule()
          :
          this.noSchedule()
        }
      </div>
    )
  }
}

export default Schedule;