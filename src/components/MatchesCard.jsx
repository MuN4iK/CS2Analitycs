import { useState, useEffect } from 'react';
import styles from "../assets/card.module.css"
import { Link } from 'react-router-dom';

function MatchesCard({ data }) {
    return (
        <>
            {
                data.map((tournament) => {
                    const formattedStartDate = new Date(tournament.begin_at).toDateString()
                    const formattedEndDate = new Date(tournament.end_at).toDateString()
                    return (
                        <div key={tournament.id} className={styles.cardBody} >
                            <Link className={styles.cardLink} to={`/tournament/${tournament.id}`}>
                                <h3 className={styles.title}><img style={{ opacity: !tournament.league.image_url ? 0 : 1 }} src={tournament.league.image_url} />{tournament.name}<img style={{ opacity: !tournament.league.image_url ? 0 : 1 }} src={tournament.league.image_url} alt="" /></h3>
                                <div className={styles.container}>
                                    <span>Date</span>
                                    <span>Prizepool</span>
                                    <span>Region</span>
                                    <span>from {formattedStartDate} to {formattedEndDate}</span>
                                    <span>{tournament.prizepool == null ? 'None' : tournament.prizepool}</span>
                                    <span>{tournament.region ?? 'Unknown'}</span>
                                </div>
                            </Link>
                        </div >)
                })}
        </>
    );
}

export default MatchesCard;