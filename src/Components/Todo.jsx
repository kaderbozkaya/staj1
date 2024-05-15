import React, { useState } from 'react'

export default function Todo() {
    const [deger,setDeger]=useState("")
    const [todoDizi,setTodoDizi]=useState([])
  return (
    <>
    <h1 className='text-3xl text-blue-500'>TODO LIST</h1>
    <input type="text"
    placeholder='Todo ekle...'
    value={deger}
    onChange={e=>setDeger(e.target.value)}
     className='border-2 p-2'/>
    <button
    className='bg-blue-400 text-white text-lg m-3 p-2 rounded'>Ekle</button>

    </>
  )
}
