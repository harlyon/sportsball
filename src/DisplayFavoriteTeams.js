import React, {Component} from 'react';

class DisplayFavoriteTeams extends Component {
  displayFavoriteTeams = () => {
    return (
      Object.entries(this.props.favoriteTeams).map((team) => {
        if (team[0] !== 'leagues' ) {
          return (
            <div key={team[0]} className="team-tile">
              <img src={team[1].teamBadge} alt={team[1].teamName} />
              <h2>{team[1].teamName}</h2>
              <button
                onClick={this.props.removeTeam}
                id={team[0]}>
                X
              </button>
            </div>
          )
        }
      })
    )
  }
  noFavoriteTeams = () => {
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
        <h2 className="section-title">My teams</h2>
        <section className={this.props.favoriteTeams ? "display-teams" : ''}>
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