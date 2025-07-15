"use client"
import React, { useEffect, useRef } from 'react'
import About from '../about/page'
import Link from 'next/link'
import { useSession, signIn, signOut } from "next-auth/react"
import { usePathname } from 'next/navigation'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Navbar = () => {
  const path = usePathname()
  const { data: session, status } = useSession()
  const toastShown = useRef(false)

  useEffect(() => {
    if (status === 'authenticated' && session?.user && !toastShown.current) {
      toast.success(`Welcome, ${session.user.name || 'User'}! 🎉`)
      toastShown.current = true
    }
  }, [status, session])

  return (
    <>
      <div className='flex justify-between items-center bg-gray-900 text-white gap-2 py-3  md:gap-5 md:h-15 md:px-10 flex-col md:flex-row'>
        <div className='md:text-xl text-lg flex justify-center items-center gap-2 font-bold'>
          <img src="/logo.png" alt="logo" className='w-15 p-1' />
          <p>Your Paper Helper</p>
        </div>
        <ul className='flex gap-5'>
          <li><Link href="/" className={path == '/' ? "font-bold md:text-lg text-md" : ""}>Home</Link></li>
          <li><Link href="/about" className={path == '/about' ? "font-bold md:text-lg text-md " : ""}>About us</Link></li>
          <li><Link href="/profile" className={path == '/profile' ? "font-bold md:text-lg tex-md" : ""}>Profile</Link></li>
        </ul>
        {!session && (
          <Link href="/login">
            <button className="bg-gradient-to-br from-purple-600 to-blue-500 text-white hover:bg-gradient-to-bl focus:ring-blue-300 dark:focus:ring-blue-800 w-25 md:text-xl text-md p-2 m-2">
              Login
            </button>
          </Link>
        )}
        {session && (
          <button
            className="bg-gradient-to-br from-purple-600 to-blue-500 text-white hover:bg-gradient-to-bl focus:ring-blue-300 dark:focus:ring-blue-800 w-25 md:text-xl text-md p-2 m-2"
            onClick={() => signOut()}
          >
            Logout
          </button>
        )}
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  )
}

export default Navbar
