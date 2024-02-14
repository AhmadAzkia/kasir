import React, { useEffect, useState } from 'react'
import { Router, useRouter } from 'next/router'
import Image from 'next/image'
import Login from '../../../public/img/login.png'

const LoginPages = () => {
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword)
  }

  const router = useRouter()

  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');

  const handleInputUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleInputPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLogin = async () => {
    try {
        const responseKasir = await fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ Username, Password })
        });
        
        if (responseKasir.ok) {
            // Simpan token di cookie atau di localStorage
            localStorage.setItem('token', Username);
            alert(`Login Berhasil, anda Kasir!`)
            router.push('/dashboardKasir')
        } else {
            const responseAdmin = await fetch('http://localhost:3001/loginAdmin', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ Username, Password })
            });

            if(responseAdmin.ok) { 
              // Simpan token di cookie atau di localStorage
              localStorage.setItem('token', Username);
              alert(`Login Berhasil, anda Admin!`)
              router.push('/dashboardAdmin')
            }

            else {
              alert('Login gagal, periksa kembali Username dan Password anda!');
              setUsername('')
              setPassword('')
            }
            
        }
    } catch (error) {
        console.error('Terjadi kesalahan:', error);
    }
  };


  return (
    <div className="bg-gray-100 h-screen flex items-center justify-center">
      <div className="h-screen bg-gradient-to-br from-blue-600 to-cyan-300 flex justify-center items-center w-full">
          <div className="bg-white px-10 py-8 rounded-xl w-max shadow-xl flex">
            <div className="flex-1 justify-center">
              <Image
                className="w-96"
                src={Login}
                alt="Logo"
                width={512}
                height={512}
              />
            </div>
            <div className="mt-4 flex-1 justify-center ml-5">
              <h1 className="text-center mb-8 text-3xl font-semibold text-gray-600">
                Login
              </h1>
              <div className="flex items-center border-2 py-2 px-3 rounded-md mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
                <input
                  className="pl-2 text-sm outline-none border-none w-full"
                  type="text"
                  name="username"
                  placeholder="username"
                  value={Username} 
                  onChange={handleInputUsername} 
                  required
                />
              </div>
              <div className="flex items-center border-2 py-2 px-3 rounded-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  className="pl-2 text-sm outline-none border-none w-full"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  id=""
                  placeholder="Password"
                  value={Password}
                  onChange={handleInputPassword}
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className=""
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.364 8.364a4 4 0 10-5.657 5.657"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M18 12a6 6 0 11-6-6"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.364 8.364a4 4 0 10-5.657 5.657"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15a3 3 0 01-3-3 3 3 0 016 0 3 3 0 01-3 3z"
                      />
                    </svg>
                  )}
                </button>
              </div>
              <button
                  type="submit"
                  onClick={handleLogin}
                  className="mt-8 w-full shadow-xl bg-gradient-to-tr from-blue-600 to-red-400 hover:to-red-700 text-indigo-100 py-2 rounded-md text-lg tracking-wide transition duration-1000">
                      Login
              </button>
            </div>
          </div>
      </div>
    </div>
  )
}

export default LoginPages
