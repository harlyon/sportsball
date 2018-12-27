import React, {Component} from 'react';
import firebase from './firebase';
import NoFavoriteTeams from './NoFavoriteTeams';

class DisplayFavoriteTeams extends Component {
  removeTeam = (e) => {
    const firebaseKey = e.target.id;
    const teamRef = firebase.database().ref(`/${firebaseKey}`);
    teamRef.remove();
  }
  displayFavoriteTeams = () => {
    return (
      Object.entries(this.props.favoriteTeams).map((team) => {
        return (
          <div key={team[0]} className="team-tile">
            <img src={team[1].teamBadge} alt={team[1].teamName} />
            <h2>{team[1].teamName}</h2>
            <button
              onClick={this.removeTeam}
              id={team[0]}>
              X
            </button>
          </div>
        )
      })
    )
  }
  render() {
    return (
      <div>
        <h2 className="section-title">My teams</h2>
        <section className={this.props.favoriteTeams && "display-teams"}>
          {
            this.props.favoriteTeams
            ?
            this.displayFavoriteTeams()
            :
            <NoFavoriteTeams />
          }
        </section>
      </div>
    )
  }
}

export default DisplayFavoriteTeams;