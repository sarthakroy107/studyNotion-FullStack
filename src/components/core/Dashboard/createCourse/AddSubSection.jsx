import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { apiConnector } from '../../../../services/apiconnector'
import { courseEndpoints } from '../../../../services/api'
import { useSelector } from 'react-redux'
import {RiDeleteBin5Line, RiEditLine} from 'react-icons/ri'

const AddSubSection = () => {
    const [sections, setSections] = useState([])
    const {id} = useParams();
    const [deatils, setDetails] = useState({})
    const {token} = useSelector((state)=>state.auth)
    const [edit, setEdit] = useState({
        id: -1, name: ""
    });
    const [editSubSectionDetails, setEditSubSectionDetails] = useState({})
    const navigate = useNavigate()


    //On-change in subsection creation
    const handleOnChange = (e) => {
        setDetails({
            ...deatils,
            [e.target.name]: e.target.value
        })
        console.log(deatils)
    }
    //Add subsection
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
    const handleSubSectionEdit = (sub, id) => {
        console.log(id)
        setEdit({id: id, name: sub.title}),
        setEditSubSectionDetails({
            title: sub.title,
            timeDuration: sub.timeDuration,
            videoUrl: sub.videoUrl,
            subSectionId: sub._id
        })
    }

    const handleSubSectionDelete = async (sub) => {
        try {
            const res = await apiConnector("POST", courseEndpoints.DELETE_SUBSECTION_API, {subSectionId: sub._id, sectionId: id}, {
                Authorization: `Bearer ${token}`,
            })
            console.log(res);
            fetchSections();

        }
        catch(err) {

        }
    }

    const handleEditSectionOnChange = (e) => {
        setEditSubSectionDetails({
            ...editSubSectionDetails, [e.target.name]: e.target.value
        })
    }
    const handleEditSubSectionOnSubmit = async () => {

        try{
            const res = await apiConnector("POST", courseEndpoints.UPDATE_SUBSECTION_API, editSubSectionDetails, {
                "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
            })
            console.log(res)
            fetchSections()
            setEdit(-1)
        }catch(err) {
            console.log(err)
        }
        
    }

    //fetch section data
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
        console.log(editSubSectionDetails)
    }, [sections, deatils, edit, editSubSectionDetails])
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
                                            <div className='flex w-5/6 p-1 text-md font-light text-richblack-300/75'>
                                                <p className='w-56'>Title</p>
                                                <p>Time(mins)</p>
                                            </div>
                                            {
                                                s.subSection.map((sub, id)=>(
                                                    <div key={id} className=' group w-5/6 text-lg font-normal text-richblack-200/75 
                                                    flex  justify-between hover:bg-richblack-400/30 px-3 p-1 rounded-md'>
                                                        {
                                                            (edit.id !== id || edit.name !== sub.title) ? (
                                                                <>
                                                                <div className='flex gap-8'>
                                                                    <p className='group-hover:text-richblack-100 w-56'>{sub.title}</p>
                                                                    <p className='group-hover:text-richblack-100'>{sub.timeDuration}</p>
                                                                </div>
                                                                <div className='flex gap-2'>
                                                                    <div onClick={()=>handleSubSectionEdit(sub, id)}
                                                                     className='p-1 hover:bg-richblack-300/75 rounded-full
                                                                    cursor-pointer group-hover:text-richblack-100'>
                                                                        <RiEditLine/>
                                                                    </div>
                                                                    <div onClick={()=>handleSubSectionDelete(sub)}
                                                                     className='p-1 rounded-full cursor-pointer
                                                                    hover:text-red-700 hover:bg-red-500/20 group-hover:text-richblack-100'>
                                                                        <RiDeleteBin5Line/>
                                                                    </div>
                                                                </div>
                                                                </>
                                                            ) : (
                                                                <div className='flex gap-2 py-1'>
                                                                    <div className='flex flex-col'>
                                                                        <label className='text-xs'>Name</label>
                                                                        <input className='bg-richblack-700 h-7 rounded-md'
                                                                        type="text" name="title"
                                                                        onChange={handleEditSectionOnChange} 
                                                                        value={editSubSectionDetails.title} />
                                                                    </div>
                                                                    <div className='flex flex-col'>
                                                                        <label className='text-xs'>Duration</label>
                                                                        <input className='bg-richblack-700 h-7 rounded-md'
                                                                        onChange={handleEditSectionOnChange}
                                                                        type="text" name="timeDuration" 
                                                                        value={editSubSectionDetails.timeDuration}/>
                                                                    </div>
                                                                    <div className='ml-3'>
                                                                    <button onClick={handleEditSubSectionOnSubmit}
                                                                    className='bg-yellow-300 p-1 px-2 rounded-lg text-richblack-800
                                                                    text-sm mt-4'>
                                                                        Save
                                                                    </button>
                                                                    </div>
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
            <div className='w-full flex justify-center p-3'>
                <button onClick={()=>{navigate(`/dashboard/publish-course/${id}`)}}
                 className='bg-yellow-300 text-richblack-800 font-medium p-1 px-3 rounded-md text-xl w-fit'>Next</button>
            </div>
        </div>
    </main>
  )
}

export default AddSubSection