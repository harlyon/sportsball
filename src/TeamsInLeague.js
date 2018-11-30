import React from 'react';

// single function component
// ⬇️ destructuring props
const TeamsInLeague = ({teams, fetchTeamSchedule}) => {
  return (
    <div className="team-by-league">
      {
        teams.map((team) => {
          return (
            <div key={team.idTeam}>
              <button
                className="team-button"
                type="checkbox"
                id={team.idTeam}
                value={team.strLeague}
                data-team-name={team.strTeam}
                data-team-badge={team.strTeamBadge}
                onClick={fetchTeamSchedule}>
                  <h2 className="team-name">{team.strTeam}</h2>
                  <img src={team.strTeamBadge} alt={team.strTeam} className="team-badge" />
              </button>
            </div>
          )
        })
      }
    </div>
  )
}

export default TeamsInLeague;