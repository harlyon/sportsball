import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class NoFavoriteTeams extends Component {
  render() {
    return (
      <div className="not-a-fan-banner">
        <p>Not a fan?</p>
        <Link to="/leagues">Find some teams to follow!</Link>
      </div>
    )
  }
}

export default NoFavoriteTeams;