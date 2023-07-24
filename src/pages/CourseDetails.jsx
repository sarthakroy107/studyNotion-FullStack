import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getCourseDetails } from '../services/operations/courseDetailsAPI';
import {AiFillStar, AiOutlineInfoCircle, AiOutlineShareAlt} from "react-icons/ai"
import Dates from '../components/common/Dates';
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from '../slices/cartSlice';
import { buyCourse } from '../services/operations/paymentApi';

const CourseDetails = () => {

  return (
   <main className='w-full min-h-screen bg-richblack-800'>
    
   </main>
    
  )
}

export default CourseDetails