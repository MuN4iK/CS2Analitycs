import React from 'react'
import styles from '../assets/MatchesList.module.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function MatchesList({ data, getWinner }) {
    return (
        <div className={styles.container} >{data.sort((a, b) => {
            if (!a.begin_at) { return -1 }
            return new Date(b.begin_at) - new Date(a.begin_at)
        }).map((match) => {
            const winner = getWinner(match)

            return (
                <div className={styles.MatchCard} key={match.id}>
                    <div className={styles.MatchCardTitle}>
                        <img className={styles.logoImage} src={match?.opponents[0]?.opponent?.image_url ?? '/img/unknown_team.png'} />
                        <div>{match.name}</div>
                        <img className={styles.logoImage} src={match?.opponents[1]?.opponent?.image_url ?? '/img/unknown_team.png'} />
                    </div>
                    <div className={styles.winner} style={{ display: 'flex', alignContent: "center", color: !winner ? 'white' : '#00ff88' }}>Winner:{!winner ? 'unkown' : <Link style={{ color: "#00ff88" }} to={`/team/${winner.id}`}>{winner?.name}</Link>}
                        <img className={styles.logoImage} style={{ opacity: !winner?.image_url ? 0 : 1 }} src={winner?.image_url} alt="" />
                    </div>

                    <div>Date:{!match.begin_at ? 'unknow' : new Date(match.begin_at).toDateString()}</div>
                    <div>
                        {match.streams_list.find(stream => stream.official == true) ? <a href={match.streams_list.find(stream => stream.official == true)?.raw_url}>Official stream</a> : 'No official stream'}
                    </div>
                </div>)
        })}
        </div>
    )
}
