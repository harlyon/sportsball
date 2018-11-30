import React, {Component} from 'react';
import Axios from 'axios';


class Schedule extends Component {
  constructor() {
    super();
  }
  componentDidMount() {
    // this.fetchSchedules();
  }
  // ARRAY
  // fetchSchedules = () => {
  //   Promise.all(Object.entries(this.props.favoriteTeams).map((team) => {
  //     return Axios.get(`https://www.thesportsdb.com/api/v1/json/1/eventsnext.php?id=${team[1].teamID}`)
  //   })).then((res) => {
  //     return (res.map((schedule) => {
  //       return schedule.data.events.map((game) => {
  //         const newGamesArray = Array.from(this.state.games);
  //         newGamesArray.push(game.strEvent);
  //         this.setState({
  //           games: newGamesArray
  //         })

  //       })
  //     }))
  //   })
  // }

  // fetchSchedules = () => {
  //   Promise.all(Object.entries(this.props.favoriteTeams).map((team) => {
  //     return Axios.get(`https://www.thesportsdb.com/api/v1/json/1/eventsnext.php?id=${team[1].teamID}`)
  //   })).then((res) => {
  //     const thing = res.concat(...this.props.favoriteTeams);
  //     console.log(thing);
  //   })
  // }

  displayFavoriteTeams = () => {
    return (
      Object.entries(this.props.favoriteTeams).map((team) => {
        console.log(team[1]);
        return (
          <div key={team[0]}>
            <h2>{team[1].teamName}</h2>
            <h3>Schedule</h3>

          
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