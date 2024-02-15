import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FaCartPlus, FaEye, FaPlus, FaTimes } from 'react-icons/fa';

const Kasir = () => {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [kasir, setKasir] = useState<any[]>([]);
  const [showDetailsPopup, setShowDetailsPopup] = useState(false);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [formData, setFormData] = useState({
    id_kasir: '', 
    username: '',
    nama_kasir: '',
    jenis_kelamin: '',
    password: '',
  });

  const getDataKasir = async () => {
    try {
      const response = await fetch('https://backendimk.vercel.app/api/kasir');
      const result = await response.json();
      setKasir(result);
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
      const response = await fetch('https://backendimk.vercel.app/api/createKasir', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: formData.username,
          nama: formData.nama_kasir,
          jenisKelamin: formData.jenis_kelamin,
          password: formData.password
        })
      });
  
      if (!response.ok) {
        throw new Error('Failed to add kasir');
      }

      alert('Tambah Kasir Berhasil!')
  
      // Reset form data jika berhasil ditambahkan
      setFormData({
        id_kasir: '',
        username: '',
        nama_kasir: '',
        jenis_kelamin: '',
        password: ''
      });
  
      // Anda mungkin ingin memperbarui data kasir setelah menambahkan kasir baru
      getDataKasir();
  
      setShowAddPopup(false);
    } catch (error) {
      console.error('Error adding kasir:', error);
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
    getDataKasir();
  }, []);

  return (
    <div className="min-h-[80vh] bg-[#F8F9FC] ps-64 py-5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-3 gap-8">
          {kasir.map((item) => (
            <div key={item.id_kasir} className="bg-white rounded-lg shadow-md p-4 flex flex-col">
              <h2 className="text-xl font-semibold mb-2">{item.username}</h2>
              <p className="text-gray-600">Nama Kasir    : {item.nama_kasir}</p>
              <p className="text-gray-600">Jenis Kelamin : {item.jenis_kelamin}</p>
              <p className="text-gray-600">Password      : {item.password}</p>
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
            <h2 className="text-xl font-semibold mb-2">{selectedItem.username}</h2>
            <p className="text-gray-600">Nama Kasir    : {selectedItem.nama_kasir}</p>
            <p className="text-gray-600">Jenis Kelamin : {selectedItem.jenis_kelamin}</p>
            <p className="text-gray-600">Password      : {selectedItem.password}</p>
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
            <h2 className="text-xl font-semibold mb-2">Tambah Kasir</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                  Username
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nama_kasir">
                  Nama Kasir
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="nama_kasir"
                  type="text"
                  name="nama_kasir"
                  value={formData.nama_kasir}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="jenis_kelamin">
                  Jenis Kelamin
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="jenis_kelamin"
                  type="text"
                  name="jenis_kelamin"
                  value={formData.jenis_kelamin}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="text"
                  name="password"
                  value={formData.password}
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
    <button
  onClick={toggleAddPopup}
  className="mx-auto mt-8 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-green-600 focus:outline-none"
>
  Tambah Kasir
</button>

    </div>
  );
};

export default Kasir;
