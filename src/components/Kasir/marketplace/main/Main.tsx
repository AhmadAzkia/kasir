import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FaCartPlus, FaShoppingCart, FaTimes } from 'react-icons/fa';

const Main = () => {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [barang, setBarang] = useState<any[]>([]);
  const [cart, setCart] = useState<any[]>([]);
  const [showCart, setShowCart] = useState(false);

  // Fungsi untuk mengambil data barang dari API
  const getDataBarang = async () => {
    try {
      const response = await fetch('https://backendimk.vercel.app/api/barang');
      const result = await response.json();
      setBarang(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Fungsi untuk menambahkan barang ke keranjang
  const addToCart = (item: any) => {
    setCart([...cart, item]);
  };

  // Fungsi untuk menampilkan atau menyembunyikan keranjang
  const toggleCart = () => {
    setShowCart(!showCart);
  };

  // Fungsi untuk menghapus barang dari keranjang
  const removeFromCart = (index: number) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  // Fungsi untuk menghitung jumlah item dalam keranjang berdasarkan id_barang
  const countItemsInCart = (id_barang: any) => {
    return cart.reduce((count, item) => {
      if (item.id_barang === id_barang) {
        count += 1;
      }
      return count;
    }, 0);
  };

  // Fungsi untuk menghitung total harga semua barang dalam keranjang
  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => {
      return total + item.harga_barang;
    }, 0);
  };

  // Fungsi untuk mengirim data transaksi ke API
  const handleSubmitTransaksi = async () => {
    const isiTransaksi = cart.map(item => `${item.nama_barang}: ${item.jumlah}`).join(', ');

    try {
      const response = await fetch('http://localhost:3001/api/transaksi/createTransaksi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          isiTransaksi: isiTransaksi, // Menggunakan id_barang dari setiap item dalam keranjang sebagai isi transaksi
          tanggalTransaksi: new Date().toISOString(), // Menggunakan tanggal saat ini sebagai tanggal transaksi
          totalTransaksi: calculateTotalPrice() // Menggunakan total harga dari semua barang dalam keranjang sebagai total transaksi
        })
      });

      if (!response.ok) {
        throw new Error('Failed to submit transaksi');
      }

      // Jika transaksi berhasil, kosongkan keranjang
      setCart([]);
      setShowCart(false);
      alert('Berhasil Menambahkan Transaksi')

      // Redirect atau lakukan hal lain sesuai kebutuhan setelah berhasil mengirim transaksi
      // router.push('/success');
    } catch (error) {
      console.error('Error submitting transaksi:', error);
    }
  };

  useEffect(() => {
    const getToken = localStorage.getItem('kasir');
    if (getToken) {
      setToken(getToken);
    } else {
      router.push('/'); // Redirect ke halaman login jika token tidak tersedia
    }
    getDataBarang();
  }, []);

  return (
    <div className='min-h-[80vh] bg-[#F8F9FC] ps-64 '>
      <div className='relative'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6'>
        <h1 className='text-3xl font-bold'>Marketplace Kasir</h1>
          <div className='grid grid-cols-3 gap-6 pt-7'>
            {barang.map((item) => (
              <div key={item.id_barang} className='bg-white rounded-lg shadow-md p-4 relative'>
                <h2 className='text-xl font-semibold mb-2'>{item.nama_barang}</h2>
                <p className='text-gray-600'>Kategori: {item.kategori_barang}</p>
                <p className='text-gray-600'>Harga: Rp {item.harga_barang}</p>
                <p className='text-gray-600'>Stok: {item.stok_barang}</p>
                <button
                  onClick={() => addToCart(item)}
                  className='absolute top-2 right-2 p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:bg-blue-600'
                >
                  <FaCartPlus size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>
        {showCart && (
          <div className='fixed bottom-36 right-4 bg-white p-4 rounded-md shadow-md'>
            <div className='flex items-center justify-between mb-2'>
              <h3 className='text-lg font-semibold'>Keranjang</h3>
              <button onClick={toggleCart} className='text-gray-600 hover:text-gray-800'>
                <FaTimes />
              </button>
            </div>
            <ul>
              {Array.from(new Set(cart.map((item) => item.id_barang))).map((id_barang, index) => (
                <li key={index} className='text-gray-800 flex justify-between'>
                  <span>{cart.find((item) => item.id_barang === id_barang).nama_barang}</span>
                  <span>x {countItemsInCart(id_barang)}</span>
                  <span>Rp {cart.find((item) => item.id_barang === id_barang).harga_barang}</span>
                  <button onClick={() => removeFromCart(cart.findIndex((item) => item.id_barang === id_barang))} className='ml-2 text-red-600 hover:text-red-800'>
                    <FaTimes />
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <p className="text-gray-800 font-semibold">Total: Rp {calculateTotalPrice()}</p>
            </div>
            <button
              onClick={handleSubmitTransaksi}
              className='mt-4 bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 focus:outline-none'
            >
              Submit Transaksi
            </button>
          </div>
        )}
        <button
          onClick={toggleCart}
          className='fixed bottom-28 right-4 p-3 bg-blue-500 text-white rounded-full shadow-md flex items-center justify-center focus:outline-none hover:bg-blue-600'
        >
          <FaShoppingCart size={30} />
        </button>
      </div>
    </div>
  );
}

export default Main;
