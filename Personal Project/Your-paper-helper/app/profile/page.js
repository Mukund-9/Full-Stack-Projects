"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchuser, updateProfile } from "@/actions/useraction";
import {toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Profile() {
  const { data: session, status } = useSession();
  const [form, setForm] = useState({});


  useEffect(() => {
    if (status === "authenticated" && session?.user?.name) {
      getData();
    }
  }, [status, session]);

  const getData = async () => {
    const u = await fetchuser(session.user.name);
    setForm(u);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    await updateProfile(form, session.user.name);
  };

  if (status === "loading") {
    return <p className="text-white text-center m-2">Loading...</p>;
  }

  if (!session) {
    return (
      <div className="text-white text-center text-xl md:text-3xl p-8">
        <h1 className="m-5">You are not signed in</h1>
        <Link
          href="/login"
          className="bg-gradient-to-br from-purple-600 to-blue-500 text-white px-4 py-2 rounded"
        >
          Sign in
        </Link>
      </div>
    );
  }
  const savedChanges=()=>{
    toast.success("Profile Updated")
    return
  }
  const { email } = session.user;

  return (
    <>
    
      {form.coverpic?
        <img
          src={form.coverpic}
          alt="Cover"
          className="w-full h-60 object-cover"
        />:<img
          src='https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
          alt="Cover"
          className="w-full h-60 object-cover"
        />
      }

      {form.profilepic?
        <img
          src={form.profilepic}
          alt="Profile"
          className="w-36 h-36 rounded-full mx-auto -mt-16 border-4 border-white"
        />:<img
          src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTML0gExaohZHdZW3609F12nUmVc14WXYNx_w&s'
          alt="Profile"
          className="w-36 h-36 rounded-full mx-auto -mt-16 border-4 border-white"
        />
      }

      <h1 className="text-3xl md:text-4xl text-white text-center mt-8 font-bold">
        My Profile
      </h1>

      <div className="text-white flex flex-col mx-5 md:mx-120 justify-center gap-5 md:text-xl my-6 space-y-2">
        <p>
          <strong>Username:</strong>{" "}
          {form.username || session.user.name}
        </p>
        <p>
          <strong>Email:</strong> {email}
        </p>
        {form.name && <p><strong>Name:</strong> {form.name}</p>}
        {form.createdAt && (
          <p>
            <strong>Created:</strong> {new Date(form.createdAt).toLocaleString()}
          </p>
        )}
        
        
      </div>
        <div className="text-center text-md md:text-xl">
            <button
          onClick={() => signOut()}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md mt-4 w-50  font-bold "
        >
          Sign out
        </button>
        </div>
        <div className="opacity-20 bg-white w-full text-white h-1 text-white my-16"></div>
        <h1 className="text-white text-center mx-auto my-10 text-3xl md:text-4xl font-bold">Update your profile</h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto px-4 text-white"
      >
        {["name", "email", "username", "profilepic", "coverpic"].map((field) => (
          <div className="my-3" key={field}>
            <label htmlFor={field} className="block mb-1 text-sm capitalize">
              {field === "profilepic" ? "Profile Picture URL" :
               field === "coverpic" ? "Cover Picture URL" : field}
            </label>
            <input
              type="text"
              name={field}
              id={field}
              value={form[field] || ""}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-sm text-white placeholder-gray-400"
            />
          </div>
        ))}

        <button
          type="submit"
          className="w-full py-2 mt-5 mb-20 bg-blue-600 hover:bg-blue-700 rounded-md font-bold "
          onClick={()=>savedChanges()}
        >
          Save Changes
        </button>
      </form>
    </>
  );
}


