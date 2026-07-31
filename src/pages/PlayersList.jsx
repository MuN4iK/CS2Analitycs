import React, { use } from 'react'
import { useEffect, useState } from 'react'
import styles from '../assets/PlayersList.module.css'
import { getPlayers } from '../service/api/pandascore'
import TournamentPlayersList from '../components/TournamentPlayersList'

export default function PlayersList() {
    const [playersData, setPlayersData] = useState([])
    const [searchParam, setSearchParam] = useState('')
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
            <div className={styles.sortingMenu}>
                <img className={styles.searchingBarIcon} src='../../img/searchingBar.png' alt="" />
                <input className={styles.searchingBar} type="text" placeholder='Searching...' onChange={(e) => { setSearchParam(e.target.value) }} />
            </div>
            <div className={styles.PlayersList}>
                <TournamentPlayersList data={playersData} searchParam={searchParam} />
            </div>
        </div>
    )
}
