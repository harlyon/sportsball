import React, { Component } from 'react';
import firebase from './firebase';
import swal from 'sweetalert';
import { BrowserRouter as Router, Route, NavLink, Redirect } from 'react-router-dom';
import './styles/styles.scss';

import DisplayLeagues from './DisplayLeagues';
import DisplayFavoriteTeams from './DisplayFavoriteTeams';
import DisplaySchedules from './DisplaySchedules';
import About from './About';


const moment = require('moment');
moment().format();
const currentYear = moment().format('YYYY')

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account'
});
const auth = firebase.auth();

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      favoriteTeams: {},
    }
  }
  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          user: user
        }, () => {
          firebase.database().ref(`/${this.state.user.uid}`).on('value', (snapshot) => {
            this.setState({
              favoriteTeams: snapshot.val()
            })
          })
        });
      }
    });
  }
  loginGoogle = () => {
    auth.signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        this.setState({
          user: user
        });
      });
  }
  loginGuest = () => {
    firebase.auth().signInAnonymously();
    swal('By logging in as a guest your preferences will not be saved.')
  }
  logout = () => {
    auth.signOut()
      .then(() => {
        this.setState({
          user: null
        });
      });
  }
  render() {
    return (
      <Router>
        <div className="App">
          <div>
            <header className="header">
              <div className="wrapper">
                <h1 className="header__title">Sportsball</h1>
                {
                  this.state.user &&
                  <div className="header__name-container">
                    <p className="header__name">{this.state.user.displayName !== null ? this.state.user.displayName : 'Guest'}</p>
                    <button onClick={this.logout} className="header__log-out">Log Out</button>
                  </div>
                }
                <nav className="nav">
                  <NavLink to="/schedules" className="nav__link" activeClassName="active">Schedules</NavLink>
                  <NavLink to="/my-teams" className="nav__link" activeClassName="active">My Teams</NavLink>
                  <NavLink to="/leagues" className="nav__link" activeClassName="active">Leagues</NavLink>
                  <NavLink to="/about" className="nav__link" activeClassName="active">About</NavLink>
                </nav>
              </div>
            </header>
            <main>
            </main>
            {
              this.state.user
              ?
              (
                <main className="main main--logged-in">
                  <div className="wrapper">
                      <Route exact path='/' render={() => <Redirect to='/schedules' /> } />
                      <Route path="/schedules" render={(props) => <DisplaySchedules {...props} favoriteTeams={this.state.favoriteTeams} user={this.state.user} /> } />
                      <Route path="/my-teams" render={(props) => <DisplayFavoriteTeams {...props} favoriteTeams={this.state.favoriteTeams} user={this.state.user} /> } />
                      <Route path="/leagues" render={(props) => <DisplayLeagues {...props} user={this.state.user} /> } />
                      <Route path="/about" component={About}/>
                  </div>
                </main>
              )
              :
              (
                <main className="main main--logged-out">
                  <div className="wrapper">
                    <h2 className="section-title">You must be logged in.</h2>
                    <div className="main__log-in-out-button-container">
                      <button onClick={this.loginGoogle} className="log-in">Log in with Google</button>
                      <button onClick={this.loginGuest} className="log-in">Log in as Guest</button>
                    </div>
                  </div>
                </main>
              )
            }
          </div>
          <footer className="footer">
            <div className="wrapper">
              <p>&copy; Jonathan {currentYear} | <a href="https://jonathanhoy.com/" className="portfolio-link">Back to Portfolio</a></p>
              <p>API information courtesy of <a href="https://www.thesportsdb.com/api.php">TheSportsDB</a></p>
            </div>
          </footer>
        </div>
      </Router>
    );
  }
}

export default App;