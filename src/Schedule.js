import React, {Component} from 'react';
import Axios from 'axios';


class Schedule extends Component {
  constructor() {
    super();
    this.state = {
      games: []
      // do I even need this???
    }
  }
  componentDidMount() {
    this.fetchSchedules();
  }
  fetchSchedules = () => {
    Promise.all(Object.entries(this.props.favoriteTeams).map((team) => {
      return Axios.get(`https://www.thesportsdb.com/api/v1/json/1/eventsnext.php?id=${team[1].teamID}`)
    })).then((res) => {
      return (res.map((schedule) => {
        return schedule.data.events.map((game) => {
          // console.log(game.strEvent)
          // return (
          //   <p>{game.strEvent}</p>
          // )
          const newGamesArray = Array.from(this.state.games);
          newGamesArray.push(game.strEvent);
          this.setState({
            games: newGamesArray
          })
          // Why isn't the return printing the p tag?
          // The console log is working...
        })
      }))
    })
  }
  render() {
    return (
      <div>
        <p>I am the schedule</p>
        {/* Do I need to call componentDidMount()? */}
        {
          this.state.games.map((game) => {
            return (
              <p>{game}</p>
            )
          })
        }
      </div>
    )
  }
}

export default Schedule;