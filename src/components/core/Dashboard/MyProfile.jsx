import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {FiEdit} from 'react-icons/fi'

const MyProfile = () => {

    const {user} = useSelector((state)=>state.profile)
    const navigate = useNavigate();
    const email = user?.email
    console.log("Email: " + email)
  return (
    <main className='text-white bg-richblack-900 h-screen w-full flex flex-col justify-center items-center'>
        <div className='w-1/2'>
            <h2>Edit Profile</h2>
            <div className='flex items-center justity-between bg-richblack-700 h-32 w-full rounded-md'>
                <div className='flex justify-between mx-6 w-full'>
                    <div className='flex gap-4'>
                        <div><img className='rounded-full w-16' src={user?.image} alt="" /></div>
                        <div className='flex flex-col text-lg font-semibold'>
                            <p>{user?.firstname + " " + user?.lastname}</p>
                            <p className='text-richblack-200 text-md'>{user?.email}</p>
                        </div>
                    </div>
                    <button disabled={true} className='bg-yellow-100 text-richblack-900 rounded-md px-5 p-2 hover:scale-95 duration-150' >
                        <div className='flex justify-center items-center w-full font-semibold'>Edit <FiEdit/></div>
                    </button>
                </div>
            </div>
            
            <div className='flex items-center justity-between bg-richblack-700 h-32 w-full rounded-md'>
                <h3>Personal Details</h3>
            </div>
        </div>
    </main>
  )
}

export default MyProfile