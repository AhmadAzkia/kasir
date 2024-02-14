import React from 'react'
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Inter } from "next/font/google";
import Header from '../../components/Kasir/dashboardKasir/Header'
import SideMenu from '../../components/Kasir/dashboardKasir/SideMenu'
import Footer from '../../components/Kasir/dashboardKasir/footer/Footer';
import Main from '../../components/Kasir/dashboardKasir/main/Main';

const inter = Inter({ subsets: ["latin"] });
const Dashboard = () => {
    const router = useRouter();

    // Added Session if not Login, direct to Login. Must Login first!
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
           
            router.push('/'); // Ganti '/login' dengan path halaman login Anda
        }
    }, []);

    return (
        <main className={inter.className}>
            <SideMenu/>
            <Header/>
            <Main/>
            <Footer/>
        </main>
    )
}

export default Dashboard