import React, { useEffect, useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {

    const ref = useRef();
    const [form, setform] = useState({ site: "", username: "", password: "" });
    const [passwordArray, setpasswordArray] = useState([])
    const passwordref = useRef();
    useEffect(() => {
        let passwords = localStorage.getItem("passwords")
        if (passwords) {
            setpasswordArray(JSON.parse(passwords))
        }
    }, [])

    const showPassword = () => {
        passwordref.current.type = "text"
        if (ref.current.className.includes("fa-solid fa-eye p-2 cursor-pointer")) {


            ref.current.className = "fa-solid fa-eye-slash p-2 cursor-pointer"
            passwordref.current.type = 'text'
        }
        else {
            ref.current.className = "fa-solid fa-eye p-2 cursor-pointer"
            passwordref.current.type = "password"
        }
    }
    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }
    const savePassword = () => {
        if (form.site.length > 3 && form.password.length > 3 && form.username.length > 3) {
            const newPassword = { ...form, id: uuidv4() }
            setpasswordArray([...passwordArray, newPassword])
            localStorage.setItem("passwords", JSON.stringify([...passwordArray, newPassword]))
            setform({ site: "", username: "", password: "" })
            toast('Password saved ✌️', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
        else {
            toast('Length of site,username and password must be greater than 3', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }

    }
    const deletePassword = (id) => {
        let c = confirm('Do you really want to delete this password?')
        if (c) {
            setpasswordArray(passwordArray.filter(item => item.id !== id))
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
            toast('Password deleted successfully 😊', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }

    }
    const editPassword = (id) => {
        setform(passwordArray.filter(i => i.id === id)[0])

        setpasswordArray(passwordArray.filter(item => item.id !== id))


    }
    const copyText = (text) => {
        toast('Copied to clipboard 🗒️', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text)

    }
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            
            {/* <div class="absolute top-0 z-[-2] h-screen w-screen bg-green-200 bg-white"></div> */}
            <div className="fixed top-0 -z-10 h-full w-full bg-green-200"><div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-green-500 opacity-50 blur-[80px]"></div></div>

            <div className=" p-2 md:mycontainer min-h-screen ">
                <h1 className='text-4xl font-bold text-center mt-3 md:mt-1'>
                    <span className="text-green-700"> &lt;</span>
                    Pass<span className="text-green-500">OP/&gt;</span>
                </h1>
                <p className='text-green-900 text-lg text-center'>Your own Password Manager</p>
                <div className="text-black flex flex-col p-4 gap-8 ">
                    <input value={form.site} placeholder='Enter website URL' name="site" onChange={handleChange} className='rounded-full border border-green-500 w-full p-4 py-1' type="text" id='site' />
                    <div className="flex flex-col md:flex-row w-full justify-between gap-8">
                        <input value={form.username} placeholder='Enter username' name="username" onChange={handleChange} type="text" className='rounded-full border border-green-500 w-full p-4 py-1' id='username' />
                        <div className="relative">
                            <input ref={passwordref} value={form.password} placeholder='Enter password' name="password" onChange={handleChange} type="password" className='rounded-full border border-green-500 w-full p-4 py-1' id='password' />
                            <span className="absolute right-0 top-0.4" onClick={showPassword}><i ref={ref} className="fa-solid fa-eye p-2 cursor-pointer" /></span>
                        </div>

                    </div>

                    <button onClick={savePassword} className=' flex justify-center item-center hover:bg-green-300 bg-green-400 rounded-full w-fit px-6 py-2 mx-auto gap-2 border border-green-900'>

                        <animated-icons
                            src="https://animatedicons.co/get-icon?name=Plugin&style=minimalistic&token=c35872bb-2ea9-4cf2-857b-d402cb8bb06e"
                            trigger="hover"
                            width="30"
                            height="30"
                        ></animated-icons>
                        Save
                    </button>


                </div>

                <div className="passwords">
                    <h2 className='font-bold text-2xl py-4 '>Your Passwords</h2>
                    {passwordArray.length === 0 && <div>No passwords to show</div>}
                    {passwordArray.length !== 0 && <table className="table-auto w-full overflow-hidden rounded-md mb-5">
                        <thead className='bg-green-800 text-white'>
                            <tr>
                                <th className='py-2'>Site</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Password</th>
                                <th className='py-2'>Action</th>

                            </tr>
                        </thead>
                        <tbody className='bg-green-300'>
                            {passwordArray.map((e, index) => {
                                return <tr key={index}>
                                    <td className='text-center py-2 border border-white '  >
                                        <div className='flex items-center justify-center gap-5'><a href={e.site.startsWith('http') ? e.site : `https://${e.site}`} target="_blank" rel='noopener noreferrer'>{e.site}</a>
                                            <div onClick={() => { copyText(e.site) }}>
                                                <animated-icons
                                                    src="https://animatedicons.co/get-icon?name=copy&style=minimalistic&token=047dcf87-b84c-41c5-b2c6-5d33d94222ee"
                                                    trigger="loop-on-hover"
                                                    height="25"
                                                    width="25"
                                                    className='cursor-pointer '


                                                ></animated-icons>
                                            </div>
                                        </div></td>
                                    <td className='text-center w-40 py-2 border border-white'>
                                        <div className='flex items-center justify-center gap-5'>{e.username}
                                            <div onClick={() => { copyText(e.username) }}>
                                                <animated-icons
                                                    src="https://animatedicons.co/get-icon?name=copy&style=minimalistic&token=047dcf87-b84c-41c5-b2c6-5d33d94222ee"
                                                    trigger="loop-on-hover"
                                                    height="25"
                                                    width="25"
                                                    className='cursor-pointer'


                                                ></animated-icons>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='text-center w-40 py-2 border border-white'>
                                        <div className='flex items-center justify-center gap-5'>{e.password}
                                            <div onClick={() => { copyText(e.password) }}>
                                                <animated-icons
                                                    src="https://animatedicons.co/get-icon?name=copy&style=minimalistic&token=047dcf87-b84c-41c5-b2c6-5d33d94222ee"
                                                    trigger="loop-on-hover"
                                                    height="25"
                                                    width="25"
                                                    className='cursor-pointer '

                                                ></animated-icons>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='text-center w-36 py-2 border border-white'>
                                        <div className='flex gap-5 justify-center items-center'>
                                            <span onClick={() => { editPassword(e.id) }}><animated-icons
                                                src="https://animatedicons.co/get-icon?name=Edit%20V2&style=minimalistic&token=b3a68157-77f2-44c6-b4f0-ff2500f84622"
                                                trigger="loop-on-hover"
                                                height="25"
                                                width="25"
                                            ></animated-icons></span>
                                            <span onClick={() => { deletePassword(e.id) }}>
                                                <animated-icons
                                                    src="https://animatedicons.co/get-icon?name=delete&style=minimalistic&token=c1352b7b-2e14-4124-b8fd-a064d7e44225"
                                                    trigger="loop-on-hover"
                                                    height="25"
                                                    width="25"
                                                ></animated-icons>
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            })}


                        </tbody>
                    </table>}
                </div>
            </div>
        </>
    )
}

export default Manager
