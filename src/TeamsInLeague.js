import React from 'react';

// single function component
// ⬇️ destructuring props
const TeamsInLeague = ({teams, fetchTeamSchedule}) => {
  return (
    <div className="team-by-league">
      {
        teams.map((team) => {
          return (
            <div key={team.idTeam} id={team.idTeam}>
              <button
                className="team-tile"
                type="checkbox"
                id={team.idTeam}
                data-team-league={team.strLeague}
                data-team-name={team.strTeam}
                data-team-badge={team.strTeamBadge}
                onClick={fetchTeamSchedule}
                >
                <img
                  src={team.strTeamBadge}
                  alt={team.strTeam}
                  className="team-badge" 
                  id={team.idTeam}
                  data-team-league={team.strLeague}
                  data-team-name={team.strTeam}
                  data-team-badge={team.strTeamBadge} />
                <h2
                  className="team-name"
                  id={team.idTeam}
                  data-team-league={team.strLeague}
                  data-team-name={team.strTeam}
                  data-team-badge={team.strTeamBadge} >
                  {team.strTeam}
                </h2>
              </button>
            </div>
          )
        })
      }
    </div>
  )
}

export default TeamsInLeague;