import React, { useEffect, useState } from 'react'
import { NavLink, matchPath, useLocation } from 'react-router-dom'
import logo from "../../../assets/Logo/Logo-Full-Light.png"
import {NavbarLinks} from "../../../data/navbar-links"
import { apiConnector } from '../../services/apiconnector'
import { categories } from '../../services/api'
import { useSelector } from 'react-redux'
import {AiOutlineShoppingCart, AiFillCaretDown} from 'react-icons/ai'

const Navbar = () => {
    const location = useLocation();

    const getMatch = (route) => {
        return matchPath({path: route}, location.pathname);
    }
    const {user} = useSelector((state)=> state.profile);
    const [subLinks, setSubLinks] = useState([])
    const fetchlinkData = async () => {
        try{
            const result  = await apiConnector("GET", categories.CATEGORIES_API)
            console.log(result);
            console.log(result.data.data)
            setSubLinks(result.data.data)
        }
        catch(err) {
            console.log("Could not fetch category list")
        }
    }
    useEffect(() => {
        fetchlinkData();
    }, []);
  return (
    <div className='h-[7vh] bg-richblack-900 border-b flex border-white items-center justify-around'>
        <div>
            <NavLink to={"/"}>
                <img src={logo} alt="logo" />
            </NavLink>
        </div>

        <nav >
            <ul className='text-white flex gap-7'>
                {
                    NavbarLinks.map( (link, index) => (
                        <li key={index}>
                            {
                                link.title === "Catalog" ?(
                                <div className='relative flex items-center gap-2 group'>
                                    <p className='flex gap-1'>{link.title} <AiFillCaretDown className='relative top-[0.35rem]'/></p>
                                    <div className='invisible absolute left-[50%]
                                    translate-x-[-61%] translate-y-[45%]
                                    top-[50%]
                                    flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900
                                    opacity-0 transition-all duration-200 group-hover:visible
                                    group-hover:opacity-100 lg:w-[300px]'>

                                        <div className='absolute left-[50%] top-0
                                        translate-x-[80%]
                                        translate-y-[-45%] h-6 w-6 rotate-45 rounded bg-richblack-5'>
                                        </div>

                                        {
                                            subLinks.length ? (
                                                    subLinks.map( (subLink, index) => (
                                                        <NavLink to={`/category/${subLink.name.split(" ").join("-").toLowerCase()}`} 
                                                        key={index}>
                                                            <p className='font-semiboldrounded-lg text-lg px-3 rounded-md py-1 hover:bg-richblack-300 duration-150 hover:scale-95'>
                                                                {subLink.name}
                                                            </p>
                                                        </NavLink>
                                                    ) )
                                            ) : (<div></div>)
                                        }

                                    </div>
                            </div>

                                ) : (
                                    <NavLink to={link?.path}>
                                        <p className={`${getMatch(link?.path)? "text-yellow-200": "text-white"}`} >
                                            {link.title}
                                        </p>
                                    </NavLink>
                                )
                            }
                        </li>
                    )
                    )
                }
            </ul>
        </nav>
        {
            user ? (
            <div className='flex gap-5'>
                <AiOutlineShoppingCart className='text-richblack-100 relative top-[0.30rem] w-12 scale-150'/>
                <span className=''><img className='rounded-full w-7' src={user.image} alt="" /></span>
            </div>
            ) : (
                <div className='flex gap-5'>
                <NavLink  to={"/login"} >
                    <button className='bg-richblack-700 text-richblack-50 font-semibold rounded-md p-1 px-4 
                    border border-richblack-100'>Log in</button>
                </NavLink>
                <NavLink to={"/signup"} >
                    <button className='bg-richblack-700 text-richblack-50 font-semibold rounded-md p-1 px-4 
                    border border-richblack-100'>Sign up</button>
                </NavLink>
            </div>
            )
        }
    </div>
  )
}

export default Navbar