import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import styles from "../assets/TournamentInfo.module.css"
import TournamentTeamsList from '../components/TournamentTeamsList'
import MatchesList from '../components/MatchesList'
import { getTeams, getTournamentMatches, getTournament } from '../service/api/pandascore.jsx'

export default function TournamentInfo() {
    const { id } = useParams()
    const [tournamentData, setTournamentData] = useState([])
    const [matchesData, setMatchesData] = useState([])
    const [shownInfo, setShownInfo] = useState('teams')
    const [loading, setLoading] = useState(true)

    const startDate = new Date(tournamentData.begin_at)
    const formattedStartDate = startDate.toDateString()

    const endDate = new Date(tournamentData.end_at)
    const formattedEndDate = endDate.toDateString()

    useEffect(() => {
        async function load() {
            try {
                const [tournament, matches] = await Promise.all([
                    getTournament(id),
                    getTournamentMatches(id)
                ])
                setTournamentData(tournament)
                setMatchesData(matches)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(!loading)
            }
        }
        load()
    }, [id])
    if (loading) {
        return <h1>Loading...</h1>;
    }
    return (
        <>
            <div className={styles.mainInfoContainer} >
                <div className={styles.leagueLogo} style={{ display: !tournamentData.league.image_url ? 'none' : 'flex' }}><img src={tournamentData.league.image_url} /></div>
                <div className={styles.leagueInfo}>
                    <span className={styles.Title}>{tournamentData.name}</span>
                    <span>From {formattedStartDate} to {formattedEndDate}</span>
                    <span>Serie:{!tournamentData.serie.name ? 'none' : tournamentData.serie.name}</span>
                    <span>League:{!tournamentData.league.name ? 'none' : tournamentData.league.name}</span>
                    <span>Prizepool:{!tournamentData.prizepool ? 'none' : tournamentData.prizepool}</span>
                </div>
            </div>
            <div className={styles.secondaryInfo}>
                <div className={styles.TournamentInfoMenu}>
                    <span style={{ marginLeft: '10px' }} onClick={() => setShownInfo("teams")}>Teams</span>
                    <span style={{ marginRight: '10px' }} onClick={() => setShownInfo("matches")}>Matches</span>
                </div>
                {shownInfo == 'teams' ? <TournamentTeamsList tournamentTeams={tournamentData.teams} /> : <MatchesList data={matchesData} getWinner={(match) => match.winner} />}
            </div>
        </>
    )
}
