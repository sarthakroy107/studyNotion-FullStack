import React from 'react'

const Dates = ({date}) => {
    const format = () => {
        const details = date.split(" ");
        const dateArr = details[0].split("-")
        const timeArr = details[1].split(":")
        console.log(dateArr, timeArr)
    }
    //format();
    const convertedDate = new Date(date).toLocaleString();
    const dateString = convertedDate.split(",")
  return (
    <main>
        {dateString[0]}
    </main>
  )
}

export default Dates