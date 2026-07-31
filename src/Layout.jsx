import React from 'react'
import Menu from './components/Menu'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer'

export default function Layout() {
    return (
        <>
            <Menu></Menu>
            <Outlet></Outlet>
            <br />
            <br />
            <Footer></Footer>
        </>
    )
}
