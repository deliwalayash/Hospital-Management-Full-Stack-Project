import { useState } from 'react'

import './App.css'
import Form from './components/Form'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Viewpatients from './components/Viewpatients'
import Editform from './components/Editform'
import Navbar from './components/Navbar'
import Home from './components/Home'
import SignUp from './components/SignUp'
import Login from './components/Login'
import Privateroutes from './routes/Privateroutes'
import DoctorLogin from "./components/DoctorLogin";
import{ Toaster }from 'sonner'
import DoctorDashboard from './components/DoctorDashboard'

function App() {


  return (
    <>
  <BrowserRouter>
      <Toaster richColors position="top-right" />
    <Navbar></Navbar>
  <Routes>
    <Route path='/' element={<Home></Home>}></Route>
    <Route path='/book' element={<Privateroutes>
      <Form></Form>
    </Privateroutes>}></Route>
    <Route path='/view' element={<Privateroutes><Viewpatients></Viewpatients></Privateroutes>}></Route>
    <Route path='/signup' element={<SignUp></SignUp>}></Route>
    <Route path='/login' element={<Login></Login>}></Route>
    <Route path='/doctor/login' element={<DoctorLogin></DoctorLogin>}></Route>
    <Route path='/edit/:id' element={<Editform></Editform>}></Route>
  </Routes>
  </BrowserRouter>
    </>
  )
}

export default App
