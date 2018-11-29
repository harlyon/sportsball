import React, {Component} from 'react';

class Schedule extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div>
        <p>I am the schedule</p>
        {
          Object.entries(this.props.favoriteTeams).map((team) => {
            return (
              <div key={team[0]}>
                <p>{team[1].teamName}</p>
              </div>
            )
          })
        }
      </div>

    )
  }
}

export default Schedule;