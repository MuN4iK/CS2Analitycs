import styles from '../assets/HomePage.module.css'
import { useEffect, useState } from 'react'
import { getMatches, getTournamentsByType } from '../service/api/pandascore'
import MatchesCard from '../components/MatchesCard'
import { Link } from 'react-router-dom'
import MatchesList from '../components/MatchesList'

export default function HomePage() {
    const [loading, setLoading] = useState(true)
    const [tournament, setTournament] = useState([])
    const [matches, setMatches] = useState([])

    useEffect(() => {
        async function load() {
            try {
                const [tournamentsData, matchesData] = await Promise.all([
                    getTournamentsByType("Running", 1, 6),
                    getMatches()
                ])
                setTournament(tournamentsData)
                setMatches(matchesData)
                console.log(matchesData)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        load()
    }, [])

    if (loading) {
        return <h1>Loading...</h1>;
    }

    return (
        <>
            <div className={styles.mainInfoContainer}>
                <h2 className={styles.mainInfoSiteTitle}>CS2Analytics</h2>
                <h3 className={styles.mainInfo}>site that provide information about tournaments,teams,players in Counter-Strike 2 community</h3>
            </div>
            <div className={styles.tournaments}>
                <h1 className={styles.tournamentsTitle}>Tournaments are taking place right now</h1>
                <MatchesCard className={styles.tournamentsList} data={tournament} />
                <Link to='/tournaments/running' style={{ gridColumn: '1/3', width: '18%' }}><button className={styles.tournamentsButton}>Learn more</button></Link>
            </div>
            <div className={styles.matches}>
                <h1 className={styles.matchesTitle}>Upcoming matches</h1>
                <MatchesList className={styles.matchessList} data={matches} getWinner={(match) => match.winner} />
            </div>
        </>
    )
}
