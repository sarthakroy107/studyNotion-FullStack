import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { getCourseDetails } from '../services/operations/courseDetailsAPI';
import {AiFillStar, AiOutlineInfoCircle, AiOutlineShareAlt} from "react-icons/ai"
import Dates from '../components/common/Dates';
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from '../slices/cartSlice';
import { buyCourse } from '../services/operations/paymentApi';
import { apiConnector } from '../services/apiconnector';
import { courseEndpoints } from '../services/api';
import {FaPlus, FaCheck, FaEarthAsia, FaHourglassStart, FaStar, FaRegStarHalfStroke, FaRegStar, FaGlobe} from 'react-icons/fa6'
import Accordion from '../components/core/Accordion';

const Rating = ({avgRating, sectionRating}) =>{
  return(
    <div className='relative top-1'>
      {
        avgRating >= sectionRating ? (<FaStar/>) : avgRating >= sectionRating-0.5 ? (<FaRegStarHalfStroke/>) : (<FaRegStar/>)
      }
    </div>
  )
}

const CourseDetails = () => {
  const {id} = useParams();
  const {token} = useSelector((state)=>state.auth)
  const {user} =useSelector((state)=>state.profile)
  const [course, setCourse] = useState({})
  const [courseName, setCourseName] = useState("")
  const fetchCourseDetails = async () => {
    const res = await apiConnector("POST", courseEndpoints.COURSE_DETAILS_API, {courseId: id}, {
      Authorization: `Bearer ${token}`,
    })
    setCourse(res?.data?.data)
    console.log(res?.data?.data)
  }

  const handleBuyNow = ()=> {
    buyCourse(token, [id], user,)
  }

  useEffect(()=>{
    fetchCourseDetails()
  },[])

  let truncatedName;
  useEffect(()=>{
    (async()=>{
      {
        truncatedName = course.coursename.length >=20 ? 
          course.coursename.slice(0,20).join(" ") + "..."
         : course.coursename
      }
      setCourseName(truncatedName)
    })()
    console.log(truncatedName)
  }, [course, truncatedName])


  useEffect(()=>{

  }, [courseName])


  return (
   <main className='w-full min-h-screen bg-richblack-900 text-richblack-200 flex md:flex-col md:items-center'>
    <div className='w-full md:w-11/12 lg:w-3/4 flex flex-col md:flex-row gap-3 p-7 h-80'>
      <div className='w-full md:w-1/2'>
       {
        course.category ?(
          <p className='text-xl'>
            <NavLink to={'/'} className="text-blue-500 underline">Home</NavLink> / 
            <NavLink to={`/category/${course.category.name.split(" ").join("-").toLowerCase()}`} className="text-blue-500 underline"> 
            {course.category.name} </NavLink>
             / {courseName}
          </p>
        ) : (
          <p>Loading...</p>
        )
       }
        <p className='text-5xl mt-10 mb-3 font-medium text-richblack-50'>{course.coursename}</p>
        <p className='text-2xl'>{course.coursedescription}</p>
        <div className='my-2'>
          <div className='flex w-10/12 gap-1 text-yellow-200'>
            {
              ["","","","",""].map((star, index)=>(
                <Rating key={index} avgRating={course.avgRating} sectionRating={index+1} />
              ))
            }
            <p className='text-richblack-300/75'>
              {
                course.avgRating === 0 ? (<p>(No reviews)</p>) : (<p>({course.avgRating})</p>)
              }
            </p>
          </div>
        </div>
        <div className='flex'>
          Created by {
            course.educator ? (<p>&nbsp;{course.educator.firstname} {course.educator.lastname}</p>) :
            (<p>Loading...</p>)
          } <FaGlobe className='mx-2 ml-5 relative top-1'/> Hinglish
        </div>
      </div>
      <div className='rounded-md w-full md:w-1/2'>
       <div className='w-full md:w-80 md:absolute md:right-48 bg-richblack-800 py-5 rounded-md flex flex-col items-center '>
        <div className='w-5/6'>
          <img className='w-full rounded' src={course.thumbnail}/>
        </div>
        <p className='w-5/6 my-2 text-2xl font-medium text-richblack-100'>₹ {course.price}</p>
        <button onClick={handleBuyNow}
         className='w-5/6 bg-yellow-200 rounded-md py-1 text-xl text-richblack-800 font-medium'>BUY NOW</button>
        <div className='w-11/12 border-b border-richblack-900/30 my-3'></div>
        <div className='w-5/6'>
          <p className='text-lg font-medium text-richblack-50'>What's included</p>
          <div>
            <p className='flex my-1 gap-2 text-lg font-medium'><FaPlus className='relative top-2 text-sm font-normal'/>
              {course.lessons} lessons included
            </p>
            <p className='flex gap-2 text-lg font-medium'> <FaHourglassStart className='relative top-2 text-sm font-normal'/> 
              {course.courselength} hours of lectures
            </p>
            <p className='flex gap-2 text-lg my-1 font-medium'> <FaEarthAsia className='relative top-2 text-sm font-normal'/> 
              Online accessibility
            </p>
            <p className='flex gap-2 text-lg font-medium'><FaCheck className='relative top-2 text-sm font-normal'/> 
              Lifetime accesss
            </p>

          </div>
        </div>
       </div>
      </div>
    </div>
    <div className='w-full flex justify-center'>
      <div className='w-3/4 px-3 flex justify-center'>
        <div className='w-2/3 border border-richblack-100/20 rounded-lg overflow-hidden'>
          {
            course.courseSection ? (
              <div>
                {
                  course.courseSection.map((section, index)=>(
                    <Accordion section={section} index={index}/>
                  ))
                }
              </div>
            ) : (
              <p>Loading...</p>
            )
          }
        </div>
        <div className='w-1/3 '></div>
      </div>
    </div>
   </main>
    
  )
}

export default CourseDetails