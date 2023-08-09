import React from 'react'

const RatingModal = ({isVisible, onClose}) => {
    if(!isVisible.state) return null;
  return (
    <main className='w-full h-screen absolute top-0 left-0 bg-richblack-500 bg-opacity-10 backdrop-blur-sm z-10
    flex justify-center items-center'>
        <div className='w-1/3 rounded-xl border-4 border-richblack-100 h-72 bg-richblack-900'>
          
        </div>
    </main>
  )
}

export default RatingModal