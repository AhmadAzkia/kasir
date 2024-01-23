import React from 'react'
import { Inter } from "next/font/google";
import SideMenu from '../components/SideMenu';
import Footer from '../components/footer/Footer';
import Main from '../components/main/Main';
import Header from '../components/Header';

const inter = Inter({ subsets: ["latin"] });
const Transaksi = () => {
    return (
        <main className={inter.className}>
            <SideMenu/>
            <Header/>
            <Main/>
            <Footer/>
        </main>
    )
}

export default Transaksi