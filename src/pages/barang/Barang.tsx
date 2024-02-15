import React, { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import SideMenu from '../../components/Admin/dashboardAdmin/SideMenu';
import Footer from '../../components/Admin/dashboardAdmin/footer/Footer';
import Main from '../../components/Admin/barang/main/Barang';
import Header from '../../components/Admin/dashboardAdmin/Header/Header';
const inter = Inter({ subsets: ["latin"] });

const Barang = () => {
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

export default Barang;
