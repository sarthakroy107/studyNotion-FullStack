import { useState } from 'react'

import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/common/Navbar'
import Signup from './pages/Signup'
import VerifyEmail from './pages/VerifyEmail'
import Login from './pages/Login'
import MyProfile from './components/core/Dashboard/MyProfile'
import Category from './pages/Category'
import CourseDetails from './pages/CourseDetails'


function App() {

  return (
    <main>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<Signup/>} />
        <Route path='/verify-email' element={<VerifyEmail/>} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/dashboard/my-profile' element={<MyProfile/>} />
        <Route path ='/category/:id' element={<Category/>} />
        <Route path='/course/:id' element={<CourseDetails/>} />
      </Routes>
    </main>
  )
}

export default App
