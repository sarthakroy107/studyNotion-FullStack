import React from 'react'
import {RxDotFilled} from 'react-icons/rx'
import {FaStar, FaRegStarHalfStroke, FaRegStar} from 'react-icons/fa6'
import { motion } from 'framer-motion'

const Rating = ({avgRating, sectionRating}) =>{
  return(
    <div className='relative top-1'>
      {
        avgRating >= sectionRating ? (<FaStar/>) : avgRating >= sectionRating-0.5 ? (<FaRegStarHalfStroke/>) : (<FaRegStar/>)
      }
    </div>
  )
}


const  CategoryCourses = ({course}) => {
  console.log(course)
  return (
    <motion.main initial={{y:0}} whileHover={{y:-8}} transition={{duration:0.15}}
    className='w-full h-72 rounded-lg flex flex-col
    justify-center items-center ga-3 bg-richblack-800'>
     <div className='w-11/12 h-32 rounded-md'>
      <img className='rounded-md w-full object-cover h-full border in border-richblack-900' src={course.thumbnail} alt="Image" />
    </div>
    <div className='w-5/6 text-2xl font-medium text-richblack-25 mb-2'>
      <h2>{course.coursename}</h2>
    </div>
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
    <div className='flex w-5/6'>
      <p>{course.lessons} lessons</p>
      <RxDotFilled className='relative top-[0.30rem]'/>
      <p>{course.courselength} hours</p>
    </div>
    <div className='w-5/6 text-2xl text-richblack-25 font-medium'>
      ₹ {course.price}
    </div>
    </motion.main>
  )
}

export default CategoryCourses