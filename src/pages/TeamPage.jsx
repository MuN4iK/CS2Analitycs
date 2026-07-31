import React, { use } from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import styles from '../assets/TeamPage.module.css'
import { getTeam, getTeamMatchs, getTeamTournaments } from '../service/api/pandascore'
import MatchesList from '../components/MatchesList'
import TournamentPlayersList from '../components/TournamentPlayersList'

export default function TeamPage() {
    const { id } = useParams()
    const [teamData, setTeamData] = useState([])
    const [matchesData, setMatchesData] = useState([])
    const [tournamentsData, setTournamentsData] = useState([])
    const [loading, setLoading] = useState(true)
    const [shownInfo, setShownInfo] = useState('players')

    const matchesWinrate =
        matchesData.filter((match) => { return match.status === 'finished' }).length > 0
            ? ((matchesData.filter((match) => match.winner_id === Number(id)).length / matchesData.filter((match) => match.status === 'finished').length).toFixed(1) * 100)
            : 0

    const TournamentsWinrate =
        tournamentsData.length > 0
            ? ((tournamentsData.filter((tour) => tour.winner_id === Number(id)).length / tournamentsData.length) * 100)
            : 0

    function winrateGradient(percent) {
        const red = Math.round(255 * (100 - percent) / 100)
        const green = Math.round(255 * percent / 100)
        return `rgb(${red},${green},0)`
    }

    useEffect(() => {
        async function load() {
            try {
                const [team, matchs, tournaments] = await Promise.all([
                    getTeam(id),
                    getTeamMatchs(id),
                    getTeamTournaments(id)
                ]);
                setTeamData(team)
                setMatchesData(matchs)
                setTournamentsData(tournaments)

            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        load()
        setShownInfo('players')
    }, [id])
    if (loading) {
        return (<h1>Loading...</h1>)
    }
    return (
        <div >
            <div className={styles.mainInfoContainer}>
                <img className={styles.logoImage} src={!teamData.image_url ? '../../public/img/unknown_team.png' : teamData.image_url} alt="" />
                <div className={styles.mainInfo}>
                    <span style={{ gridColumn: "1/3", fontSize: "27px" }}> {teamData.name}</span>
                    <span>Matches played:{matchesData.filter((match) => match.status === 'finished').length}<sup style={{ color: winrateGradient(matchesWinrate) }}>{matchesWinrate}%  </sup></span>
                    <span>Tournaments participated:{tournamentsData.length}<sup style={{ color: winrateGradient(TournamentsWinrate) }}>{TournamentsWinrate}%</sup></span>
                </div>
                <img className={styles.logoImage} src={!teamData.location ? '../../public/img/unknown_country.png' : `https://flagcdn.com/${teamData.location.toLowerCase()}.svg`} alt="" />
            </div>
            <div className={styles.secondaryInfo}>
                <div className={styles.TournamentInfoMenu}>
                    <span style={{ marginLeft: '10px' }} onClick={() => setShownInfo("players")}>Players</span>
                    <span style={{ marginRight: '10px' }} onClick={() => setShownInfo("matches")}>Matches</span>
                </div>
                {shownInfo == 'players' ? <TournamentPlayersList data={teamData.players} teamLogo={teamData.image_url} /> : <MatchesList data={matchesData} getWinner={(match) => match.winner} />}
            </div>
        </div >
    )
}
