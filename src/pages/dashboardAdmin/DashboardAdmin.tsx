import React from 'react'
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Inter } from "next/font/google";
import Header from '../../components/Admin/dashboardAdmin/Header'
import SideMenu from '../../components/Admin/dashboardAdmin/SideMenu'
import Footer from '../../components/Admin/dashboardAdmin/footer/Footer';
import Main from '../../components/Admin/dashboardAdmin/main/Main';

const inter = Inter({ subsets: ["latin"] });
const DashboardAdmin = () => {
    const router = useRouter();

    // Added Session if not Login, direct to Login. Must Login first!
    useEffect(() => {
        const token = localStorage.getItem('admin');
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

export default DashboardAdmin