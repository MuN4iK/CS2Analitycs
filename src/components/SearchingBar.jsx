import styles from '../assets/SearchingBar.module.css'
import { useState } from 'react'

export default function SearchingBar({ setSearchParam, sortParam, setSortParam, page }) {
    const [open, setOpen] = useState(false)
    const [moreButtonState, setMoreButtonState] = useState(true)
    // const [selectedSort, setSelectedSort] = useState('Name')
    const sortOption = {
        Teams: [
            'Name',
            'Players'
        ],
        Tournaments: [
            'All',
            'Running',
            'Upcoming',
            'Past'
        ],
        Players: ['Name']
    }

    return (
        <div className={styles.container}>
            <div className={!open ? styles.sortingMenuV1 : styles.sortingMenuV2}>
                <img className={styles.searchingBarIcon} src='/img/searchingBar.png' />
                <input className={styles.searchingBar} type="text" placeholder='Searching...' onChange={(e) => { setSearchParam(e.target.value) }} />
                <img className={styles.searchingBarMoreButton} src={!moreButtonState ? '/img/moreButtonV2.png' : '/img/moreButtonV1.png'} onClick={() => { setMoreButtonState(!moreButtonState), setOpen(!open) }} />
            </div>

            <div className={!open ? styles.dropdownMenuClosed : styles.dropdownMenuActive}>
                <div className={styles.dropdownMenuTop}>
                    <span>Sort by:</span>
                </div>
                <div className={styles.dropdownMenuBottom}>
                    {sortOption[page].map(option => (
                        <span
                            className={sortParam == option ? styles.dropdownMenuBottomElemActive : styles.dropdownMenuBottomElem}
                            onClick={() => setSortParam(option)}
                        >
                            {option}
                        </span>
                    ))
                    }
                </div>
            </div>

        </div>
    )
}
