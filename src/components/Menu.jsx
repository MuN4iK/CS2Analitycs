import { Link } from 'react-router-dom';
import styles from '../assets/App.module.css'

export default function Menu() {
    return (
        <div className={styles.menu}>
            <div className={styles.logo}>Devil May Bet</div>
            <div className={styles.menuElem}><Link className={styles.menuLink} to='/'>Home</Link></div>
            <div className={styles.menuElem}><Link className={styles.menuLink} to='/teams'>Teams</Link></div>
            <div className={styles.menuElem}><Link className={styles.menuLink} to='/players'>Players</Link></div>
            <div className={styles.menuElem}><div className={styles.menuLink}><Link to='/tournaments/' className={styles.menuLink}>Tournaments</Link></div>
            </div>
        </div>
    )
}
