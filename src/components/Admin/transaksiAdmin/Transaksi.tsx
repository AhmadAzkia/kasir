import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FaCartPlus, FaEye, FaPlus, FaTimes } from 'react-icons/fa';

const TransaksiAdmin = () => {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [transaksi, setTransaksi] = useState<any[]>([]);
  const [showDetailsPopup, setShowDetailsPopup] = useState(false);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [formData, setFormData] = useState({
    id_transaksi: '', 
    isi_transaksi: '',
    tanggal_transaksi: '',
    total_transaksi: '',
  });

  const getDataTransaksi = async () => {
    try {
      const response = await fetch('https://backendimk.vercel.app/api/transaksi');
      const result = await response.json();
      setTransaksi(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const toggleDetailsPopup = (item: any) => {
    setSelectedItem(item);
    setShowDetailsPopup(!showDetailsPopup);
  };

  const toggleAddPopup = () => {
    setShowAddPopup(!showAddPopup);
  };

  // Memperbarui handleInputChange untuk menangani perubahan pada input username
const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setFormData({ ...formData, [name]: value });
};

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('https://backendimk.vercel.app/api/createTransaksi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id_transaksi: formData.id_transaksi,
          isi_transaksi: formData.isi_transaksi,
          tanggal_transaksi: formData.tanggal_transaksi,
          total_transaksi: formData.total_transaksi
        })
      });
  
      if (!response.ok) {
        throw new Error('Failed to add Transaksi');
      }

      alert('Tambah Transaksi Berhasil!')
  
      // Reset form data jika berhasil ditambahkan
      setFormData({
        id_transaksi: '',
        isi_transaksi: '',
        tanggal_transaksi: '',
        total_transaksi: ''
      });
  
      // Anda mungkin ingin memperbarui data Transaksi setelah menambahkan Transaksi baru
      getDataTransaksi();
  
      setShowAddPopup(false);
    } catch (error) {
      console.error('Error adding Transaksi:', error);
      // Tambahkan logika penanganan kesalahan sesuai kebutuhan Anda
    }
  };
  

  useEffect(() => {
    const getToken = localStorage.getItem('admin');
    if (getToken) {
      setToken(getToken);
    } else {
      router.push('/');
    }
    getDataTransaksi();
  }, []);

  return (
    <div className="min-h-[80vh] bg-[#F8F9FC] ps-64 py-5">
      <div className="max-w-7xl mx-auto">
      <h1 className='text-3xl font-bold'>Log Transaksi Admin</h1>
        <div className="grid grid-cols-3 gap-8 pt-7">
          {transaksi.map((item) => (
            <div key={item.id_transaksi} className="bg-white rounded-lg shadow-md p-4 flex flex-col">
              <h2 className="text-xl font-semibold mb-2">{item.id_transaksi}</h2>
              <p className="text-gray-600">Isi Transaksi    : {item.isi_transaksi}</p>
              <p className="text-gray-600">Tanggal Transaksi : {item.tanggal_tansaksi}</p>
              <p className="text-gray-600">Total Transaksi      : {item.total_transaksi}</p>
              <div className="flex justify-end mt-auto">
                <button
                  onClick={() => toggleDetailsPopup(item)}
                  className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:bg-blue-600 mr-2"
                >
                  <FaEye />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {showDetailsPopup && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg">
            <div className="flex justify-end">
              <button
                onClick={() => setShowDetailsPopup(false)}
                className="text-gray-600 hover:text-gray-800"
              >
                <FaTimes />
              </button>
            </div>
            <h2 className="text-xl font-semibold mb-2">{selectedItem.id_transaksi}</h2>
            <p className="text-gray-600">Isi Transaksi    : {selectedItem.isi_transaksi}</p>
              <p className="text-gray-600">Tanggal Transaksi : {selectedItem.tanggal_tansaksi}</p>
              <p className="text-gray-600">Total Transaksi      : {selectedItem.total_transaksi}</p>
          </div>
        </div>
      )}
      {showAddPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg">
            <div className="flex justify-end">
              <button onClick={toggleAddPopup} className="text-gray-600 hover:text-gray-800">
                <FaTimes />
              </button>
            </div>
            <h2 className="text-xl font-semibold mb-2">Tambah Transaksi</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="id_transaksi">
                  id_transaksi
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="int"
                  name="username"
                  value={formData.id_transaksi}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="isi_transaksi">
                  Isi Transaksi
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="isi_transaksi"
                  type="text"
                  name="isi_transaksi"
                  value={formData.isi_transaksi}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tanggal_transaksi">
                  Tanggal Transaksi
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="tanggal_transaksi"
                  type="text"
                  name="tanggal_transaksi"
                  value={formData.tanggal_transaksi}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="total_transaksi">
                  Total Transaksi
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="total_transaksi"
                  type="text"
                  name="total_transaksi"
                  value={formData.total_transaksi}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Tambah
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransaksiAdmin