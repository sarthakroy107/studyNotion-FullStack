import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiConnector } from '../../../../services/apiconnector';
import { courseEndpoints } from '../../../../services/api';
import {RiAddCircleLine, RiEdit2Line, RiDeleteBin6Line} from 'react-icons/ri'
import { useSelector } from 'react-redux';

const AddSection = () => {
    const {id} = useParams();
    const [sectionName, setSectionName] = useState("")
    const {token} = useSelector((state)=>state.auth)
    const [sections, setSections] = useState([]);

    const handleOnSubmit = async (e) => {
        e.preventDefault()
        const res = await apiConnector("POST", courseEndpoints.CREATE_SECTION_API, {sectionName: sectionName, courseId: id}, 
        {
            Authorization: `Bearer ${token}`,
        })
        setSectionName("")
        fetchSections();
        console.log(res)
    }

    const handleDeleteSection = async ({sectionId}) => {
        try{
            await apiConnector("POST", courseEndpoints.DELETE_SECTION_API, {sectionId, courseId: id}, {
                Authorization: `Bearer ${token}`,
            })
            fetchSections();
        }catch(err) {
            console.log(err);
        }
    }

    const handleEditSection = async ({sectionId, }) => {
        try{
            await apiConnector("POST", courseEndpoints.DELETE_SECTION_API, {sectionId, courseId: id}, {
                Authorization: `Bearer ${token}`,
            })
            fetchSections();
        }catch(err) {
            console.log(err);
        }
    }

    const fetchSections = async () => {
        console.log("Id: " + id)
        const res = await apiConnector("PUT", courseEndpoints.GET_SECTION_DEATILS, {
            courseId: id,
        })
        setSections(res.data.data.courseSection)
        console.log(res.data.data.courseSection)
    }
    useEffect(()=>{
        fetchSections();
    }, [])

    useEffect(()=>{

    }, [sections])
        
  return (
    <main className='w-full min-h-screen flex flex-col gap-5 items-center'>
        <div className='w-3/5 text-3xl font-semibold mt-12'><h2>Add Sections</h2></div>
        <div className='w-3/5 bg-richblack-800 flex flex-col gap-5 p-8 rounded-lg text-richblack-300/75'>
            {
                sections.map((s, id)=>(
                    <div key={id} className='group flex w-full justify-between text-xl hover:text-richblack-5
                     h-9 hover:border-y hover:border-white/20'>
                        {s.sectionName}
                        <div className='flex text-xl gap-4'>
                          <div onClick={()=>handleEditSection({sectionId: s._id})}
                        className='hidden group-hover:block hover:bg-white/30 group-hover:text-richblack-50/75
                           hover:text-white/50 p-2 rounded-full cursor-pointer' >
                            <RiEdit2Line/> 
                        </div>
                         <div onClick={()=>handleDeleteSection({sectionId: s._id})}
                        className='hidden group-hover:block hover:bg-red-400/30 group-hover:text-richblack-50/75
                          hover:text-red-700/50 p-2 rounded-full cursor-pointer'>
                            <RiDeleteBin6Line/>
                        </div>
                        </div>
                    </div>
                ))
            }
        </div>
        <form onSubmit={handleOnSubmit} className='w-3/5 bg-richblack-800 flex flex-col gap-5 p-8 rounded-lg'>
            <input value={sectionName}
             onChange={(e)=>{setSectionName(e.target.value)}} 
            className='bg-richblack-700/75 rounded-lg' 
            type="text" 
            name="courseSection" 
            placeholder='Enter name of the section'
            required/>

            <button className='flex bg-yellow-300 font-medium text-xl text-richblack-800 rounded-lg p-2 px-3 w-fit'>
                <RiAddCircleLine className='relative top-1 mr-1'/>Add
            </button>
        </form>
    </main>
  )
}

export default AddSection