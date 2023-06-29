import React from 'react'
import { NavLink } from 'react-router-dom'
import {FaArrowRight } from 'react-icons/fa'
import HighlightedText from '../components/core/HomePage/HighlightedText'
import Button from '../components/core/HomePage/Button'
import Video from '../../assets/Images/banner.mp4'
import CodingBlocks from '../components/core/HomePage/CodingBlocks'

const Home = () => {
  return (
    <main className='min-h-screen w-full flex flex-col items-center bg-richblack-900'>
        <div className='text-richblack-100 font-semibold border-2 border-richblack-300 mt-12 p-4 rounded-md
        shadow-[10px_10px_10px_0px_rgba(225,225,225,0.8)]'>
            <p>I'm actively working on this project while learning new concepts</p>
            <p>Front-end is only ~20% and Back-end ~80% complete</p>
            <p>Currently user can only create account(signup)</p>
            <div>
                <p className='text-white'>Upcoming features:</p>
            <ul className='flex flex-col items-center my-1'>
                <div>
                <li>Course creation</li>
                <li>User login</li>
                <li>Search courses by category</li>
                <li>Profile creation and account deletation</li>
                <li>Razorpay gateway integration</li>
                </div>
            </ul>
            <p>Most of the above will be available within <span className='font-bold text-lg text-white'>July 10</span></p>
            </div>
        </div>
        <div className='w-full min-h-[50vh] flex flex-col justify-around items-center'>
            <NavLink>
                <div className=' group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200
                transition-all duration-200 hover:scale-95 w-fit'>
                    <div className='flex flex-row items-center gap-2 rounded-full px-10 py-[5px]
                    transition-all duration-200 group-hover:bg-richblack-900'>
                        <p>Become an Educator</p>
                        <FaArrowRight />
                    </div>
                </div>
            </NavLink>

            <div className='text-5xl font-bold text-white'>
                <p>Empower your your future with <HighlightedText text={"Coding Skills"}/></p>
            </div>
            <div className='text-lg text-white/50 font-semibold w-2/3 text-center'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus doloremque molestias id eos placeat hic dignissimos, ducimus assumenda at? Aliquid repellendus debitis eum veritatis molestias aperiam est adipisci sed temporibus sunt, magni labore repudiandae nulla, nihil aspernatur facere, repellat a fugiat. Ipsum autem hic quos!
            </div>
            <div className='flex gap-7'>
                <Button text={"Learn more"} baka={true} link={"/"}/>
                <Button text={"Book a demo"} baka={false} link={"/"}/>
            </div>
        </div>
        <div className='w-3/4 shadow-[0px_20px_50px_rgba(8,_112,_184,_0.7)] my-16'>
            <video muted loop autoPlay className='shadow-[20px_20px_0px_0px_rgba(225,225,225)]'>
                <source src={Video} type='video/mp4'/>
            </video>
        </div>
        <div className='w-4/5 my-12 flex flex-col'>
            <CodingBlocks 
            tittle={
                <div>Find any thing and unleash your <HighlightedText text={"potential"}/>with our advance courses</div>

            }
            des={"We will bring best out off you and suck your all of your money. Courses specially curated for dumbs. with that money I will buy Beserk delux edition"}
            uwu={true}
            code={`<!DOCTYPE html>\n<html>\nhead><title>Example</title>\n<linkrel="stylesheet"href="styles.css">\n/head>\n`}
            btn1Text={"Try it yourself"} btn1Baka={true} btn1Link={"/signup"}
            btn2Text={"Learn more"} btn2Baka={false} btn2Link={"/signup"}
            codeColor = {"text-yellow-100"}
            />
            <CodingBlocks 
            tittle={
                <div>Start your <HighlightedText text={"coding journey"}/>with us to grow exponentially</div>

            }
            des={"We will bring best out off you and suck your all of your money. Courses specially curated for dumbs. with that money I will buy Beserk delux edition"}
            uwu={false}
            code={`import React from 'react'
            import { NavLink } from 'react-router-dom'
            import {FaArrowRight } from 'react-icons/fa'
            import HighlightedText from '../components/core/HomePage/HighlightedText'
            import Button from '../components/core/HomePage/Button'`}
            btn1Text={"Start Learning"} btn1Baka={true} btn1Link={"/signup"}
            btn2Text={"Learn more"} btn2Baka={false} btn2Link={"/signup"}
            codeColor = {"text-yellow-100"}
            />
        </div>
    </main>
  )
}

export default Home