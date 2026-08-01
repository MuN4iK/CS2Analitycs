import React from 'react'
import styles from '../assets/SearchingBar.module.css'
import { useState } from 'react'

export default function SearchingBar({ searchParam, setSearchParam }) {
    return (
        <div className={styles.sortingMenu}>
            <img className={styles.searchingBarIcon} src='./img/searchingBar.png' alt="" />
            <input className={styles.searchingBar} type="text" placeholder='Searching...' onChange={(e) => { setSearchParam(e.target.value) }} />
        </div>
    )
}
