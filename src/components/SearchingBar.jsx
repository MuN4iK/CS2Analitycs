import React from 'react'
import styles from '../assets/SearchingBar.module.css'
import { useState } from 'react'

export default function SearchingBar({ searchParam, setSearchParam, sortParam, setSortParam, teamPage }) {
    const [open, setOpen] = useState(false)
    const [moreButtonState, setMoreButtonState] = useState(true)
    const [selectedSort, setSelectedSort] = useState('Name')
    console.log(selectedSort)
    return (
        <div className={styles.container}>
            <div className={!open ? styles.sortingMenuV1 : styles.sortingMenuV2}>
                <img className={styles.searchingBarIcon} src='./img/searchingBar.png' alt="" />
                <input className={styles.searchingBar} type="text" placeholder='Searching...' onChange={(e) => { setSearchParam(e.target.value) }} />
                {teamPage && (<img className={styles.searchingBarMoreButton} src={!moreButtonState ? './img/moreButtonV2.png' : './img/moreButtonV1.png'} onClick={() => { setMoreButtonState(!moreButtonState), setOpen(!open) }} />)}
            </div>
            {open && teamPage && (
                <div className={styles.dropdownMenu}>
                    <div className={styles.dropdownMenuTop}>
                        <span>Sort by:</span>
                    </div>
                    <div className={styles.dropdownMenuBottom}>
                        <span className={selectedSort === 'Name' ? styles.dropdownMenuBottomElemActive : styles.dropdownMenuBottomElem} onClick={() => { setSelectedSort('Name'), setSortParam('Name') }}>Name</span>
                        <span className={selectedSort === 'Players' ? styles.dropdownMenuBottomElemActive : styles.dropdownMenuBottomElem} onClick={() => { setSelectedSort('Players'), setSortParam('Players') }}>Players count</span>
                    </div>
                </div>
            )}
        </div>
    )
}
