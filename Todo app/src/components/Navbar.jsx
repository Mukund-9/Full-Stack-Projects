import React from 'react'
import { FaTasks } from "react-icons/fa";
const Navbar=()=>{
    return (
        <nav className='flex justify-between bg-slate-700 text-white py-4'>
            <div className="logo flex ">
                <span className='font-bold text-xl my-1 ms-5'><FaTasks /></span>
                <span className="font-bold text-xl mx-2">myTask</span>
            </div>
            

            <ul className="flex mx-9 gap-8">
                <li className='cursor-pointer hover:font-bold transition-all '>Home</li>
                <li className='cursor-pointer hover:font-bold transition-all '>You</li>
            </ul>
        </nav>
    )
}

export default Navbar
