import React from 'react'
import { apiConnector } from '../../../services/apiconnector'
import { courseEndpoints } from '../../../services/api'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useState } from 'react'
const EnrolledCourses = () => {

  const [courses, setCourses] = useState([])
  const {token} = useSelector((state)=>state.auth)
  const fetchEnrolledCourses = async () => {
    const res = await apiConnector("POST", courseEndpoints.GET_ENROLLED_COURSES, null, {
      Authorization: `Bearer ${token}`,
    })
    console.log(res?.data?.data)
    setCourses(res?.data?.data);
  }

  useEffect(()=>{
    fetchEnrolledCourses()
  }, [])

  useEffect(()=>{
    console.log(courses)
  }, [courses])
  return (
    <main className='min-h-screen w-full bg-richblack-900 flex justify-center'>
      <div className=' w-5/6'>
        <h2 className='text-3xl font-medium my-7'>Enrolled courses</h2>
        <div className='w-full border border-richblack-100'>
          {
            courses.map((course, i)=>(
              <p>{course.coursename}</p>
            ))
          }
        </div>
      </div>

    </main>
  )
}

export default EnrolledCourses