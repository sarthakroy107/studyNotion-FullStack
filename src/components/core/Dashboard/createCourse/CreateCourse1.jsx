import React, { useState } from 'react'
import { useEffect } from 'react'
import { apiConnector } from '../../../../services/apiconnector'
import { courseEndpoints } from '../../../../services/api'

const CreateCourse1 = () => {
    const [categories, setCategories] = useState([])
    const fetchCategories = async () => {
        const res = await apiConnector("GET", courseEndpoints.COURSE_CATEGORIES_API)
        setCategories(res?.data?.data)
    }
    useEffect(()=>{
        fetchCategories();
    }, [])
    useEffect(()=>{
        console.log(categories)
    }, [categories])

  return (
    <main className='w-full min-h-screen bg-richblack-900 flex justify-center items-center'>
        <form className='flex flex-col gap-3 w-3/5 bg-richblack-800 rounded-md p-7'>
            <div className='flex flex-col gap-2'>
                <label>Course Title</label>
                <input className='bg-richblack-700/75 rounded-lg' type="text" name="coursename" placeholder='Enter course title' />
            </div>
            <div className='flex flex-col gap-2'>
                <label>Course description</label>
                <input className='bg-richblack-700/75 rounded-lg' type="text" name="coursedescription" placeholder='Course description'  />
            </div>
            <div className='flex flex-col gap-2'>
                <label>Price(₹)</label>
                <input className='bg-richblack-700/75 rounded-lg' type="text" name="price"  placeholder='Enter course price'/>
            </div>
            <div className='flex flex-col gap-2'>
                <label>Couse duration in hours</label>
                <input className='bg-richblack-700/75 rounded-lg' type="text" name="courselength" placeholder='Course hours' />
            </div>
            <div className='flex flex-col gap-2'>
                <label>Category</label>
                <select className='bg-richblack-700/75 rounded-lg' name="" id="">
                    {
                        categories.map((category)=>(
                            <option className='text-richblack-200' value={category?.name}>{category?.name}</option>
                        ))
                    }
                </select>
            </div>
            <div className='flex flex-col gap-2'>
                <label>Thumbnail</label>
                <input className='bg-richblack-700/75 rounded-lg' type="file" name='thumbnail'  />
            </div>
            <div>
                <button>Next</button>
            </div>
        </form>
    </main>
  )
}

export default CreateCourse1