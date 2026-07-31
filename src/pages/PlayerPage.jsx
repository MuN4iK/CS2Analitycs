import React, { use, useEffect, useState } from 'react'
import { useBeforeUnload, useParams } from 'react-router-dom'
import { getPlayer, getPlayerMatches, getPlayerTournaments, getTeam } from '../service/api/pandascore'
import styles from "../assets/PlayerPage.module.css"
import MatchesList from '../components/MatchesList'
import MatchesCard from '../components/MatchesCard'
import TournamentPlayersList from '../components/TournamentPlayersList'

export default function PlayerPage() {
    const [player, setPlayer] = useState([])
    const [matches, setMatches] = useState([])
    const [tournaments, setTournaments] = useState([])
    const [team, setTeam] = useState([])
    const [loading, setLoading] = useState(true)
    const [shownInfo, setShownInfo] = useState('MatchesPage')
    const { id } = useParams()
    const pages = {
        MatchesPage: <MatchesList data={matches} getWinner={(match) => match.winner} />,
        TeammatesPage: <TournamentPlayersList data={team.players} teamLogo={team.image_url} exception={id} />,
        TournamentsPage: <div className={styles.TournamentsList}><MatchesCard data={tournaments} /></div>
    }


    const finishedMatches = matches.filter(
        match => match.status === "finished"
    );

    const wonMatches = finishedMatches.filter(
        match => Number(match.winner_id) === Number(player.current_team?.id)
    );

    const matchesWinrate =
        finishedMatches.length > 0
            ? ((wonMatches.length / finishedMatches.length) * 100).toFixed(0)
            : 0;

    function winrateGradient(percent) {
        const red = Math.round(255 * (100 - percent) / 100)
        const green = Math.round(255 * percent / 100)
        return `rgb(${red},${green},0)`
    }

    useEffect(() => {
        async function load() {
            try {

                const playerData = await getPlayer(id)

                const [matchesData, tournamentsData, teamData] = await Promise.all([
                    getPlayerMatches(id),
                    getPlayerTournaments(id),
                    getTeam(playerData.current_team.id)
                ])
                setPlayer(playerData)
                setMatches(matchesData)
                setTournaments(tournamentsData)
                setTeam(teamData)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
                setShownInfo('MatchesPage')
            }
        }
        load()
    }, [id])

    if (loading) {
        return <h1>Loading...</h1>;
    }
    return (
        <>
            <div className={styles.mainInfoContainer}>
                <img className={styles.PlayerImg} src={player.image_url ?? '../../img/default_avatar.png'} />
                <div className={styles.mainInfo}>
                    <span style={{ gridColumn: '1/3', fontSize: '45px' }} >{player.name}</span>
                    <span>Fullname:{`${player.first_name ?? ''} ${player.last_name ?? ''}`.trim()}</span>
                    {!player.nationality ? 'unknown' : (
                        <span className={styles.nationality}>
                            Nationality:{player.nationality}
                            <img src={`https://flagcdn.com/${player.nationality.toLowerCase()}.svg`} />
                        </span>
                    )}
                    {!player.current_team ? 'Current team:none' : (
                        <span className={styles.current_team}>
                            Current team:{player.current_team.name}
                            <img src={player.current_team.image_url ?? '../../public/img/unknown_team.png'} title={player.current_team.id} />
                        </span>
                    )}
                    <span>Matches played:{matches.filter((match) => match.status === 'finished').length}<sup style={{ color: winrateGradient(matchesWinrate) }}>{matchesWinrate}%  </sup></span>
                </div>
            </div>
            <div className={styles.secondaryInfo}>
                <div className={styles.PlayerInfoMenu}>
                    <span style={{ marginRight: '10px' }} onClick={() => setShownInfo("MatchesPage")}>Matches</span>
                    <span style={{ marginLeft: '10px' }} onClick={() => setShownInfo("TeammatesPage")}>Teammates</span>
                    <span style={{ marginLeft: '10px' }} onClick={() => setShownInfo("TournamentsPage")}>Tournaments</span>
                </div>
                {pages[shownInfo]}
            </div>
        </>
    )
}
