import React from 'react'
import { NavLink } from 'react-router-dom'
import {VscAdd} from 'react-icons/vsc'

const AddCourse = () => {
  return (
    <main className='m-12'>
        <div className='flex flex-wrap gap-4 w-full'>
            <NavLink to={'/dashboard/create-course-1'}>
                <div className='w-72 h-56 border-2 border-richblack-300/75 rounded-xl 
                flex justify-center items-center flex-col gap-3'>
                    <VscAdd className='w-1/2 h-28 text-richblack-300/75 font-extralight'/>
                    <p className='text-lg font-medium text-richblack-300/75'>Add new course</p>
                </div>
            </NavLink>
        </div>
    </main>
  )
}

export default AddCourse