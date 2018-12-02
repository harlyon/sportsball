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
                className="team-tile"
                type="checkbox"
                id={team.idTeam}
                value={team.strLeague}
                data-team-name={team.strTeam}
                data-team-badge={team.strTeamBadge}
                onClick={fetchTeamSchedule}
                // can't get onTouchStart to work?
                onTouchStart={fetchTeamSchedule}>
                  <img src={team.strTeamBadge} alt={team.strTeam} className="team-badge" />
                  <h2 className="team-name">{team.strTeam}</h2>
              </button>
            </div>
          )
        })
      }
    </div>
  )
}

export default TeamsInLeague;