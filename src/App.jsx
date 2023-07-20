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
import PrivateRoute from './components/core/Dashboard/PrivateRoute'
import Dashboard from './pages/Dashboard'
import Settings from './components/core/Dashboard/Settings'
import EnrolledCourses from './components/core/Dashboard/EnrolledCourses'
import CreateCourse1 from './components/core/Dashboard/createCourse/CreateCourse1'
import AddCourse from './components/core/Dashboard/createCourse/AddCourse'
import AddSection from './components/core/Dashboard/createCourse/AddSection'
import AddSubSection from './components/core/Dashboard/createCourse/AddSubSection'
import Publish from './components/core/Dashboard/createCourse/Publish'


function App() {

  return (
    <main>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<Signup/>} />
        <Route path='/verify-email' element={<VerifyEmail/>} />
        <Route path='/login' element={<Login/>}/>
        <Route path ='/category/:id' element={<Category/>} />
        <Route path='/course/:id' element={<CourseDetails/>} />
        <Route element={
          <PrivateRoute>
            <Dashboard/>
          </PrivateRoute>
        }>
          <Route path='dashboard/my-profile' element={<MyProfile/>} />
          <Route path='dashboard/enrolled-courses' element={<EnrolledCourses/>}/>
          <Route path='dashboard/settings' element={<Settings/>} />
          <Route path='dashboard/create-course-1' element={<CreateCourse1/>} />
          <Route path='dashboard/add-section/:id' element={<AddSection/>} />
          <Route path='dashboard/add-subsection/:id' element={<AddSubSection/>} />
          <Route path='dashboard/add-course' element={<AddCourse/>}/>
          <Route path='dashboard/publish-course' element={<Publish/>} />
        </Route>
      </Routes>
    </main>
  )
}

export default App
