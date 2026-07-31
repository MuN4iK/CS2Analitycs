import React from 'react'
import styles from '../assets/Footer.module.css'

export default function Footer() {
    return (
        <>
            <div className={styles.Footer}>
                <div className={styles.FooterTitlte}>CS2Anatilycs</div>
                <span>API used:<a href='https://www.pandascore.co/'>PandaScore</a></span>
                <span>Gift author money for new dmc:<a href='https://steamcommunity.com/profiles/76561199151025278/'>Steam profile</a></span>
                <span>contact number:+380936812739</span>
                <div className={styles.rights}>©All rights reserved</div>
            </div>

        </>
    )
}
