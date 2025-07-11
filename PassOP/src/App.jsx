import { useState } from 'react'
import './index.css'
import Navbar from './components/Navbar'
import Manager from './components/Manager'
import Footer from './components/footer'
function App() {

  return (
    <>
      <Navbar/>
      <div className="min-h-[87vh]">
      <Manager/>
      </div>

      
      <Footer/>
    </>
  )
}

export default App
