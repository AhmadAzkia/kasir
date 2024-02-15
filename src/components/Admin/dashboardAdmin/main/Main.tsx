import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const Main = () => {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [incomeData, setIncomeData] = useState<any>(null);

  useEffect(() => {
    const getToken = localStorage.getItem('admin');
    if (getToken) {
      setToken(getToken);
      fetch('http://localhost:3001/api/transaksi/pemasukan')
        .then(response => response.json())
        .then(data => setIncomeData(data))
        .catch(error => console.error('Error fetching data:', error));
    } else {
      router.push('/');
    }
  }, []);

  return (
    <div className='min-h-[80vh] bg-[#F8F9FC] ps-64'>
      {token && <div className="text-3xl font-semibold text-gray-800 pt-5 ml-10">Selamat Datang, {token}!</div>}
      {incomeData && (
        <div className="flex justify-around mt-8">
          <div className="p-4 border border-gray-300 w-80 rounded-md bg-white shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-center text-blue-600">Pendapatan Harian</h2>
            <div className="flex justify-between items-center py-2 px-4 bg-gray-100 mb-2 rounded-md">
              <span className="text-gray-700">Hari Ini</span>
              <span className="text-green-600 font-semibold">{incomeData.todayIncome}</span>
            </div>
          </div>
          <div className="p-4 border border-gray-300 w-80 rounded-md bg-white shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-center text-blue-600">Pendapatan Bulanan</h2>
            <div className="flex justify-between items-center py-2 px-4 bg-gray-100 mb-2 rounded-md">
              <span className="text-gray-700">Bulan Ini</span>
              <span className="text-green-600 font-semibold">{incomeData.thisMonthIncome}</span>
            </div>
          </div>
          <div className="p-4 border border-gray-300 w-80 rounded-md bg-white shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-center text-blue-600">Pendapatan Tahunan</h2>
            <div className="flex justify-between items-center py-2 px-4 bg-gray-100 mb-2 rounded-md">
              <span className="text-gray-700">Tahun Ini</span>
              <span className="text-green-600 font-semibold">{incomeData.thisYearIncome}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Main;
