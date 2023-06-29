import React, { useState } from 'react'
import Pic from '../../assets/Images/signup.webp'
import { useDispatch } from 'react-redux'
import { setSignupData } from '../slices/authSlice'
import { sendOtp } from '../services/operations/authAPI'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [role,setRole] = useState("student")
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: ""
    })

    const { firstname, lastname, email, password, confirmPassword } = formData

    const handleOnChange = (e) => {
        setFormData((prevData) => ({
          ...prevData,
          [e.target.name]: e.target.value,
        }))
    }
    const handleOnSubmit = (e) => {
        e.preventDefault();
        if(password !== confirmPassword) {
            console.error;
            console.log("Passwords do not match");
        }
        const signupData = {
            ...formData,
            role,
        }
        dispatch(setSignupData(signupData));
        dispatch(sendOtp(formData.email, navigate))
        setFormData({
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            confirmPassword: ""
        })
        setRole('student')
    }


  return (

    <main className='bg-richblack-900 h-screen w-full flex items-center justify-around'>
        <div className='w-[40%] text-richblack-100'>

            <h2 className='text-whit text-4xl font-bold my-3'>Joins the millions of learners to upskill yourself</h2>

            <p>Build skills for today, tomorrow, and beyond. Education to future-proof your career.</p>

            <div className='rounded-full text-lg font-semibold gap-4 my-5 flex bg-richblack-700 text-richblack-200 w-fit p-1'>
                <button className={`${role === "student" ? "bg-richblack-800 text-richblack-25": "bg-richblack-700"}
                 rounded-full p-2 px-5 text-lg`} onClick={()=>{setRole("student")}}>Student</button>
                <button className={`${role === "educator" ? "bg-richblack-800 text-richblack-25": "bg-richblack-700"}
                 rounded-full p-2 px-5 text-lg`} onClick={()=>{setRole("educator")}}>Educator</button>
            </div>

            <form onSubmit={handleOnSubmit} className='text-richblack-200' action="">
                <div className='flex gap-4 my-2'>
                    <div className='flex flex-col'>
                        <label htmlFor="">First name</label>
                        <input className='px-3 p-2 outline-none shadow-[0px_1px_1px_0px_rgba(225,225,225,1)] rounded-md bg-richblack-700 text-white my-2' 
                        type="text" 
                        name="firstname"
                        value = {firstname}
                        placeholder='Sarthak'
                        onChange={handleOnChange}
                        required/>
                    </div>

                    <div className='flex flex-col'>
                        <label htmlFor="">Last name</label>
                        <input className='px-3 p-2 outline-none shadow-[0px_1px_1px_0px_rgba(225,225,225,1)] rounded-md bg-richblack-700 text-white my-2' 
                        type="text" 
                        name="lastname" 
                        value={lastname} 
                        placeholder='Roy'
                        onChange={handleOnChange} 
                        required/>
                    </div>
                </div>

                <div className='flex flex-col'>
                    <label htmlFor="">Email</label>
                    <input className='px-3 p-2 outline-none shadow-[0px_1px_1px_0px_rgba(225,225,225,1)] rounded-md bg-richblack-700 text-white my-2 w-2/3' 
                    type= "email" 
                    name="email" 
                    value={email} 
                    placeholder='sarthakroy107@protonmail.com' 
                    onChange={handleOnChange}
                    required/>
                </div>

                <div className='flex gap-4 my-2'>
                    <div className='flex flex-col'>
                        <label htmlFor="">Create Password</label>
                        <input className='px-3 p-2 outline-none shadow-[0px_1px_1px_0px_rgba(225,225,225,1)] rounded-md bg-richblack-700 text-white my-2' 
                        type="text" 
                        name="password" 
                        value={password} 
                        placeholder='****' 
                        onChange={handleOnChange}
                        required/>
                    </div>

                    <div className='flex flex-col'>
                        <label htmlFor="">Confirm Password</label>
                        <input className='px-3 p-2 outline-none shadow-[0px_1px_1px_0px_rgba(225,225,225,1)] rounded-md bg-richblack-700 text-white my-2' 
                        type="text" 
                        name="confirmPassword" 
                        value={confirmPassword} 
                        placeholder='****' 
                        onChange={handleOnChange}
                        required/>
                    </div>
                </div>
                <button className='w-2/3 bg-yellow-100 text-richblack-800 my-4 p-3 text-center rounded-lg'>Create Account</button>
            </form>
        </div>
        <div className='w-[40%]'>
            <img src={Pic} alt="" />
        </div>
    </main>
  )
}

export default Signup