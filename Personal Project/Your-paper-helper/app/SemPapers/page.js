'use client'

import React, { useState, useEffect } from 'react'
import { fetchpapers, updatePaper } from '@/actions/useraction'
import { useSearchParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Sem = () => {
  const subjectsBySem = {
  1: ['Applied Mathematics-I', 'Applied Physics','Technical Communication','Social Science','Electronic and Electrical Eng.','Eng. Drawing' ],
  2: ['C Programming','Applied Mathematics-II','Applied Chemistry','Environmental Science','Basic Electronics Eng.','Elementary Mechanical Eng.'],
  3: ['Data Structures', 'Data Communications', 'Discrete Mathematics','Digital Circuits','Object Oriented Design','Operating Systems'],
  4: ['Operating Systems', 'Computer Networks', 'Java'],

}

  const { data: session } = useSession()
  const searchParams = useSearchParams()
  const sem = searchParams.get('value')
  const [papers, setPapers] = useState([])
  const [message, setMessage] = useState('')
  const [uploadPaper, setUploadPaper] = useState(null)
  const [uploadMessage, setUploadMessage] = useState('')
  const [subject, setSubject] = useState('')


  useEffect(() => {
    fetchData()
  }, [sem])


  const fetchData = async () => {
    try {
      const data = await fetchpapers(sem)
      if (!data || data.length === 0) {
        setPapers([])
        setMessage('No papers found.')
      } else {
        setPapers(data)
        setMessage('')
      }
    } catch (error) {
      console.error(error)
      setMessage('An error occurred while fetching papers.')
    }
  }


  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!session) {
      toast.error('Login required')
      return
    }

    if (!uploadPaper || !subject) {
      setUploadMessage('Please provide both subject and file.')
      return
    }

    const formData = new FormData()
    formData.append('file', uploadPaper)
    formData.append('email', session.user.email)
    formData.append('name', session.user.name || '')
    formData.append('sem', sem)
    formData.append('sub', subject)

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const result = await res.json()
      if (result.success) {
        setUploadMessage('The paper was uploaded successfully! Thank you for helping your friends')
        setUploadPaper(null)
        setSubject('')
        fetchData()
      } else {
        setUploadMessage('Failed to upload paper.')
      }
    } catch (error) {
      console.error(error)
      setUploadMessage('Error uploading paper.')
    }
  }

  return (
    <div className="p-4 max-w-md mx-auto text-white">
      <h1 className="text-2xl md:text-5xl font-bold mt-9 mb-6 text-center">
        Semester {sem} Papers
      </h1>
      <p className='text-red-300 w-full text-center text-sm'>Note:- Sem 1 and 2 subjects vary according to college or branch. So , if you are finding first year subjects then please check both sem 1 and 2.</p>
      {message && (
        <p className="mt-4 text-red-500 text-center mx-auto">{message}</p>
      )}

      {papers.length > 0 && (
        <div className="mt-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold">Papers:</h2>
            
          </div>
          <ul className="list-inside list-disc">
            {papers.map((paper, index) => (
              <li key={index} className="mb-2">
                <strong>Subject:</strong> {paper.sub} <br />
                <a
                  href={paper.paper}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 underline"
                >
                  Download Paper
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
      <button
              onClick={fetchData}
              className="bg-gray-600 hover:bg-gray-700 text-sm px-3 py-1 rounded text-white my-4"
            >
              🔄 Refresh
            </button>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-4 rounded-md shadow-md mt-10"
      >
        <h2 className="text-xl md:text-3xl font-bold mb-2 md:mb-4 text-center">Upload a Paper</h2>
        <p className='text-red-500 text-center text-sm'>Note:- Only pdf are allowed</p>
       <select
  value={subject}
  onChange={(e) => setSubject(e.target.value)}
  className="w-full p-2 my-2 bg-gray-700 rounded"
  required
>
  <option value="">Select Subject</option>
  {(subjectsBySem[sem] || []).map((sub, index) => (
    <option key={index} value={sub}>
      {sub}
    </option>
  ))}
</select>


        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setUploadPaper(e.target.files[0])}
          className="w-full p-2 my-2 bg-gray-700 rounded"
          required
        />

        <button
          type="submit"
          className="text-md md:text-lg bg-blue-600 hover:bg-blue-700 w-full py-2 rounded mt-2"
        >
          Upload
        </button>

        {uploadMessage && (
          <p className="mt-2 text-sm text-yellow-300">{uploadMessage}</p>
        )}
      </form>
    </div>
  )
}

export default Sem
