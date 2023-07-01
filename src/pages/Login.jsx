import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { login } from '../services/operations/authAPI';
import { Link, useNavigate } from "react-router-dom"

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const {email, password} = formData

    const handleOnChange = (e) => {
        setFormData((prevData)=>({
            ...prevData,
            [e.target.name]: e.target.value,
        }))
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()
        dispatch(login(email, password, navigate));
    }

  return (
    <main className='text-richblack-200 h-screen w-full bg-richblack-900 flex justify-center items-center'>
        <form onSubmit={handleOnSubmit} className='flex flex-col gap-4 text-lg font-semibold'>
            <label>Email</label>
            <input onChange={handleOnChange} type="email" name="email" value={email} 
            className='bg-richblack-700 rounded-md text-white outline-none p-2 px-3'/>
            <label>Password</label>
            <input onChange={handleOnChange} type="password" name="password" value={password}
            className='bg-richblack-700 rounded-md text-white outline-none p-2 px-3'/>
            <button className='bg-yellow-200 text-lg text-richblack-900 rounded-md p-2 text-center'>Submit</button>
        </form>
    </main>
  )
}

export default Login