import React, { Component } from 'react';
import firebase from './firebase';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import './styles.scss';

import LeagueForm from './LeagueForm';
import DisplayFavoriteTeams from './DisplayFavoriteTeams';
import Schedule from './Schedule'

const dbRef = firebase.database().ref();

class App extends Component {
  constructor() {
    super();
    this.state = {
      favoriteTeams: {},
    }
  }
  componentDidMount() {
    dbRef.on('value', (snapshot) => {
      this.setState({
        favoriteTeams: snapshot.val()
      })
    });
  }
  render() {
    return (
      <Router>
        <div className="App">
          <div>
            <header className="header">
              <div className="wrapper">
                <nav className="nav">
                  <NavLink to="/my-teams" className="nav__link">My Teams</NavLink>
                  <NavLink to="/schedules" className="nav__link">Schedules</NavLink>
                  <NavLink to="/leagues" className="nav__link">Leagues</NavLink>
                </nav>
                <h1 className="header-title">Boxscore Buddy</h1>
              </div>
            </header>
            <main className="main">
              <div className="wrapper">
                  <Route path="/my-teams" render={(props) => <DisplayFavoriteTeams {...props} favoriteTeams={this.state.favoriteTeams} /> } />
                  <Route path="/schedules" render={(props) => <Schedule {...props} favoriteTeams={this.state.favoriteTeams} /> } />
                  <Route path="/leagues" component={LeagueForm} />
              </div>
            </main>
          </div>
          <footer className="footer">
            <p><a href="https://jonathanhoy.com/" className="portfolio-link">Back to Portfolio</a> | &copy; Jonathan 2018</p>
            <p>API information courtesy of <a href="https://www.thesportsdb.com/api.php">TheSportsDB</a></p>
          </footer>
        </div>
      </Router>
    );
  }
}

export default App;
