import React, { use } from 'react'
import { useEffect, useState } from 'react'
import styles from '../assets/PlayersList.module.css'
import { getPlayers } from '../service/api/pandascore'
import TournamentPlayersList from '../components/TournamentPlayersList'
import SearchingBar from '../components/SearchingBar'

export default function PlayersList() {
    const [playersData, setPlayersData] = useState([])
    const [searchParam, setSearchParam] = useState('')
    const [sortParam, setSortParam] = useState('')
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        async function load() {
            try {
                const data = await getPlayers()
                setPlayersData(data.filter(player => player.current_team !== null))
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
            <div className={styles.PlayersList}>
                <TournamentPlayersList data={playersData} searchParam={searchParam} />
            </div>
        </div>
    )
}
