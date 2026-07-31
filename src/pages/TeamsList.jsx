import React, { use } from 'react'
import { useEffect, useState } from 'react'
import styles from '../assets/TeamsList.module.css'
import TournamentTeamsList from '../components/TournamentTeamsList'
import { getTeams } from '../service/api/pandascore'

export default function TeamsList() {
    const [teamsData, setTeamsData] = useState([])
    const [searchParam, setSearchParam] = useState('')
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        async function load() {
            try {
                const data = await getTeams()
                setTeamsData(data.filter(team => team.players?.length > 0))
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(!loading)
            }
        }
        load()
    }, [])



    if (loading) {
        return <h1>Loading...</h1>;
    }
    return (
        <div className={styles.container}>
            <div className={styles.sortingMenu}>
                <img className={styles.searchingBarIcon} src='../../img/searchingBar.png' alt="" />
                <input className={styles.searchingBar} type="text" placeholder='Searching...' onChange={(e) => { setSearchParam(e.target.value) }} />
            </div>
            <div className={styles.teamsList}>
                <TournamentTeamsList searchParam={searchParam} teamsData={teamsData} />
            </div>
        </div>
    )
}
