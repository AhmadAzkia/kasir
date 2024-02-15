import React from 'react';
import Image from 'next/image';
import img from '../../../../public/img/cashier.png';
import { useRouter } from 'next/router';
import Link from 'next/link';


const SideMenu = () => {
  const router = useRouter()

  return (
      <div className='fixed z-10 left-0 top-0 w-60 h-full bg-[#335ACB] font-poppins'>
        <div className="flex items-center pt-4 pb-4 px-4 border-b-2 border-b-white border-opacity-20">
          <i className="ri-computer-line text-4xl text-white -rotate-45"></i>
          <span className='text-xl font-bold text-white ml-10'>ADMIN</span>
        </div>

        <ul className='my-4 mx-4'>
          <li>
            <Link href="/dashboardAdmin"  className={router.pathname == "/dashboard" ? "rounded bg-white text-[#335ACB] flex items-center my-2 py-2 px-4 font-poppins gap-2" : "rounded text-gray-300 flex items-center my-2 py-2 px-4 font-poppins gap-2"}>
              <i className="ri-dashboard-fill text-2xl"></i>
              <span className='text-base'>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link href="/transaksi"  className={router.pathname == "/transaksi" ? "rounded bg-white text-[#335ACB] flex items-center my-2 py-2 px-4 font-poppins gap-2" : "rounded text-gray-300 flex items-center my-2 py-2 px-4 font-poppins gap-2"}>
            <i className="ri-wallet-2-fill text-2xl"></i>
              <span className='text-base'>Transaksi</span>
            </Link>
          </li>
          <li>
            <Link href="/tambahKasir"  className={router.pathname == "/Tambahkasir" ? "rounded bg-white text-[#335ACB] flex items-center my-2 py-2 px-4 font-poppins gap-2" : "rounded text-gray-300 flex items-center my-2 py-2 px-4 font-poppins gap-2"}>
            <i className="ri-customer-service-2-line text-2xl"></i>
              <span className='text-base'>Kasir</span>
            </Link>
          </li>
          <li>
            <Link href="/barang"  className={router.pathname == "/barang" ? "rounded bg-white text-[#335ACB] flex items-center my-2 py-2 px-4 font-poppins gap-2" : "rounded text-gray-300 flex items-center my-2 py-2 px-4 font-poppins gap-2"}>
            <i className="ri-store-3-fill text-2xl"></i>
              <span className='text-base'>Barang</span>
            </Link>
          </li>
          <li>
            <Link href="/customer"  className={router.pathname == "/customer" ? "rounded bg-white text-[#335ACB] flex items-center my-2 py-2 px-4 font-poppins gap-2" : "rounded text-gray-300 flex items-center my-2 py-2 px-4 font-poppins gap-2"}>
            <i className="ri-customer-service-2-fill text-2xl"></i>
              <span className='text-base'>Customer Support</span>
            </Link>
          </li>
          {/* <li className='rounded hover:bg-white'>
            <a href="" className='flex items-center my-2 py-2 px-4 text-gray-300 font-poppins gap-2 hover:text-[#335ACB]'>
            <i className="ri-wallet-2-fill text-2xl"></i>
              <span className='text-base'>Transaksi</span>
            </a>
          </li>
          <li className='rounded hover:bg-white'>
            <a href="" className='flex items-center my-2 py-2 px-4 text-gray-300 font-poppins gap-2 hover:text-[#335ACB]'>
            <i className="ri-shopping-bag-fill text-2xl"></i>
              <span className='text-base'>Penjualan</span>
            </a>
          </li>
          <li className='rounded hover:bg-white'>
            <a href="" className='flex items-center my-2 py-2 px-4 text-gray-300 font-poppins gap-2 hover:text-[#335ACB]'>
            <i className="ri-store-3-fill text-2xl"></i>
              <span className='text-base'>Marketplace</span>
            </a>
          </li>
          <li className='rounded hover:bg-white'>
            <a href="" className='flex items-center my-2 py-2 px-4 text-gray-300 font-poppins gap-2 hover:text-[#335ACB]'>
            <i className="ri-customer-service-2-fill text-2xl"></i>
              <span className='text-base'>Customer Support</span>
            </a>
          </li> */}
        </ul>
      </div>
  );
};

export default SideMenu;
