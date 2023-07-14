import React, { useRef, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { apiConnector } from '../../../services/apiconnector';
import { settingsEndpoints } from '../../../services/api';
import { setUser } from "../../../slices/profileSlice"
import { toast } from 'react-hot-toast';
import {GrUpload} from 'react-icons/gr'
const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"]

const Settings = () => {
  const [imageFile, setImageFile] = useState(null);
  const imageRef = useRef(null);
  const {user} = useSelector((state)=>state.profile)
  const {token} = useSelector((state)=>state.auth)
  const [toggle, setToggle] = useState(true)
  const [dataForm, setDataForm] = useState({
    firstname: user.firstname,
    lastname: user.lastname,
    gender: user.profile.gender,
    dateOfBirth: user.profile.dateOfBirth,
    mobileNumber: user.profile.mobileNumber,
    about: user.profile.about,
  })

  const handleFormDataChange = (e) => {
    setDataForm({...dataForm, [e.target.name]: e.target.value})
  }

  const handleSubmitFormData = async (e) =>  {
    e.preventDefault()
    const toastId = toast.loading("Loading")
    try{
      const res = await apiConnector("PUT", settingsEndpoints.UPDATE_PROFILE_API, dataForm, {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      })

      console.log(res?.data?.data)

      const userSting = localStorage.getItem("user")
      const user = JSON.parse(userSting)
      user.firstname = res?.data?.data?.userChange?.firstname
      user.lastname = res?.data?.data?.userChange?.lastname
      user.profile.about = res?.data?.data?.newData?.about
      user.profile.dateOfBirth = res?.data?.data?.newData?.dateOfBirth
      user.profile.gender = res?.data?.data?.newData?.gender
      user.profile.mobileNumber = res?.data?.data?.newData?.mobileNumber

      localStorage.removeItem("user");
      localStorage.setItem('user', JSON.stringify(user));
          
      toast.success("Profile picture changed successfully")
      window.location.reload() 
    }
    catch(err) {
      console.log(err)
    }
    toast.dismiss(toastId)
  }



  const handleOnClick = () => {
    imageRef.current.click();
  }

  const handleDPUpload = async () => {
    const toastId = toast.loading("Changing profile picture")
    const formData = new FormData();
    formData.append("displayPicture", imageFile)
    try{
      const res = await apiConnector("PUT", settingsEndpoints.UPDATE_DISPLAY_PICTURE_API, 
      formData,
          {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          })
          console.log(res?.data?.data)
          const userSting = localStorage.getItem("user")
          const user = JSON.parse(userSting)

          user.image = res?.data?.data

          localStorage.removeItem("user");
          localStorage.setItem('user', JSON.stringify(user));
          
          toast.success("Profile picture changed successfully")
          window.location.reload() 
      }
      catch(err) {
        console.log(err);
        toast.error("Profile pictured updation failed")
      }
    toast.dismiss(toastId)
  }
  useEffect(()=>{
    imageFile !== null ? (setToggle(false)) : (setToggle(true))
  }, [imageFile])
  
  return (
    <main className='w-full min-h-screen bg-richblack-900 text-richblack-100 flex justify-center items-center'>
      <div className='w-5/6'>
        <h2 className='text-3xl my-12'>Update Profile</h2>
        <div className='flex gap-12 bg-richblack-800 rounded-lg p-7 px-12'>
          <img className='w-28 h-28 rounded-full object-cover' src={user.image} alt="" />
          <div>
            <p className='text-xl font-medium text-richblack-50 mb-6'>Choose profile picture</p>
            <input ref={imageRef} onChange={(e)=>{setImageFile(e.target.files[0])}} type="file" className='hidden' />
            <div className='flex gap-6'>
              <button onClick={handleOnClick} className=' bg-richblack-700 p-2 px-4 font-medium text-lg rounded-lg'>
                {
                  imageFile === null ? ("Select image") : ("Selected")
                }
              </button>
              <button disabled={toggle} onClick={handleDPUpload} className=' bg-yellow-300 text-richblack-800 p-2 
              px-4 font-medium text-lg flex gap-2 rounded-lg'>
                <GrUpload className='relative top-[0.30rem]'/>Upload
              </button>
            </div>
          </div>
        </div>
        <div className='my-5'>
          <form onSubmit={handleSubmitFormData} className='grid grid-cols-2 gap-6 p-9 rounded-lg bg-richblack-800' >
            <div className='flex flex-col gap-3'>
              <label>First name</label>
              <input type="text" onChange={handleFormDataChange}
              className='bg-richblack-700 rounded-lg outline-none px-4 p-2 font-medium text-lg'
              name="firstname" 
              id="firstname"
              defaultValue={user.firstname} />
            </div>
            <div className='flex flex-col gap-3'>
              <label>Last name</label>
              <input type="text" onChange={handleFormDataChange}
              className='bg-richblack-700 rounded-lg outline-none px-4 p-2 font-medium text-lg'
              name="lastname" 
              id="lastname"
              defaultValue={user.lastname} />
            </div>
            <div className='flex flex-col gap-3'>
              <label>Mobile number</label>
              <input type="number" onChange={handleFormDataChange}
              className='bg-richblack-700 rounded-lg outline-none px-4 p-2 font-medium text-lg'
              name="mobileNumber" 
              id="mobileNumber"
              defaultValue={user.profile.mobileNumber} />
            </div>
            <div className='flex flex-col gap-3'>
              <label>Date of Birth</label>
              <input type="date" onChange={handleFormDataChange}
              className='bg-richblack-700 rounded-lg outline-none px-4 p-2 font-medium text-lg'
              name="dateOfBirth" 
              id="dateOfBirth"
              defaultValue={user.profile.dateOfBirth} />
            </div>
            <div className='flex flex-col gap-3'>
              <label>Gender</label>
              <select name="gender" onChange={handleFormDataChange} defaultValue={user.profile.gender}
              className='bg-richblack-700 rounded-lg outline-none px-4 p-2 font-medium text-lg'>
                  {
                    genders.map((ele, i)=> (
                      <option key={i} value={ele}>{ele}</option>
                    ))
                  }
                  
              </select>
            </div>
            <div className='flex flex-col gap-3'>
              <label>About</label>
              <input type="text" onChange={handleFormDataChange}
              className='bg-richblack-700 rounded-lg outline-none px-4 p-2 font-medium text-lg'
              name="about" 
              id="about"
              defaultValue={user.profile.about} />
            </div>
            <button className='bg-yellow-300 rounded-lg p-2 px-4 w-fit text-richblack-900 font-medium my-4'>Submit</button>
          </form>
        </div>
      </div>
    </main>
  )
}

export default Settings