import { useState } from 'react'

import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/common/Navbar'
import Signup from './pages/Signup'
import VerifyEmail from './pages/VerifyEmail'
function App() {

  return (
    <main>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<Signup/>} />
        <Route path='/verify-email' element={<VerifyEmail/>} />
      </Routes>
    </main>
  )
}

export default App
