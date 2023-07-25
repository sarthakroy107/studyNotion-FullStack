import React from 'react'
import { useState } from 'react'
import {FiVideo} from 'react-icons/fi'
import {FaChevronDown} from 'react-icons/fa'
import {GoDotFill} from 'react-icons/go'

const Accordion = ({section, index}) => {
    console.log(section, index)
    const [visible, setVisible] = useState(false)
  return (
    <main className='cursor-pointer border-b border-richblack-200/30 text-richblack-25'>
        <div onClick={()=>setVisible(!visible)}
         className={`w-full flex justify-between px-5 py-3 text-xl ${visible ? ("bg-richblack-800"): ("")}`}>
            <div className='flex'>
                <div>{index+1}&nbsp;&nbsp;</div>
                <div>
                    <p>{section.sectionName}</p>
                    <p>{section.subSection.length} lessons</p>
                </div>
            </div>
            <div className={`flex justify-center items-center ${visible ? ("rotate-180 duration-300"):("rotate-0 duration-300")}`}>
                <FaChevronDown/>
            </div>
        </div>
        <div className={`${visible ? (""): ("hidden")}`}>
            {
                section.subSection.map((sub, i)=>(
                    <p className='flex gap-3 p-4 px-7 borderr border-richblack-700 hover:bg-richblack-800/30'> 
                    <FiVideo className='relative top-[0.35rem]'/>
                    &nbsp;{sub.title} <GoDotFill className='relative top-[0.35rem]'/> {sub.timeDuration} mins
                    </p>
                ))
            }
        </div>
    </main>
  )
}

export default Accordion