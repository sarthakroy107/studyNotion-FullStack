import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {FaRegEdit} from 'react-icons/fa'


const MyProfile = () => {

    const {user} = useSelector((state)=>state.profile)
    console.log(user)
    const navigate = useNavigate();
    const email = user?.email
    const [deatils, setDeatils] = useState();
    
      return (
        <main className='w-full min-h-screen bg-richblack-900 text-richblack-50 flex justify-center items-center'>
            <div className='w-2/3 flex flex-col gap-12'>
                <h2 className='text-3xl font-semibold'>My Profile</h2>
                <div className='flex justify-between bg-richblack-800 rounded-lg p-6 px-9'>
                    <div className='flex gap-5'>
                        <div><img src={user.image} className='w-20 rounded-full' alt="" /></div>
                        <div className='flex flex-col justify-center gap-1'>
                            <p className='text-3xl font-semibold'>{user.firstname} {user.lastname}</p>
                            <p className='text-lg text-richblack-400'>{user.email}</p>
                        </div>
                    </div>
                    <div className='flex justify-center items-center'>
                        <button className='bg-yellow-300 text-richblack-700 font-semibold text-xl p-3 px-5 rounded-md flex gap-1'>
                            <FaRegEdit className='relative top-1'/>&nbsp;Edit
                        </button>
                    </div>
                </div>
                <div className='bg-richblack-800 p-7 px-10 rounded-lg'>
                    <div className='flex justify-between'>
                        <h3 className='text-2xl font-semibold text-richblack-200'>Personal details</h3>
                        <button className='bg-yellow-300 text-richblack-700 font-semibold text-xl p-3 px-5 rounded-md flex gap-1'>
                            <FaRegEdit className='relative top-1'/> Edit
                        </button>
                    </div>
                    <div className='grid grid-cols-2 mt-8'>
                        <div>
                            <p className='text-md text-richblack-300/50 font-medium my-1'>First name</p>
                            <p className='text-xl font-medium mb-3'>{user.firstname}</p >
                        </div>
                        <div>
                            <p className='text-md text-richblack-300/50 font-medium my-1'>Last name</p>
                            <p className='text-xl font-medium mb-3'>{user.lastname}</p >
                        </div>
                        <div>
                            <p className='text-md text-richblack-300/50 font-medium my-1'>Email</p>
                            <p className='text-xl font-mediummb-3'>{user.email}</p >
                        </div>
                        <div>
                            <p className='text-md text-richblack-300/50 font-medium my-1'>Phone number</p>
                            <div >
                                {
                                    user.profile.mobileNumber === null ? (<p className='text-xl font-medium mb-3'>Add mobile number</p>)
                                    : (<p className='text-xl font-medium mb-3'>{user.profile.mobileNumber}</p>)
                                }
                            </div>
                        </div>
                        <div>
                            <p className='text-md text-richblack-300/50 font-medium my-1'>Phone number</p>
                            <div >
                                {
                                    user.profile.mobileNumber === null ? (<p className='text-xl font-medium mb-3'>Add date of birth</p>)
                                    : (<p className='text-xl font-medium mb-3'>{user.profile.dateOfBirth}</p>)
                                }
                            </div>
                        </div>
                        <div>
                            <p className='text-md text-richblack-300/50 font-medium my-1'>Phone number</p>
                            <div >
                                {
                                    user.profile.mobileNumber === null ? (<p className='text-xl font-medium mb-3'>Add gender</p>)
                                    : (<p className='text-xl font-medium mb-3'>{user.profile.gender}</p>)
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
  )
}

export default MyProfile