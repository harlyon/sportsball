import React, {Component} from 'react';
import Axios from 'axios';


class Schedule extends Component {
  // constructor() {
  //   super();
  // }
  displaySchedule = (category) => {
    return (
      <div>
        <h2>{category}</h2>
        {
          Object.entries(this.props.favoriteTeams)
          .filter((league) => {
            if (league[1].teamLeague === `${category}`) {
              return true;
            };
          })
          .map((team) => {
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
        }
      </div>
    )
  }
  displayAllSchedules = (nhl, nba, nfl) => {
    this.displaySchedule(nhl);
    this.displaySchedule(nba);
    this.displaySchedule(nfl);
    // this.displaySchedule(mlb);
    console.log('hello?')
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
          this.displayAllSchedules('NHL', 'NBA', 'NFL')
          // this.displaySchedule('NFL')
          :
          this.noSchedule()
        }
      </div>
    )
  }
}

export default Schedule;