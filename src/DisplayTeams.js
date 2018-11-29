import React, {Component} from 'react';

class DisplayTeams extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div>
        <h2>My teams</h2>
        {
          Object.entries(this.props.favoriteTeams).map((team) => {
            console.log(team);
            return (
              <div key={team[0]}>
                <h3>{team[1].teamName}</h3>
                <img src={team[1].teamBadge} alt={team[1].teamName}/>
                <p>League: {team[1].teamLeague}</p>
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default DisplayTeams;