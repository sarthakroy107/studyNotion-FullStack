import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { courseEndpoints } from '../services/api';
import { apiConnector } from '../services/apiconnector';
import { useDispatch } from 'react-redux';
import { getCourseDetails } from '../services/operations/courseDetailsAPI';

const CourseDetails = () => {
    const dispatch = useDispatch()
    const [response, setResponse] = useState("");
    const {id} = useParams();
    useEffect(()=>{
        (async ()=>{
            try{
                console.log("In try block")
                const res = await getCourseDetails(id)
                console.log(res?.data?.data)
                setResponse(res?.data?.data);
            }
            catch(err) {
                console.log(err)
            }
        })()
    }, [id])

    useEffect(()=>{

    }, [response])

  return (
    <main className=' w-full h-screen bg-richblack-900 text-richblack-100'>
        <div className='bg-richblack-800 p-28 flex'>
            <div className='w-4/5'>
                <p className='text-4xl mb-4 font-bold text-richblack-50'>{response.coursename}</p>
                <p className='text-xl my-4 font-semibold text'>{response.coursedescription}</p>
                <p className='text-lg my-4 font-semibold'>Students enrolled: {response.numberOfStudents}</p>
            </div>
        </div>
        <div className='w-full flex px-28 py-12'>
            <div className='w-4/5'>
                <div className='border-2 border-richblack-25 text-richblack-25 p-8 font-bold text-2xl w-1/2'>
                   <p>What you will learn</p>
                   <span className='font-normal my-4 text-xl'>{response.whatWillYouLearn}</span>
                </div>
            </div>
        </div>
    </main>
    
  )
}

export default CourseDetails