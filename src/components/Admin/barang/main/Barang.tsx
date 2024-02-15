import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FaCartPlus, FaEye, FaPlus, FaTimes } from 'react-icons/fa';

const Main = () => {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [barang, setBarang] = useState<any[]>([]);
  const [showDetailsPopup, setShowDetailsPopup] = useState(false);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [formData, setFormData] = useState({
    nama_barang: '',
    kategori_barang: '',
    harga_barang: '',
    stok_barang: '',
  });

  const getDataBarang = async () => {
    try {
      const response = await fetch('https://backendimk.vercel.app/api/barang');
      const result = await response.json();
      setBarang(result);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Kirim data ke backend atau lakukan operasi lainnya sesuai kebutuhan Anda
    console.log(formData);
    setShowAddPopup(false);
  };

  useEffect(() => {
    const getToken = localStorage.getItem('admin');
    if (getToken) {
      setToken(getToken);
    } else {
      router.push('/');
    }
    getDataBarang();
  }, []);

  return (
    <div className="min-h-[80vh] bg-[#F8F9FC] ps-64 py-5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-3 gap-8">
          {barang.map((item) => (
            <div key={item.id_barang} className="bg-white rounded-lg shadow-md p-4 flex flex-col">
              <h2 className="text-xl font-semibold mb-2">{item.nama_barang}</h2>
              <p className="text-gray-600">Kategori: {item.kategori_barang}</p>
              <p className="text-gray-600">Harga: Rp {item.harga_barang}</p>
              <p className="text-gray-600">Stok: {item.stok_barang}</p>
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
            <h2 className="text-xl font-semibold mb-2">{selectedItem.nama_barang}</h2>
            <p className="text-gray-600">Kategori: {selectedItem.kategori_barang}</p>
            <p className="text-gray-600">Harga: Rp {selectedItem.harga_barang}</p>
            <p className="text-gray-600">Stok: {selectedItem.stok_barang}</p>
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
            <h2 className="text-xl font-semibold mb-2">Tambah Barang</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nama_barang">
                  Nama Barang
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="nama_barang"
                  type="text"
                  name="nama_barang"
                  value={formData.nama_barang}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="kategori_barang">
                  Kategori Barang
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="kategori_barang"
                  type="text"
                  name="kategori_barang"
                  value={formData.kategori_barang}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="harga_barang">
                  Harga Barang
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="harga_barang"
                  type="number"
                  name="harga_barang"
                  value={formData.harga_barang}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stok_barang">
                  Stok Barang
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="stok_barang"
                  type="number"
                  name="stok_barang"
                  value={formData.stok_barang}
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
  Tambah Barang
</button>

    </div>
  );
};

export default Main;
