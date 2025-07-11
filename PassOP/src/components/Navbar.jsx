import React from 'react'

const Navbar = () => {
    return (
        <nav className='bg-slate-800 text-white'>
            <div className="mycontainer flex justify-around items-center px-4 h-24 py-5">
                <div className="logo font-bold text-2xl">
                    <span className="text-green-700"> &lt;</span>
                    Pass<span className="text-green-700">OP/&gt;</span>
                </div>

                <button className=" text-white bg-green-500 rounded-full m-8 flex justify-around items-center ring-white ring-2 gap-2  ">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/920px-Octicons-mark-github.svg.png?20180806170715" alt="github logo" className='bg-white-800 invert m-1 md:m-0 md:p-4 md:w-16 w-5' />
                    <p className="md:px-2 font-bold mr-1">Github</p>
                </button>

            </div>

        </nav>

    )
}

export default Navbar
