import React, {Component} from 'react';
import Axios from 'axios';


class Schedule extends Component {
  constructor() {
    super();
    this.state = {
      games: []
    }
  }
  componentDidMount() {
    // console.log(this.props.favoriteTeams);
    this.fetchSchedules();
  }
  fetchSchedules = () => {
    Promise.all(Object.entries(this.props.favoriteTeams).map((team) => {
      return Axios.get(`https://www.thesportsdb.com/api/v1/json/1/eventsnext.php?id=${team[1].teamID}`)
    })).then((res) => {
      return (res.map((schedule) => {
        return schedule.data.events.map((game) => {
          // return (
          //   <p>{ga`me.strEvent}</p>
          // )

          console.log(game.strEvent)
          // this.setState({
          //   games: games.push(game.strEvent)
          // })
        })
      }))
    })
  }
  render() {
    return (
      <div>
        <p>I am the schedule</p>
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