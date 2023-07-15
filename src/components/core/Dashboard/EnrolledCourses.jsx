import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { apiConnector } from '../../../services/apiconnector';
import { courseEndpoints, profileEndpoints } from '../../../services/api';

const EnrolledCourses = () => {
  const [courses, setCourses] = useState([]);
  const {user} = useSelector((state)=>state.profile)
  const {token} = useSelector((state)=>state.auth)
  const fetchEnrolledCourses = async () => {
    const res = await apiConnector("GET", profileEndpoints.GET_USER_ENROLLED_COURSES_API, null, {
      Authorization: `Bearer ${token}`
    })
    console.log(res?.data?.data.courses)
    setCourses(res?.data?.data.courses)
    
  }
  useEffect(()=>{
    fetchEnrolledCourses();
  }, [])
  useEffect(()=>{
    console.log(courses)
  }, [courses])
  return (
    <main className='text-xl text-richblack-25 w-full min-h-full'>
      <div className='m-16'>
        <h2 className='text-3xl font-medium my-12'>Enrolled courses</h2>
        <div className='flex w-full gap-5 flex-wrap'>
          {
            courses.map((course)=>(
              <div className='group w-1/4 h-64  rounded-sm flex justify-center 
              bg-richblack-800 hover:shadow-[10px_10px_0px_0px_rgba(222,222,222)]'>
                <div className='w-5/6 flex justify-center items-center flex-col gap-5'>
                  <div className='w-full h-36 overflow-hidden'>
                    <img className='w-full rounded-md group-hover:scale-105 duration-300 h-36 object-cover' src={course.thumbnail} alt="" />
                  </div>
                  <p className='font-semibold'>{course.coursename}</p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </main>
  )
}

export default EnrolledCourses