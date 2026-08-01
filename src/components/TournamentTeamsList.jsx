import React from 'react'
import styles from '../assets/TournamentTeamsList.module.css'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function TournamentTeamsList({ tournamentTeams, teamsData, searchParam, sortParam }) {
    const data = tournamentTeams || teamsData || []
    const visibleTeams = [...data]
        .filter(team =>
            team.name.toLowerCase().includes((searchParam ?? "").toLowerCase())
        )
        .sort((a, b) => {
            switch (sortParam) {
                case "Name":
                    return a.name.localeCompare(b.name);

                case "Players":
                    return b.players.length - a.players.length;

                default:
                    return 0;
            }
        });

    console.log(data[0]);

    return (
        <div className={styles.container} >{
            visibleTeams.map((team) => {
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
