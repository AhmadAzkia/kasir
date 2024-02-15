import React from 'react'
import { Inter } from "next/font/google";
import SideMenu from '../../components/Admin/dashboardAdmin/SideMenu';
import Footer from '../../components/Admin/dashboardAdmin/footer/Footer';
import Main from '../../components/Admin/tambahKasir/Kasir';
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