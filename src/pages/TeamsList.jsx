import React, { use } from 'react'
import { useEffect, useState } from 'react'
import styles from '../assets/TeamsList.module.css'
import TournamentTeamsList from '../components/TournamentTeamsList'
import { getTeams } from '../service/api/pandascore'
import SearchingBar from '../components/SearchingBar'

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
            <SearchingBar searchParam={searchParam} setSearchParam={setSearchParam} />
            <div className={styles.teamsList}>
                <TournamentTeamsList searchParam={searchParam} teamsData={teamsData} />
            </div>
        </div>
    )
}
