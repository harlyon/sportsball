import React from 'react';

// single function component
const PrintTeams = (props) => {
  return (
    <ul className="league-grid">
      {
        props.teams.map((team) => {
          return (
            <li key={team.idTeam}>
              <h2 className="team-name">{team.strTeam}</h2>
              <img src={team.strTeamBadge} alt={team.strTeam} className="team-badge"/>
            </li>
          )
        })
      }
    </ul>
  )
}

export default PrintTeams;