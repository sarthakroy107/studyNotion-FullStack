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
    const [edit, setEdit] = useState(-1)
    const [editSectionName, setEditSectionName] = useState("")
    const [sectionCount, setSectionCount] = useState(0)
    

    const handleOnSubmit = async (e) => {
        e.preventDefault()
        const res = await apiConnector("POST", courseEndpoints.CREATE_SECTION_API, {sectionName: sectionName, courseId: id}, 
        {
            Authorization: `Bearer ${token}`,
        })
        setSectionName("")
        fetchSections();
    }

    const handleDeleteSection = async ({sectionId}) => {
        try{
            await apiConnector("POST", courseEndpoints.DELETE_SECTION_API, {sectionId, sectionName: editSectionName}, {
                Authorization: `Bearer ${token}`,
            })
            fetchSections();
        }catch(err) {
            console.log(err);
        }
    }

    const handleEditSection = async ({sectionId}) => {
        try{
            await apiConnector("POST", courseEndpoints.UPDATE_SECTION_API, {sectionId, sectionName: editSectionName}, {
                Authorization: `Bearer ${token}`,
            })
            fetchSections();
            setEditSectionName("")
            setEdit(-1)

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
        setSectionCount(sections.length)
        console.log(sectionCount)
    }, [sections, edit, sectionCount])
        
  return (
    <main className='w-full min-h-screen flex flex-col gap-5 items-center'>
        <div className='w-3/5 text-3xl font-semibold mt-12'><h2>Add Sections</h2></div>
        <div className='w-3/5 bg-richblack-800 flex flex-col gap-1 p-8 rounded-lg text-richblack-300/75'>
            {
                sections.map((s, id)=>(
                    <div key={id} className='group flex w-full justify-between text-xl hover:text-richblack-5
                     h-10 hover:border-y hover:border-white/20 pt-1'>
                        {
                            edit !== id ? (
                                <>
                                <p>{id+1}. {s.sectionName}</p>
                                <div className='flex gap-3'>
                                    <div onClick={()=>setEdit(id)}
                                    className='hover:bg-richblack-50/50 p-1 px-2 rounded-full'>
                                        <RiEdit2Line className='relative top-1'/>
                                    </div>
                                    <div onClick={()=>handleDeleteSection({sectionId: s._id})}
                                     className=' hover:bg-red-500/20 hover:text-red-700/50 p-1 px-2 rounded-full'>
                                        <RiDeleteBin6Line className='relative top-1'/>
                                    </div>
                                </div>
                                </>
                            ) : (
                                <div className='flex gap-3 p-[0.20rem]'>
                                    <input onChange={(e)=>setEditSectionName(e.target.value)}
                                     className='bg-richblack-700 rounded-md' type="text" required/>
                                    <button onClick={()=>handleEditSection({sectionId: s._id})}
                                    className='bg-yellow-300 text-sm text-richblack-800 px-2 rounded-lg'>
                                        Save
                                    </button>
                                </div>
                            )
                        }
                        
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
        <button disabled={sectionCount>0 ? (false): (true)} className={` ${sectionCount>0 ? ("bg-yellow-300"): ("bg-yellow-200/50")}
        p-2 px-4 rounded-lg text-richblack-700 font-semibold text-2xl`}>
            Next
        </button>
    </main>
  )
}

export default AddSection