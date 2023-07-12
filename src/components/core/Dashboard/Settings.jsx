import React, { useRef, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { apiConnector } from '../../../services/apiconnector';
import { settingsEndpoints } from '../../../services/api';
import { setUser } from "../../../slices/profileSlice"
import { toast } from 'react-hot-toast';
import {GrUpload} from 'react-icons/gr'

const Settings = () => {
  const [imageFile, setImageFile] = useState(null);
  const imageRef = useRef(null);
  const {user} = useSelector((state)=>state.profile)
  const {token} = useSelector((state)=>state.auth)
  const dispatch = useDispatch();

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

  }, [imageFile])
  
  return (
    <main className='w-full min-h-screen text-richblack-100 flex justify-center items-center'>
      <div className='w-5/6'>
        <h2 className='text-3xl mb-12'>Update Profile</h2>
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
              <button onClick={handleDPUpload} className=' bg-yellow-300 text-richblack-800 p-2 
              px-4 font-medium text-lg flex gap-2 rounded-lg'>
                <GrUpload className='relative top-[0.30rem]'/>Upload
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Settings