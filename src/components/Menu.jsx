import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../assets/App.module.css'

export default function Menu() {
    const [open, setOpen] = useState(false);
    return (
        <div className={styles.menu}>
            <div className={styles.logo}>Devil May Bet</div>
            <div className={styles.menuElem}><Link className={styles.menuLink} to='/'>Home</Link></div>
            <div className={styles.menuElem}><Link className={styles.menuLink} to='/teams'>Teams</Link></div>
            <div className={styles.menuElem}><Link className={styles.menuLink} to='/players'>Players</Link></div>
            <div className={styles.menuElem}><div className={styles.dropdown}>
                <button className={styles.dropdownMenuButton} onClick={() => setOpen(!open)}>Tournaments</button>
                {open && (
                    <div className={styles.dropdownMenu}>
                        <Link to='/tournaments/running' className={styles.menuLink} onClick={() => setOpen(!open)}><div>running</div></Link>
                        <Link to='/tournaments/upcoming' className={styles.menuLink} onClick={() => setOpen(!open)}><div>upcoming</div></Link>
                        <Link to='/tournaments/past' className={styles.menuLink} onClick={() => setOpen(!open)}><div>past</div></Link>
                    </div>
                )}
            </div>
            </div>
        </div>
    )
}
