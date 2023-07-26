import React from 'react'

const RatingModal = ({isVisible, onClose}) => {
    if(!isVisible) return null;
  return (
    <main className='w-full h-screen absolute top-0 left-0 bg-richblack-500 opacity-25 backdrop-blur-sm z-10
    flex justify-center items-center'>
        <button className='border border-white' onClick={()=>onClose()} >Close</button>
    </main>
  )
}

export default RatingModal