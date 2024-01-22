import React from 'react'
import Image from 'next/image';

const SideMenu = () => {
    return (
       <div className='fixed left-0 top-0 w-64 h-full bg-gradient-to-br from-blue-600 to-cyan-300 p-4'>
        <div className="flex items-center pb-4 border-b border-white">
            <Image className='w-10 h-10 rounded object-cover' src="https://placehold.co/32x32" alt="" />
            <span className='text-lg font-bold text-white ml-3'>Kasir</span>
        </div>
       </div>
    )
}

export default SideMenu