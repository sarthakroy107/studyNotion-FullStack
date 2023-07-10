import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getCourseDetails } from '../services/operations/courseDetailsAPI';
import {AiFillStar, AiOutlineInfoCircle, AiOutlineShareAlt} from "react-icons/ai"
import Dates from '../components/common/Dates';
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from '../slices/cartSlice';

const CourseDetails = () => {
    const [response, setResponse] = useState("");
    const [avgRating, setAvgRating] = useState("")
    const [educatorDetails, setEducatorDetails] = useState("")
    const {id} = useParams();
    const {cart, total, totalItems} = useSelector((state)=> state.cart);
    const dispatch = useDispatch();
    
    useEffect(()=>{
        (async ()=>{
            try{
                const res = await getCourseDetails(id)
                console.log(res?.data?.data)
                setResponse(res?.data?.data?.courseDetails);
                setAvgRating(res?.data?.data?.avgRating[0].avgR)
                setEducatorDetails(res?.data?.data?.courseDetails?.educator)
            }
            catch(err) {
                console.log(err)
            }
        })()
    }, [id])


    useEffect( ()=>{
    }, [response]) 
    const handleAddToCart = () => {
        dispatch(addToCart(response));
        console.log("I'm in func")
    }
  return (
    <main className='w-full bg-richblack-800 flex flex-col justify-center items-center text-richblack-300 pt-16'>
        <div className='w-4/5 my-20 flex'>
            <div className='w-2/3'>
                <h2 className='text-5xl font-bold text-richblack-25'>{response.coursename}</h2>
                <p className='text-xl my-4 text-richblack-200'>{response.coursedescription}</p>
                <p className='flex bg-yellow-300 font-semibold rounded-full w-fit p-1 px-2 my-5 text-richblack-600 text-lg'>
                    {avgRating}&nbsp;<AiFillStar className='relative top-[0.30rem]'/>
                </p>
                <p className='flex text-lg'>Created by&nbsp;
                    <img className='w-7 rounded-full' src={educatorDetails.image} alt="" />&nbsp;
                    <span className='text-xl text-richblack-100 font-semibold'>
                        {educatorDetails.firstname} {educatorDetails.lastname}
                    </span>
                </p>
                <p className='flex my-4 text-richblack-100'>
                    <AiOutlineInfoCircle className='relative top-[0.30rem]'/>
                    &nbsp; Lasted updated on&nbsp; <Dates date={response.lastEdited}/> 
                </p>
            </div>
            <div className='w-1/3 flex justify-center absolute top-32 right-24 items-center'>
                <div className='w-5/6 flex justify-center items-center bg-richblack-700 rounded-lg py-10'> 
                    <div className='w-4/5 flex flex-col gap-6'>
                        <img className='rounded-lg scale-105' src={response.thumbnail} alt="thubnail" />
                        <p className='text-3xl font-bold text-richblack-25 my-2'>Rs. {response.price}</p>
                        <button className='w-full bg-yellow-300 rounded-lg py-2 text-richblack-800 font-semibold text-xl'>
                            Buy Now
                        </button>
                        <button onClick={()=>handleAddToCart()}
                        className='w-full bg-richblack-800 rounded-lg py-2 text-richblack-100 font-semibold text-xl'>
                            Add to Cart
                        </button>
                        <div className='flex flex-col justify-center items-center gap-2'>
                            <p className='text-richblack-300 text-lg'>No refunds</p>
                            <p className='text-lg text-richblack-200'>Life-time access</p>
                            <p className='flex text-xl font-semibold text-yellow-300 mt-2'>
                                <AiOutlineShareAlt className='relative top-[0.30rem]'/>&nbsp; Share
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <div className='w-full bg-richblack-900 flex justify-center h-screen'>
            <div className='w-4/5'>
                <div className='border border-richblack-100 w-1/2 p-7 px-10 my-8'>
                    <p className='text-3xl text-richblack-100 font-semibold'>What you will learn</p>
                    <p className='text-xl mt-4'>{response.whatWillYouLearn}</p>
                </div>
            </div>
        </div>
    </main>
    
  )
}

export default CourseDetails