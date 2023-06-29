import React from 'react'

const HighlightedText = ({text}) => {
  return (
    <span className='text-transparent bg-clip-text bg-gradient-to-bl from-blue-300 to-yellow-400'>
        &nbsp;{text}&nbsp;
    </span>
  )
}

export default HighlightedText