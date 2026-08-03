import { useState, useEffect } from 'react';
import MatchesCard from '../components/MatchesCard.jsx'
import styles from '../assets/App.module.css';
import { getTournamentsByType } from '../service/api/pandascore.jsx';
import SearchingBar from '../components/SearchingBar.jsx';

function TournamentsPage() {
    const [tournamentData, setTournamentData] = useState([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(true)
    const [sortParam, setSortParam] = useState('All')



    useEffect(() => {
        async function load() {
            try {
                const data = await getTournamentsByType(sortParam, page, 9)
                setTournamentData(prev => {
                    return page === 1
                        ? data
                        : [...prev, ...data.filter(t => !prev.some(p => p.id === t.id))]
                })
                console.log(data)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        load()
    }, [sortParam, page]);





    if (loading) {
        return <h1>Loading...</h1>;
    }
    console.log(sortParam)
    return (
        <div className={styles.main}>
            <SearchingBar page={'Tournaments'} sortParam={sortParam} setSortParam={setSortParam} />
            <div className={styles.page}>
                <MatchesCard data={tournamentData} style={{ margin: '50px' }} />
                <div style={{ width: "35%", gridColumn: "1/4", flexBasis: '100%' }} >
                    <button className={styles.moreButton} style={{ display: 'block' }}
                        onClick={() => { setPage(prev => prev + 1) }}>Show more</button>
                </div>
            </div>
        </div>
    )
}

export default TournamentsPage


