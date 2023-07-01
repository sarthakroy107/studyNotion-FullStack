import { useState } from 'react'

import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/common/Navbar'
import Signup from './pages/Signup'
import VerifyEmail from './pages/VerifyEmail'
import Login from './pages/Login'
import MyProfile from './components/core/Dashboard/MyProfile'


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
      </Routes>
    </main>
  )
}

export default App
