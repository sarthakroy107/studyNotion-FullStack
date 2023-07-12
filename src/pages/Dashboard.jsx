import React, { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import {VscAccount, VscSettingsGear} from 'react-icons/vsc'
import {FaGraduationCap} from 'react-icons/fa'
import {IoIosLogOut} from 'react-icons/io'

const Dashboard = () => {
  return (
    <main className='h-screen w-full bg-richblack-900 flex text-richblack-50'>
        <div className='w-2/12 max-h-screen bg-richblack-800 text-xl font-semibold flex flex-col gap-10'>
            <div className=''>
                <NavLink to={'/dashboard/my-profile'} className={({ isActive }) =>
                    isActive ? "group text-yellow-300 bg-yellow-300 font-bold" : ""
                    }  >
                    <div className='flex'>
                        <div className=' ml-3 flex gap-2 my-2'>
                            <VscAccount className='relative top-[0.30rem]'/>My profile
                        </div>
                    </div>
                </NavLink>
                <NavLink to={'dashboard/enrolled-courses'}
                className={({ isActive }) =>
                isActive ? " text-yellow-300 bg-yellow-300 font-bold" : ""
                }  >
                <div className='ml-3 flex gap-2 my-2'>
                    <FaGraduationCap className='relative top-[0.30rem]'/>Enrolled course
                </div>
                </NavLink>
            </div>
            <div>
               <NavLink to={'/dashboard/settings'} className={({ isActive }) =>
                    isActive ? " text-yellow-300 bg-yellow-300 font-bold" : ""
                    }  >
                    <div className='ml-3 flex gap-2 my-2'>
                        <VscSettingsGear className='relative top-[0.30rem]'/> Settings
                    </div>
               </NavLink>
                <NavLink to={'/logout'} className={({ isActive }) =>
                    isActive ? " text-yellow-300 bg-yellow-300 font-bold" : ""
                    }  >
                    <div className='ml-3 flex gap-2 my-2'>
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