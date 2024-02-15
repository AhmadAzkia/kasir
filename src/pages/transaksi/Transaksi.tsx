import React from 'react'
import { Inter } from "next/font/google";
import SideMenu from '../../components/Kasir/dashboardKasir/SideMenu';
import Footer from '../../components/Kasir/dashboardKasir/footer/Footer';
import Main from '../../components/Kasir/transaksiKasir/Transaksi';
import Header from '../../components/Kasir/dashboardKasir/Header';

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