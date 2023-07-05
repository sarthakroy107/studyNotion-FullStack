import React, { useEffect, useState } from 'react'
import { Link, NavLink, useParams } from 'react-router-dom'
import { apiConnector } from '../services/apiconnector';
import { catalogData, categories } from '../services/api';
import CategoryCourses from '../components/core/category/CategoryCourses';

const Category = () => {
    const {id} = useParams();
    const [categoryId, setCategoryId] = useState("");
    const [topCourses, setTopCourses] = useState([]);
    const [newCourses, setNewCourses] = useState([]);
    useEffect(()=>{
      const getCategoryData = async () => {
        const res = await apiConnector("GET", categories.CATEGORIES_API)
        const category_id = res?.data?.data?.filter((ct) => ct.name.split(" ").join("-").toLowerCase() === id);
        console.log("category_id: " + category_id[0]._id)
        setCategoryId(category_id[0]._id)
      }
      getCategoryData();
    }, [id])

    useEffect(()=>{
      const getCourses = async () => {
        console.log("CategoryId: " + categoryId)
        const res = await apiConnector("POST", catalogData.CATALOGPAGEDATA_API, {categoryId: categoryId})
        console.log(res?.data?.data)
        setNewCourses(res?.data?.data?.newCourses)
        setTopCourses(res?.data?.data?.topCourses)
      }
      getCourses();

    },[categoryId])
  return (
    <main className='h-screen w-full bg-richblack-900'>
      <div className='text-richblack-500 text-lg font-semibold w-full bg-richblack-800 p-4 py-8 flex justify-center'>
        <div className='w-3/4'>Home / Categories / <span className='text-yellow-50 font-normal'>{id}</span></div>
      </div>
      <div className='flex flex-col bg-richblack-900 text-richblack-200 justify-center items-center'>
        <div className='w-4/5'>
          <h2 className='text-3xl ml-3 font-semibold my-4'>Top selling courses</h2>
          <div className='grid grid-cols-3'>
            {
              topCourses.map((course)=>(
                  <NavLink to={`/course/${course._id}`}>
                    <CategoryCourses course={course} />
                  </NavLink>
              ))
            }
          </div>
        </div>
        <div className='w-4/5'>
          <h2 className='text-3xl ml-3 font-semibold my-4'>Latest courses</h2>
          <div className='grid grid-cols-3'>
            {
              newCourses.map((course)=>(
                <NavLink to={`/course/${course._id}`}>
                  <CategoryCourses course={course} />
                </NavLink>
              ))
            }
          </div>
        </div>
      </div>
    </main>
  )
}

export default Category