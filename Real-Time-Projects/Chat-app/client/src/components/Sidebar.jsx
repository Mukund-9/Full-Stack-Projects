import React, { useContext, useEffect, useState, useRef } from 'react'
import assets, { userDummyData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/authContext'
import { chatContext } from '../../context/chatContext'

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, unseenMessages, setUnseenMessages } = useContext(chatContext);

  const { logout, onlineUsers } = useContext(AuthContext);
  const [input, setInput] = useState(false);
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const filteredUsers = input ? users.filter((user) => user.fullName.toLowerCase().includes(input.toLowerCase())) : users;

  useEffect(() => {
    getUsers();
  }, [onlineUsers])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  return (
    <div className={`bg-[#8185B2]/10 h-full p-5 rounded-r-xl overflow-y-scroll text-white ${selectedUser ? 'max-md:hidden' : ''}`}>
      <div className='pb-5'>
        <div className="flex justify-between items-center">
          <div className='flex justify-center items-center'>
            <img src="/favicon.svg" alt="" className='w-[40px] p-1 ml-1 md:w-[50px]' />
            <h1 className='text-white text-lg md:text-2xl mr-5 ml-2'>QuickMess</h1>
          </div>
          <div ref={menuRef} onClick={() => setIsMobileMenuOpen(prev => !prev)} className="relative py-2 group w-10">
            <img src={assets.menu_icon} alt="Menu" className='max-h-5 cursor-pointer' />
            <div className={`absolute top-full right-0 z-20 w-32 p-5 cursor-pointer rounded-md bg-[#282142] border-gray-600 text-gray-100 ${isMobileMenuOpen ? 'block' : 'hidden'} md:group-hover:block`}>
              <p onClick={() => { navigate('/profile'); setIsMobileMenuOpen(false); }}>Edit Profile</p>
              <hr className='my-2 border-t border-gray-500' />
              <p onClick={() => { logout(); setIsMobileMenuOpen(false); }} className='cursor-pointer text-sm text-white'>Logout</p>
            </div>
          </div>
        </div>
        <div className='bg-[#282142] rounded-full flex items-center gap-2 py-3 px-4 mt-5'>
          <img src={assets.search_icon} alt="Search" className='w-3' />
          <input onChange={(e) => { setInput(e.target.value) }} type="text" className='bg-transparent border-none outline-none text-white text-xs placeholder-[#c8c8c8] flex-1' placeholder='Search User...' />
        </div>
      </div>
      <div className="flex flex-col">
        {filteredUsers.map((user, index) => {
          return <div onClick={() => { setSelectedUser(user), setUnseenMessages(prev => ({ ...prev, [user._id]: 0 })) }} key={index} className={`relative flex items-center gap-2 p-2 pl-4 rounded cursor-pointer max-sm:text-sm ${selectedUser?._id === user._id ? 'bg-[#282142]/50 transition-colors duration-200' : ''}`}>
            <img src={user?.profilePic || assets.avatar_icon} alt="" className='w-[35px] aspect-[1/1] rounded-full' />
            <div className='flex flex-col leading-5'>
              <p>{user.fullName}</p>
              {
                onlineUsers?.includes(user._id) ? <span className='text-green-400 text-xs'>Online</span> : <span className='text-neutral-400 text-xs'>Offline</span>
              }
            </div>
            {
              unseenMessages[user._id] > 0 && <p className='absolute top-4 right-4 text-xs h-5 w-5 flex justify-center items-center rounded-full bg-violet-500/50'>{unseenMessages[user._id]}</p>
            }
          </div>
        })}
      </div>
    </div>
  )
}

export default Sidebar
