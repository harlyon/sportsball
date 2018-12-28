import React, {Component} from 'react';

class TeamsInLeague extends Component {
  render() {
    return (
      <div className="team-grid">
        {
          this.props.teamsByLeague.map((team) => {
            return (
              <div
                className="team"
                key={team.idTeam}
                id={team.idTeam}
                data-team-id={team.idTeam}
                data-team-league={team.strLeague}
                data-team-name={team.strTeam}
                data-team-badge={team.strTeamBadge}
                onClick={this.props.addTeamToFavorites}>
                  <img
                    src={team.strTeamBadge}
                    alt={team.strTeam}
                    className="team__badge"
                    data-team-id={team.idTeam}
                    data-team-league={team.strLeague}
                    data-team-name={team.strTeam}
                    data-team-badge={team.strTeamBadge} />
                  <h2
                    className="team__name"
                    data-team-id={team.idTeam}
                    data-team-league={team.strLeague}
                    data-team-name={team.strTeam}
                    data-team-badge={team.strTeamBadge} >
                    {team.strTeam}
                  </h2>
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default TeamsInLeague;