import React from 'react';

// single function component
const TeamList = (props) => {
  return (
    // <ul className="league-grid">
    //   {
    //     props.teams.map((team) => {
    //       return (
    //         <li key={team.idTeam} className="league-grid-item">
    //           <h2 className="team-name">{team.strTeam}</h2>
    //           <img src={team.strTeamBadge} alt={team.strTeam} className="team-badge"/>
    //         </li>
    //       )
    //     })
    //   }
    // </ul>
    <form action="">
      <div className="team-by-league">
        {
          props.teams.map((team) => {
            return (
              <div key={team.idTeam}>
                <button
                  className="team-button"
                  type="checkbox"
                  id={team.idTeam}
                  value={team.strLeague}
                  data-team-name={team.strTeam}
                  data-team-badge={team.strTeamBadge}
                  onClick={props.captureTeam}>
                    <h2 className="team-name">{team.strTeam}</h2>
                    <img src={team.strTeamBadge} alt={team.strTeam} className="team-badge" />
                </button>
              </div>
            )
          })
        }
      </div>
    </form>
  )
}

export default TeamList;