"use client"
import React, { useEffect, useState } from 'react'
import { fetchuser } from '@/actions/useractions'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';


const PaymentPage = ({ username }) => {
    // const { data: session } = useSession()

    const [name, setName] = useState("")
    const [message, setMessage] = useState("")
    const [messagesList, setMessagesList] = useState([]);
    const [currentUser, setcurrentUser] = useState({})




    useEffect(() => {
        getData()
    }, [])
    useEffect(() => {
        const fetchMessages = async () => {
            const res = await fetch('/api/messages');
            const data = await res.json();
            setMessagesList(data);
        };
        fetchMessages();
    }, []);

    const getData = async () => {
        let u = await fetchuser(username)
        setcurrentUser(u)
    }
    const sendMessage = async () => {
        if (!name || !message) return alert('Both name and message are required.');

        const res = await fetch('/api/messages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, message }),
        });

        if (res.ok) {
            const newMsg = await res.json();
            setMessagesList((prev) => [newMsg, ...prev]);
            setName('');
            setMessage('');
            alert(`Thanks${name ? `, ${name}` : ''} 🙏. Your support means everything to us—no payment needed. Just stay with us! 🤗✨ Also, your message has been recorded.`);
        }
    };




    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light" />

            <ToastContainer />



            <div className='cover w-full bg-red-50 relative'>
                <img className='object-cover w-full h-48 md:h-[350px] shadow-blue-700 shadow-sm' src={currentUser.coverpic?currentUser.coverpic:"https://c10.patreonusercontent.com/4/patreon-media/p/campaign/4842667/452146dcfeb04f38853368f554aadde1/eyJ3IjoxNjAwLCJ3ZSI6MX0%3D/18.gif?token-hash=mwdFkhfcK_xNSCIBXxKJdmxkF7AfAw8JXOtiRF3bT5I%3D&token-time=1754265600"} alt="" />
                <div className='absolute -bottom-20 right-[33%] md:right-[46%] border-white overflow-hidden border-2 rounded-full size-36'>
                    <img className='rounded-full object-cover size-36' width={128} height={128} src={currentUser.profilepic?currentUser.profilepic:"cat.jpg"} alt="" />
                </div>
            </div>
            <div className="info flex justify-center items-center my-24 mb-32 flex-col gap-2">
                <div className='font-bold text-lg'>

                    @{username}
                </div>
                <div className='text-slate-400'>
                    Lets help {username} get a chai!


                </div>
                <div className='text-slate-400'>
                    18,777 members , 100 posts , $18,280/release
                </div>
                <div className="payment flex gap-3 w-[90%] mt-11 flex-col md:flex-row">
                    <div className="supporters w-full md:w-1/2 bg-slate-900 rounded-lg text-white px-2 md:p-10">
                        <h2 className="text-2xl font-bold my-5">Supporters</h2>
                        <ul className='mx-5 text-md'>
                            {messagesList.length===0 && <h5>No Supporters yet!</h5>}
                            {messagesList.map((msg) => (
                                <li key={msg._id} className='my-4 flex gap-2 items-center'>
                                    <img width={33} src="avatar.gif" alt="user avatar" />
                                    <span>
                                        {msg.name} says: {msg.message}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="makePayment w-full md:w-1/2 bg-slate-900 rounded-lg text-white px-2 md:p-10">
                        <h2 className='text-2xl font-bold my-5'>Make a Payment</h2>
                        <div className='flex gap-2 flex-col'>
                            {/* input for name and message   */}
                            <div className="flex gap-2 flex-col">
                                <input type="text" className='w-full p-4 rounded-lg bg-slate-800' placeholder='Enter name' value={name} onChange={(e) => setName(e.target.value)} />
                                <input type="text" className='w-full p-4 rounded-lg bg-slate-800' placeholder='Enter message' value={message} onChange={(e) => setMessage(e.target.value)} />
                                <input type="text" className='w-full p-4 rounded-lg bg-slate-800' placeholder='Enter amount' />

                                <button type="button" className="text-white bg-gradient-to-br from-purple-900 to-blue-900 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={() => { sendMessage() }}>Pay</button>

                            </div>
                            {/* Or choose from these amounts  */}
                            <div className='flex flex-col md:flex-row gap-2 mt-5'>
                                <button className="bg-slate-800 p-3 rounded-lg" onClick={() => { sendMessage() }}>Pay $10</button>
                                <button className="bg-slate-800 p-3 rounded-lg" onClick={() => { sendMessage() }}>Pay $20</button>
                                <button className="bg-slate-800 p-3 rounded-lg" onClick={() => { sendMessage() }}>Pay $30</button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PaymentPage