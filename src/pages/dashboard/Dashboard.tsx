import React from 'react'
import { Inter } from "next/font/google";
import Header from '../components/Header'
import SideMenu from '../components/SideMenu'

const inter = Inter({ subsets: ["latin"] });
const Dashboard = () => {
    return (
        <main className={inter.className}>
            <Header/>
            <SideMenu/>
        </main>
    )
}

export default Dashboard