import React, { useState } from 'react'
import { useEffect } from 'react'
import { apiConnector } from '../../../../services/apiconnector'
import { courseEndpoints } from '../../../../services/api'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CreateCourse1 = () => {
    const [categories, setCategories] = useState([])
    const [courseDetails, setCourseDetails] = useState([]);
    const {token} = useSelector((state)=>state.auth)
    const navigate = useNavigate();
    //fetch category details
    const fetchCategories = async () => {
        const res = await apiConnector("GET", courseEndpoints.COURSE_CATEGORIES_API)
        setCategories(res?.data?.data)
    }
    
    const handleOnChange = (e) => {
        setCourseDetails({
            ...courseDetails, [e.target.name]: e.target.value
        })
        console.log(courseDetails)
    }


    const handleOnSubmit = async (e) => {
        e.preventDefault();
        try{
            console.log(courseDetails)
            const res = await apiConnector("POST", courseEndpoints.CREATE_COURSE_API, courseDetails, {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            })
            const courseId = res?.data?.data;
            navigate(`/dashboard/add-section/${courseId}`)

        }catch(err) {
            console.log(err);
        }
    }
    
    useEffect(()=>{
        fetchCategories();
    }, [])

    useEffect(()=>{
        console.log(categories)
        console.log(courseDetails)
    }, [categories, courseDetails])

  return (
    <main className='w-full min-h-screen bg-richblack-900 flex flex-col justify-center items-center gap-7'>
        <div className='w-3/5'><h2 className='text-3xl font-medium'>Create Course</h2></div>
        <form onSubmit={handleOnSubmit} className='flex flex-col gap-3 w-3/5 bg-richblack-800 rounded-md p-7'>
            <div className='flex flex-col gap-2'>
                <label>Course Title</label>
                <input className='bg-richblack-700/75 rounded-lg' 
                onChange={handleOnChange}
                type="text" 
                name="coursename" 
                placeholder='Enter course title' 
                required/>
            </div>
            <div className='flex flex-col gap-2'>
                <label>Course description</label>
                <input className='bg-richblack-700/75 rounded-lg' 
                onChange={handleOnChange}
                type="text" 
                name="coursedescription" 
                placeholder='Course description'  
                required/>
            </div>
            <div className='flex flex-col gap-2'>
                <label>Price(₹)</label>
                <input className='bg-richblack-700/75 rounded-lg' 
                onChange={handleOnChange}
                type="number" 
                name="price"  
                placeholder='Enter course price'
                required/>
            </div>
            <div className='flex flex-col gap-2'>
                <label>Couse duration in hours</label>
                <input className='bg-richblack-700/75 rounded-lg' 
                onChange={handleOnChange}
                type="Number" 
                name="courselength" 
                placeholder='Course hours' 
                required/>
            </div>
            <div className='flex flex-col gap-2'>
                <label>Category</label>
                <select className='bg-richblack-700/75 rounded-lg'
                onChange={handleOnChange} name="category" id="">
                    <option selected disabled hidden>Choose here</option>
                    {
                        categories.map((category)=>(
                            <option className='text-richblack-200' value={category?._id}>{category?.name}</option>
                        ))
                    }
                </select>
            </div>
            <div className='flex flex-col gap-2'>
                <label>Thumbnail</label>
                <input className='bg-richblack-700/75 rounded-lg' 
                onChange={(e)=>{setCourseDetails({...courseDetails, [e.target.name]: e.target.files[0]})}}
                accept=".jpg, .jpeg, .png"
                type="file"
                name='thumbNailImage'
                required/>
            </div>
            <div>
                <button onClick={()=>{navigate(`/dashboard/add-section/${id}`)}}
                 className='bg-yellow-300 text-richblack-800 p-1 px-3 text-lg rounded-lg font-medium mt-5'>Next</button>
            </div>
        </form>
    </main>
  )
}
export default CreateCourse1