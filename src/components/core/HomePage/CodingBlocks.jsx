import React from 'react'
import HighlightedText from './HighlightedText'
import Button from './Button'
import { TypeAnimation } from 'react-type-animation'

const CodingBlocks = ({code, tittle, btn1Text, btn1Baka, btn1Link, btn2Text, btn2Link, btn2Baka, des, codeColor, uwu}) => {
  return (
    <main className={`text-white w-full min-h-[50vh] flex  justify-around gap-5 
    ${uwu? "md:flex-row": "md:flex-row-reverse"}`}>
        <div className='flex flex-col w-2/3 h-[30vh] justify-between'>
            <div>
                <p className='text-4xl font-bold'>{tittle}</p>
            </div>
            <div className='text-xl text-white/60 font-semibold'> {des}</div>
            <div className='flex gap-5'>
                <Button text={btn1Text} baka={btn1Baka} link={btn1Link}/>
                <Button text={btn2Text} baka={btn2Baka} link={btn2Link}/>
            </div>
        </div>
        <div className='flex w-1/3'>
            <div className='text-white/50 font-semibold'>
                <p>1&nbsp;</p>
                <p>2&nbsp;</p>
                <p>3&nbsp;</p>
                <p>4&nbsp;</p>
                <p>5&nbsp;</p>
                <p>6&nbsp;</p>
                <p>7&nbsp;</p>
            </div>
            <div className={`${codeColor} font-bold w-[90%]`}>
                <TypeAnimation
                sequence={[code, 2000, ""]}
                repeat={Infinity}
                cursor={true}
                style = {
                    {
                        whiteSpace: "pre-line",
                        display:"block",
                    }
                }
                omitDeletionAnimation={true}
                />
            </div>
        </div>
    </main>
  )
}

export default CodingBlocks