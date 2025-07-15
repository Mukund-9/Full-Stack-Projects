import React from 'react'
import Link from 'next/link'
const select = () => {
    return (

        <>
            <div className="text-white text-center">

                <h1 className='m-5 text-2xl md:text-7xl'>Please Select Semester</h1>
                <ul className='flex flex-col gap-4 mt-10'>
                    <li><Link href={{ pathname: '/SemPapers', query: { value: 1 } }}><button  className="bg-gradient-to-br from-purple-600 to-blue-500 text-white hover:bg-gradient-to-bl focus:ring-blue-300 dark:focus:ring-blue-800 w-50 h-12 md:text-xl p-2 m-1">Sem 1</button></Link></li>
                   <li><Link href={{ pathname: '/SemPapers', query: { value: 2 } }}><button  className="bg-gradient-to-br from-purple-600 to-blue-500 text-white hover:bg-gradient-to-bl focus:ring-blue-300 dark:focus:ring-blue-800 w-50 h-12 md:text-xl p-2 m-1">Sem 2</button></Link></li>
                    <li><Link href={{ pathname: '/SemPapers', query: { value: 3 } }}><button  className="bg-gradient-to-br from-purple-600 to-blue-500 text-white hover:bg-gradient-to-bl focus:ring-blue-300 dark:focus:ring-blue-800 w-50 h-12 md:text-xl p-2 m-1">Sem 3</button></Link></li>
                    <li><Link href={{ pathname: '/SemPapers', query: { value: 4 } }}><button  className="bg-gradient-to-br from-purple-600 to-blue-500 text-white hover:bg-gradient-to-bl focus:ring-blue-300 dark:focus:ring-blue-800 w-50 h-12 md:text-xl p-2 m-1">Sem 4</button></Link></li>
                    <li><Link href={{ pathname: '/SemPapers', query: { value: 5 } }}><button  className="bg-gradient-to-br from-purple-600 to-blue-500 text-white hover:bg-gradient-to-bl focus:ring-blue-300 dark:focus:ring-blue-800 w-50 h-12 md:text-xl p-2 m-1">Sem 5</button></Link></li>
                    <li><Link href={{ pathname: '/SemPapers', query: { value: 6 } }}><button  className="bg-gradient-to-br from-purple-600 to-blue-500 text-white hover:bg-gradient-to-bl focus:ring-blue-300 dark:focus:ring-blue-800 w-50 h-12 md:text-xl p-2 m-1">Sem 6</button></Link></li>
                    <li><Link href={{ pathname: '/SemPapers', query: { value: 7} }}><button  className="bg-gradient-to-br from-purple-600 to-blue-500 text-white hover:bg-gradient-to-bl focus:ring-blue-300 dark:focus:ring-blue-800 w-50 h-12 md:text-xl p-2 m-1">Sem 7</button></Link></li>
                    <li><Link href={{ pathname: '/SemPapers', query: { value: 8 } }}><button  className="bg-gradient-to-br from-purple-600 to-blue-500 text-white hover:bg-gradient-to-bl focus:ring-blue-300 dark:focus:ring-blue-800 w-50 h-12 md:text-xl p-2 m-1">Sem 8</button></Link></li>



                </ul>
            </div>

        </>
    )
}

export default select
