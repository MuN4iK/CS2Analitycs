import styles from '../assets/TournamentPlayersList.module.css'
import { Link } from 'react-router-dom'

export default function TournamentPlayersList({ data, searchParam, teamLogo, exception }) {
    return (
        <div className={styles.container} >{data
            .filter(player => player.name.toLowerCase().includes((searchParam ?? '').toLowerCase()))
            .filter(player => Number(player.id) !== Number(exception))
            .sort((a, b) => { a.name.localeCompare(b.name) })
            .map((player) => {
                return (
                    <Link className={styles.link} to={`/player/${player.id}`} key={player.id}>
                        <div className={styles.PlayerCard} >
                            <img className={styles.logoImage} src={player.current_team?.image_url ?? teamLogo ?? '/img/unknown_team.png'} title={player.current_team?.name} />
                            <div>{player.name}</div>
                            <img className={styles.logoImage} src={player.nationality == null ? '/img/unknown_country.png' : `https://flagcdn.com/${player.nationality.toLowerCase()}.svg`} title={player.nationality ?? ''} />
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}
