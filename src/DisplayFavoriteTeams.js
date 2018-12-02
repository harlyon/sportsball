import React, {Component} from 'react';

class DisplayFavoriteTeams extends Component {
  displayFavoriteTeams = () => {
    return (
      Object.entries(this.props.favoriteTeams).map((team) => {
        return (
          <div key={team[0]}>
            <h3>{team[1].teamName}</h3>
            <img src={team[1].teamBadge} alt={team[1].teamName} />
            <p>League: {team[1].teamLeague}</p>
            <button
              onClick={this.props.removeTeam}
              id={team[0]}>
              Remove team
            </button>
          </div>
        )
      })
    )
  }
  noFavoriteTeams = () => {
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
        <h2 className="section-title">My teams</h2>
        <section className="display-teams">
          {
            this.props.favoriteTeams
            ? 
            this.displayFavoriteTeams()
            :
            this.noFavoriteTeams()
          }
        </section>
      </div>
    )
  }
}

export default DisplayFavoriteTeams;