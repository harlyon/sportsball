import React, {Component} from 'react';
import NoFavoriteTeams from './NoFavoriteTeams';

class About extends Component {
  render() {
    return (
      <section className="about">
        <h2 className="section-title">About</h2>
        <h3 className="about__heading">Introduction</h3>
        <p className="about__text">Sportsball is an app designed to connect you to your favorite sports teams! Quickly view the upcoming schedules of your favourite teams so you'll never miss a game.</p>
        <h3 className="about__heading">How to Use</h3>
        <p className="about__text">Select the <strong>Leagues</strong> tab to view the list of leagues supported by the app. Choose a league to see all teams in that league. Select a team to have that team added to your list of favourite teams.</p>
        <p className="about__text">Under the <strong>Schedules</strong> tab you can see the upcoming schedule for each of your favourite teams. Click <i className="fas fa-sync-alt"></i> to refresh team schedules.</p>
        <p className="about__text">You can edit your list of favourite teams in the <strong>My Teams</strong> tab.</p>
        <NoFavoriteTeams />
      </section>
    )
  }
}

export default About;