import React from 'react'
import Menu from './components/Menu'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer'
import styles from '../../CS2Analytics/src/assets/Layout.module.css'

export default function Layout() {
    return (
        <div className={styles.layout}>
            <Menu></Menu>
            <main className={styles.content}>
                <Outlet />
            </main>
            <Footer></Footer>
        </div>
    )
}
