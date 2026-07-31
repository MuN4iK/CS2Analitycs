import { useState, useEffect } from 'react';
import MatchesCard from '../components/MatchesCard.jsx'
import Card from 'react-bootstrap/Card';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styles from '../assets/App.module.css';
import { getTournamentsByType } from '../service/api/pandascore.jsx';

function TournamentsPage() {
    const [tournamentData, setTournamentData] = useState([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(true)
    const { type } = useParams()


    useEffect(() => {
        async function load() {
            try {
                const data = await getTournamentsByType(type, page)
                setTournamentData(prev => {
                    const ids = new Set(prev.map(t => t.id))

                    const unique = data.filter(t => !ids.has(t.id))

                    return [...prev, ...unique]
                })
                console.log(type)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        load()
    }, [type, page]);

    useEffect(() => {
        setTournamentData([]);
        setPage(1);
    }, [type]);



    if (loading) {
        return <h1>Loading...</h1>;
    }
    return (
        <div className={styles.main}>
            <div className={styles.page}>
                <div style={{ gridColumn: "1/3", color: 'white', textAlign: 'center', flexBasis: '100%', fontSize: '46px', fontFamily: 'Sans-serif' }}>{type.charAt(0).toLocaleUpperCase() + type.slice(1)} tournaments</div>
                <MatchesCard data={tournamentData} style={{ margin: '50px' }} ></MatchesCard>
                <div style={{ width: "35%", gridColumn: "1/3", flexBasis: '100%' }} >
                    <button className={styles.moreButton} style={{ display: 'block' }}
                        onClick={() => { setPage(prev => prev + 1) }}>Show more</button>
                </div>
            </div>
        </div>
    )
}

export default TournamentsPage


