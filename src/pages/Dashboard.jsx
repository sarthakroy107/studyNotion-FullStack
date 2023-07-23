import React, { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import {VscAccount, VscSettingsGear, VscAdd} from 'react-icons/vsc'
import {FaGraduationCap} from 'react-icons/fa'
import {IoIosLogOut} from 'react-icons/io'
import { PiMonitor } from 'react-icons/pi'

const Dashboard = () => {
  return (
    <main className='min-h-screen w-full bg-richblack-900 flex text-richblack-50'>
        <div className='w-2/12 min-h-screen bg-richblack-800 text-xl font-semibold flex flex-col gap-3'>
            <div className='my-7 flex flex-col gap-2'>
                <NavLink to={'/dashboard/my-profile'} className={({ isActive }) =>
                    isActive ? "group text-yellow-300 bg-yellow-300/10 font-bold" : ""
                    }  >
                    <div className='flex'>
                        <div className=' ml-3 flex py-2 gap-2'>
                            <VscAccount className='relative top-[0.30rem]'/>My profile
                        </div>
                    </div>
                </NavLink>
                <NavLink to={'dashboard/enrolled-courses'}
                className={({ isActive }) =>
                isActive ? " text-yellow-300 bg-yellow-300/10 font-bold" : ""
                }  >
                <div className='ml-3 py-2 flex gap-2'>
                    <FaGraduationCap className='relative top-[0.30rem]'/>Enrolled course
                </div>
                </NavLink>
            </div>
            <div className='h-[1px] mx-2 bg-richblack-300/25'></div>
            <div className='my-7 flex flex-col gap-2'>
                <NavLink to={'/dashboard/my-courses'} className={({ isActive }) =>
                    isActive ? "group text-yellow-300 bg-yellow-300/10 font-bold" : ""
                    }  >
                    <div className='flex'>
                        <div className=' ml-3 flex py-2 gap-2'>
                            <PiMonitor className='relative top-[0.30rem]'/>My courses
                        </div>
                    </div>
                </NavLink>
                <NavLink to={'/dashboard/add-course'} className={({ isActive }) =>
                    isActive ? "group text-yellow-300 bg-yellow-300/10 font-bold" : ""
                    }  >
                    <div className='flex'>
                        <div className=' ml-3 flex py-2 gap-2'>
                            <VscAdd className='relative top-[0.30rem]'/>Add course
                        </div>
                    </div>
                </NavLink>
            </div>
            <div className='h-[1px] mx-2 bg-richblack-300/25'></div>
            <div className='flex flex-col gap-2'>
               <NavLink to={'/dashboard/settings'} className={({ isActive }) =>
                    isActive ? " text-yellow-300 bg-yellow-300/10 font-bold" : ""
                    }  >
                    <div className='ml-3 py-2 flex gap-2'>
                        <VscSettingsGear className='relative top-[0.30rem]'/> Settings
                    </div>
               </NavLink>
                <NavLink to={'/logout'} className={({ isActive }) =>
                    isActive ? " text-yellow-300 bg-yellow-300 font-bold" : ""
                    }  >
                    <div className='ml-3 flex gap-2'>
                        <IoIosLogOut className='relative top-[0.30rem]'/> Logout
                    </div>
                </NavLink>
            </div>
        </div>
        <div className='w-10/12'><Outlet/></div>

    </main>
  )
}

export default Dashboard