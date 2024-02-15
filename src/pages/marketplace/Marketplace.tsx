import React, { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import SideMenu from '../../components/Kasir/dashboardKasir/SideMenu';
import Footer from '../../components/Kasir/dashboardKasir/footer/Footer';
import Main from '../../components/Kasir/marketplace/main';
import Header from '../../components/Kasir/dashboardKasir/Header';
const inter = Inter({ subsets: ["latin"] });

const Marketplace = () => {
    const [getDataBarang, setDataBarang] = useState([]);

    const getBarang = async () => {
        try {
            // Get From API
            const response = await fetch('http://localhost:3001/api/barang')

            // convert to Json
            const result = await response.json()

            setDataBarang(result)
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() => {
        getBarang();
    }, []);

    return (
        <main className={inter.className}>
        <SideMenu/>
        <Header/>
        <Main />
        <Footer/>
    </main>
    );
}

export default Marketplace;
