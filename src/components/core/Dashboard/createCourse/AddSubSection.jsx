import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { apiConnector } from '../../../../services/apiconnector'
import { courseEndpoints } from '../../../../services/api'
import { useSelector } from 'react-redux'
import {RiDeleteBin5Line, RiEditLine} from 'react-icons/ri'

const AddSubSection = () => {
    const [sections, setSections] = useState([])
    const {id} = useParams();
    const [deatils, setDetails] = useState({})
    const {token} = useSelector((state)=>state.auth)
    const [edit, setEdit] = useState(-1);

    const handleOnChange = (e) => {
        setDetails({
            ...deatils,
            [e.target.name]: e.target.value
        })
        console.log(deatils)
    }

    const handleSubSectionOnSubmit = async (e) => {
        e.preventDefault();
        try{
            console.log(deatils)
            const res = await apiConnector("POST", courseEndpoints.CREATE_SUBSECTION_API,  deatils, {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            })
            console.log(res)
            fetchSections();
        }
        catch(err) {
            console.log(err)
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
        console.log(sections)
        console.log(deatils)
    }, [sections, deatils, edit])
  return (
    <main className='flex justify-center items-center min-h-screen'>
        <div className='w-3/4 flex flex-col gap-7'>
            <h2 className='text-3xl font-medium text-richblack-25 mt-12'>Add videos</h2>
            <div className='bg-richblack-800 p-5 flex flex-col gap-3 rounded-lg'>
                {
                    sections.map((s, id)=>(
                        <div key={id} className='w-full bg-richblack-900 rounded-xl p-4 px-4 text-xl font-medium'>
                            <p>{id+1}. {s.sectionName}</p>
                            {
                                s.subSection.length === 0 ? (<div></div>) : (
                                    <div className='my-3 border-t border-richblack-100/50 border-dotted py-3'>
                                        <div className='flex flex-col gap-2 items-center'>
                                            {
                                                s.subSection.map((sub, id)=>(
                                                    <div key={id} className=' group w-5/6 text-lg font-normal text-richblack-200/75 
                                                    flex justify-between hover:bg-richblack-400/30 px-3 p-1 rounded-md'>
                                                        {
                                                            (edit !== id) ? (
                                                                <>
                                                                <p className='group-hover:text-richblack-100'>{sub.title}</p>
                                                                <div className='flex gap-2'>
                                                                    <div onClick={()=>setEdit(id)}
                                                                     className='p-1 hover:bg-richblack-300/75 rounded-full
                                                                    cursor-pointer group-hover:text-richblack-100'>
                                                                        <RiEditLine/>
                                                                    </div>
                                                                    <div className='p-1 rounded-full cursor-pointer
                                                                    hover:text-red-700 hover:bg-red-500/20 group-hover:text-richblack-100'>
                                                                        <RiDeleteBin5Line/>
                                                                    </div>
                                                                </div>
                                                                </>
                                                            ) : (
                                                                <div className='flex gap-2 py-1'>
                                                                    <input className='bg-richblack-700 h-7 rounded-md'
                                                                    type="text" name="" id="" />
                                                                    <button className='bg-yellow-300 p-1 px-2 rounded-lg text-richblack-800
                                                                    text-sm'>
                                                                        Save
                                                                    </button>
                                                                </div>
                                                            )
                                                        }
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    ))
                }
            </div>
            <form onSubmit={handleSubSectionOnSubmit}
            className='flex flex-col gap-6 bg-richblack-800 p-5 px-8 rounded-lg'>
                <div className='flex gap-3 w-full'>
                    <div className='flex flex-col gap-3 w-1/2'>
                        <label>Sub-section name</label>
                        <input onChange={handleOnChange}
                        placeholder='Enter sub-section name'
                        className='bg-richblack-700 rounded-lg' 
                        type="text" name="title" required/>
                    </div>
                    <div className='flex flex-col gap-3 w-1/2'>
                        <label>Time durations</label>
                        <input onChange={handleOnChange}
                        className='bg-richblack-700 rounded-lg' 
                        placeholder='Enter time duration'
                        type="number" name="timeDuration" required/>
                    </div>
                </div>
               <div className='flex gap-2'>
                    <div className='flex flex-col gap-3 w-1/2'>
                        <label>Category</label>
                        <select required onChange={handleOnChange} name="sectionId"
                        className='bg-richblack-700 rounded-lg'>
                            <option selected disabled hidden>Choose here</option>
                            {
                                sections.map((section)=>(
                                    <option name="sectionId" value={section._id}>{section.sectionName}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className='flex flex-col gap-3 w-1/2'>
                        <label>Material(.mp4, .jpg, .jpeg, .png)</label>
                        <input onChange={(e)=>{setDetails({...deatils, [e.target.name]: e.target.files[0]})}}
                        className='bg-richblack-700 rounded-md'
                        type="file" accept=".jpg, .jpeg, .png, .mp4" name="material" required />
                    </div>
               </div>
                <button className='bg-yellow-300 text-richblack-800 font-medium p-1 px-3 rounded-md text-xl w-fit'>
                    Add
                </button>
            </form>
        </div>
    </main>
  )
}

export default AddSubSection