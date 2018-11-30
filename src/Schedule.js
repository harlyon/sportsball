import React, {Component} from 'react';
import Axios from 'axios';


class Schedule extends Component {
  constructor() {
    super();
    this.state = {
      games: []
      // games: {}
    }
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

  render() {
    return (
      <div>
        <p>I am the schedule</p>
        {/* {
          this.state.games.map((game) => {
            return (
              <p>{game}</p>
            )
          })
        } */}
        {/* {console.log(this.props.favoriteTeams)} */}
      </div>
    )
  }
}

export default Schedule;