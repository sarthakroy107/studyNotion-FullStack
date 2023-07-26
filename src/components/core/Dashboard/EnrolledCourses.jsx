import React from 'react'
import { apiConnector } from '../../../services/apiconnector'
import { courseEndpoints } from '../../../services/api'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import RatingModal from './RatingModal'
const EnrolledCourses = () => {

  const [courses, setCourses] = useState([])
  const {token} = useSelector((state)=>state.auth)
  const [ratingModal, setRatingModal] = useState(false)
  
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
    console.log(ratingModal)
  }, [courses, ratingModal])
  return (
    <main className='min-h-screen w-full bg-richblack-900 flex justify-center'>
      <div className=' w-5/6'>
        <h2 className='text-3xl font-medium my-7'>Enrolled courses</h2>
        <div className='w-full border border-richblack-100/75 rounded-md'>
          <div className='flex w-full border-b border-richblack-200/30 py-1 my-1'>
            <p className='w-2/5 px-5 border-r border-richblack-200/30'>Course Name</p>
            <p className='w-[15%] text-center px-5 border-r border-richblack-200/30'>Duration</p>
            <p className='w-[25%] text-center px-5 border-r border-richblack-200/30'>Progress</p>
            <p className='w-1/5 text-center px-5'>Rating</p>
          </div>
          <div className='flex flex-col'>
            {
              courses.map((course, index)=>(
                <div className='flex my-2'>
                  <div className='h-28 w-1/5 overflow-hidden  px-2'>
                    <img className='w-48 h-28 object-contain rounded-lg' src={course._doc.thumbnail}/>
                  </div>
                  <div className='text-xl w-1/5 flex flex-col justify-center gap-1 text-richblack-50 font-medium'>
                    <p>{course._doc.coursename}</p>
                    <div>
                      {
                        course._doc.educator ? (
                          <p className='text-md text-richblack-200/75'>By {course._doc.educator.firstname} 
                          {course._doc.educator.lastname}</p>
                        ) : (<p className='text-sm text-richblack-400/50'>Loading...</p>)
                      }
                    </div>
                  </div>
                  <div className='w-[15%] flex justify-center items-center'>
                      {course._doc.courselength} hours
                  </div>
                  <div className='w-[25%] flex flex-col justify-center items-center px-4'>
                    <div className='w-full'>
                      Course progress: {Math.ceil((course.progress/course._doc.lessons)*100)}
                    </div>
                      <div className=' bg-richblack-300 w-full h-1 rounded-full my-3'>
                        <div className={`bg-blue-500 
                        ${course.progress > 0 ? `w-[${Math.ceil((course.progress/course._doc.lessons)*100)}%]` : 'w-0'} h-1 rounded-full`}></div>
                      </div>
                  </div>
                  <div className='w-1/5 flex justify-center items-center'>
                      <button onClick={()=>setRatingModal(true)}>
                        <RatingModal isVisible={ratingModal} onClose={()=>setRatingModal(!ratingModal)}/>
                        rate
                      </button>
                  </div>
                </div>

              ))
            }
          </div>
        </div>
      </div>

    </main>
  )
}

export default EnrolledCourses