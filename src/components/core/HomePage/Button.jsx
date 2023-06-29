import React from 'react'
import { NavLink } from 'react-router-dom'

const Button = ({text, link, baka}) => {
  return (
    <NavLink >
        <div className={`${baka? "bg-yellow-200 text-richblack-900": "bg-richblack-800 text-white"} 
        hover:scale-90 font-semibold shadow-[0_35px_60px_-15px_rgba(66,72, 84, 0.8)] p-2 px-5 duration-200 rounded-md`}>
            {text}
        </div>
    </NavLink>
  )
}

export default Button