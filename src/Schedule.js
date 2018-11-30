import React, {Component} from 'react';
import Axios from 'axios';


class Schedule extends Component {
  constructor() {
    super();
  }
  displayFavoriteTeams = () => {
    return (
      Object.entries(this.props.favoriteTeams).map((team) => {
        // console.log(team[1]);
        return (
          <div key={team[0]}>
            <h2>{team[1].teamName}</h2>
            <h3>Schedule</h3>
            <div>
              {
                team[1].teamSchedule.map((game) => {
                  console.log(game)
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
  render() {
    return (
      <div>
        {this.displayFavoriteTeams()}
      </div>
    )
  }
}

export default Schedule;