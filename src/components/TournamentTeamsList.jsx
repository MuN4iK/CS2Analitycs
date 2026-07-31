import React from 'react'
import styles from '../assets/TournamentTeamsList.module.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function TournamentTeamsList({ tournamentTeams, teamsData, searchParam }) {
    const [data, setData] = useState(tournamentTeams || teamsData || [])
    return (
        <div className={styles.container} >{data
            .filter(team => team.name.toLowerCase().includes((searchParam ?? '').toLowerCase()))
            .sort((a, b) => { return a.name.localeCompare(b.name) })
            .map((team) => {
                return (
                    <Link className={styles.link} to={`/team/${team.id}`} key={team.id}>
                        <div className={styles.TeamCard} >
                            <img className={styles.logoImage} src={!team.image_url ? '/img/unknown_team.png' : team.image_url} alt="" />
                            <div>{team.name}</div>
                            <img className={styles.logoImage} src={!team.location ? '/img/unknown_country.png' : `https://flagcdn.com/${team.location.toLowerCase()}.svg`} alt="" />
                        </div>
                    </Link>)
            })}
        </div>
    )
}
