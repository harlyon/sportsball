import React, {Component} from 'react';
import NoFavoriteTeams from './NoFavoriteTeams';
import Axios from 'axios';
import firebase from './firebase';

const moment = require('moment');
moment().format();

class DisplaySchedules extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     favoriteTeamsSchedules: {}
  //   }
  // }
  componentDidMount() {
    // this.setState({
    //   favoriteTeamsSchedules: this.props.favoriteTeams
    // })
    this.updateSchedules();
  }
  componentDidUpdate(prevProps) {
    if (this.props.favoriteTeams !== prevProps.favoriteTeams) {
      this.updateSchedules();
    }
  }
  updateSchedules = () => {
    if (this.props.favoriteTeams) {
      Object.entries(this.props.favoriteTeams)
      // eslint-disable-next-line
        .map((team) => {
          const firebaseKey = team[0];
          const teamID = team[1].teamID;
          Axios.get(`https://www.thesportsdb.com/api/v1/json/1/eventsnext.php?id=${teamID}`, {
          }).then((res) => {
            if (res.data.events !== null) {
              const upcomingGames = res.data.events.map((game) => {
                const regDate = moment(`${game.dateEvent}`, 'YYYY-MM-DD').format('dddd, MMMM D, YYYY');
                const nbaDate = moment(`${game.dateEvent} ${game.strTime}`, 'YYYY-MM-DD HH:mm').subtract(5, 'hours').format('dddd, MMMM D, YYYY');
                if (game.strLeague === 'NHL') {
                  return [regDate, game.strHomeTeam, game.strAwayTeam]
                } else if (game.strLeague === 'NBA') {
                  return [nbaDate, game.strAwayTeam, game.strHomeTeam]
                } else {
                  return [regDate, game.strAwayTeam, game.strHomeTeam]
                }
              });
              const teamRef = firebase.database().ref(`/${this.props.user.uid}/${firebaseKey}/teamSchedule`);
              teamRef.set(upcomingGames);
            }
          })
        })
    }
  }
  displaySchedules = () => {
    return (
      <div className="schedule">
        {
          Object.entries(this.props.favoriteTeams).map((team) => {
            return (
              <div
                key={team[0]}
                className="schedule__team-card"
                style={{
                  background: `linear-gradient(rgba(255,255,255,0.95), rgba(255,255,255,0.95)), url(${team[1].teamBadge})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}>
                <div className="schedule__team-info">
                  <h2 className="schedule__team-name">{team[1].teamName}</h2>
                  <p className="schedule__team-league">{team[1].teamLeague}</p>
                </div>
                <div>
                  {
                    team[1].teamSchedule
                    ?
                    team[1].teamSchedule.map((game) => {
                      const today = moment().format('dddd MMMM D, YYYY');
                      const yesterday = moment().subtract(1, 'day').format('dddd MMMM D, YYYY');
                      const tomorrow = moment().add(1, 'day').format('dddd MMMM D, YYYY');
                      let dateOfMatch = game[0];
                      const awayTeam = game[1];
                      const homeTeam = game[2];
                      if (dateOfMatch === today) {
                        dateOfMatch = 'Today';
                      } else if (dateOfMatch === yesterday) {
                        dateOfMatch = 'Yesterday';
                      } else if (dateOfMatch === tomorrow) {
                        dateOfMatch = 'Tomorrow';
                      };
                      return (
                        <div key={dateOfMatch} className="event">
                          <p>
                            <span className="event__away-team">{awayTeam}</span>
                            {team[1].teamName === awayTeam ? ' @ ' : ' vs. '}
                            <span className="event__home-team">{homeTeam}</span>
                          </p>
                          <p className="event__date">{dateOfMatch}</p>
                        </div>
                      )
                    })
                    :
                    this.offseason(team[1].teamName)
                  }
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }
  offseason = (teamName) => {
    return (
      <div className="event">
        <p className="event__offseason">The {teamName} are currently off-season. Please check back later.</p>
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
          this.displaySchedules()
          :
          <NoFavoriteTeams />
        }
      </div>
    )
  }
}
export default DisplaySchedules;