import React from 'react';

// single function component
const TeamForm = (props) => {
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
      <fieldset>
        {
          props.teams.map((team) => {
            return (
              <div key={team.idTeam}>
                <input 
                type="checkbox" 
                id={team.idTeam}
                name="team"
                value={team.strLeague}
                data-team-name={team.strTeam}
                data-team-badge={team.strTeamBadge}
                
                onChange={props.captureTeam}/>
                <label htmlFor={team.idTeam}>
                  <h2 className="team-name">{team.strTeam}</h2>
                  <img src={team.strTeamBadge} alt={team.strTeam} className="team-badge" />
                </label>
              </div>
            )
          })
        }
      </fieldset>
    </form>
  )
}

export default TeamForm;