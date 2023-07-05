import React from 'react'
import { NavLink } from 'react-router-dom'
import { apiConnector } from '../../../services/apiconnector'

const CategoryCourses = ({course}) => {
    console.log(course)

  return (
    <main className='w-full flex flex-col justify-center items-center'>
      <div className='w-3/4 flex flex-col gap-3'>
        <div className='w-full'><img className='rounded-lg h-48 w-full object-cover' src={course.thumbnail} alt="" /></div>
        <div>
          <p className='text-2xl font-semibold text-richblack-50'>{course.coursename}</p>
          <p>students enrolled: <span>{course.numberOfStudents}</span></p>
          <p className='text-xl font-semibold text-richblack-50'>Rs. <span>{course.price}</span></p>
        </div>
      </div>
    </main>
  )
}

export default CategoryCourses