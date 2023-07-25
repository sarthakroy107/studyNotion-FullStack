import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { apiConnector } from '../../../services/apiconnector'
import { courseEndpoints } from '../../../services/api'
import { useState } from 'react'
import {MdPublishedWithChanges, MdOutlineDeleteOutline} from 'react-icons/md'
import {PiClockLight, PiNotePencilLight} from 'react-icons/pi'
import { useNavigate } from 'react-router-dom'

const MyCourses = () => {

  const {token} = useSelector((state)=>state.auth)
  const [courses, setCourses] = useState([])
  const navigate = useNavigate();
  const fetchDetails = async () => {
    try{
      const res = await apiConnector("PUT", courseEndpoints.GET_MY_COURSES, null, {
        Authorization: `Bearer ${token}`,
      })
      console.log(res)
      setCourses(res.data.data.myCourses)
    }catch(err) {
      console.log(err)
    }
  }
  useEffect(()=>{
    fetchDetails()
  }, [])

  useEffect(()=>{
    console.log(courses)
  }, [courses])

  return (
    <main className='w-full min-h-screen flex flex-col items-center'>
      <div className='w-11/12 text-4xl font-medium my-7'>My courses</div>
      <div className='w-11/12 border border-richblack-200/75 rounded-lg'>
        <div className='w-full flex my-2 text-richblack-200/75 border-b pb-1 border-richblack-300/50'>
          <p className='w-[50%] text-center'>Course</p>
          <p className='w-[20%]  text-center'>Course Id</p>
          <p className='w-[10%] text-center'>Duration</p>
          <p className='w-[10%] text-center'>Price</p>
          <p className='w-[10%] text-center'>Actions</p>
        </div>
        <div className='w-full flex flex-col p-3'>
          {
            courses.map((course)=>(
              <div className='w-full my-1 flex border-b p-2 pb-4 border-richblack-300/50'>
                <img className='w-[20%] rounded-md' src={course.thumbnail} />
                <div className='w-[30%] p-2'>
                  <p className='text-2xl font-medium'>{course.coursename}</p>
                  <p className='text-xl text-richblack-200/75'>{course.coursedescription}</p>
                  <p>{course.published === true ? (
                    <div className='flex text-md my-3 rounded-full bg-richblack-100/20 
                    px-3 p-[0.15rem] text-yellow-300 w-fit'>
                      <MdPublishedWithChanges className='relative top-1 mr-1'/> Published
                    </div>
                  ): (
                    <div className='flex text-md rounded-full bg-richblack-100/20 my-3
                    p-[0.15rem] text-red-400 w-fit px-3'>
                      <PiClockLight className='relative top-[0.35rem] mr-1'/> Draft
                    </div>
                  )}</p>
                </div>
                <div className='w-[20%]'>
                  {course._id}
                </div>
                <div className='flex w-[30%]'>
                  <p className='w-1/3 text-center'>{course.courselength}h</p>
                  <p className='w-1/3 text-center'>₹{course.price}</p>
                  <div className='w-1/3 flex justify-center text-2xl font-medium '>
                    <div onClick={()=>navigate(`/dashboard/add-section/${course._id}`)}
                     className='p-1 rounded-full hover:bg-richblack-200/30 cursor-pointer h-fit'>
                      <PiNotePencilLight/>
                    </div>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </main>
  )
}

export default MyCourses