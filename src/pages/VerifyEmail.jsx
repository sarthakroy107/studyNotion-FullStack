import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../services/operations/authAPI';

const VerifyEmail = (email) => {
    const { signupData, loading } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setformData] = useState({
        email: email,
        otp: ""
    });
    useEffect(()=>{
        if(!signupData) {
            navigate('/signup')
        }
    }, [])
    const {otp} = formData

    const handleVerifyAndSignup = (e) => {
        e.preventDefault();
        const {
          role,
          firstname,
          lastname,
          email,
          password,
          confirmPassword,
        } = signupData;
    
        dispatch(
          signUp(
            role,
            firstname,
            lastname,
            email,
            password,
            confirmPassword,
            otp,
            navigate
          )
        );
      };

    const handleOnChange = (e) => {
        setformData((prevData)=>({
            ...prevData,
            [e.target.name]: e.target.value
        }))
        console.log(otp)
    }

  return (
    <main className='h-screen w-full flex items-center justify-center bg-richblack-900'>
        <form onSubmit={handleVerifyAndSignup} className='text-white flex flex-col gap-5' action="">
            <label className='text-3xl font-bold' htmlFor="">Enter OTP</label>
            <input className='p-2 px-3 bg-richblack-700 rounded-md outline-none' type="text" 
            name="otp"
            value={otp}
            onChange={handleOnChange}
            />
            <button className='bg-yellow-100 p-2 text-center min-w-24 rounded'>Submit</button>
        </form>
    </main>
  )
}

export default VerifyEmail