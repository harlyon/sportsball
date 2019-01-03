import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class NoFavoriteTeams extends Component {
  render() {
    return (
      <div className="noFavoriteTeams">
        <Link to="/leagues" className="noFavoriteTeams__link">Find some teams to follow!</Link>
      </div>
    )
  }
}

export default NoFavoriteTeams;