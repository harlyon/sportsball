import React, {Component} from 'react';

class DisplayFavoriteTeams extends Component {
  // constructor() {
  //   super();
  // }
  render() {
    return (
      <div>
        <h2>My teams</h2>
        <section className="display-teams">
          {
            this.props.favoriteTeams
            ? 
            Object.entries(this.props.favoriteTeams).map((team) => {
              return (
                <div key={team[0]}>
                  <h3>{team[1].teamName}</h3>
                  <img src={team[1].teamBadge} alt={team[1].teamName}/>
                  <p>League: {team[1].teamLeague}</p>
                  <button 
                    onClick={this.props.removeTeam} 
                    id={team[0]}>
                    Remove team
                  </button>
                </div>
              )
            })
            :
            <p>Not a fan?</p>
          }
        </section>
      </div>
    )
  }
}

export default DisplayFavoriteTeams;