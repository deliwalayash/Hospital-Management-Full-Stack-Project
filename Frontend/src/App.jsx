import { useState } from 'react'

import './App.css'
import Form from './components/Form'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Viewpatients from './components/Viewpatients'
import Editform from './components/Editform'

function App() {


  return (
    <>
  <BrowserRouter>
  <Routes>

    <Route path='/' element={<Form></Form>}></Route>
    <Route path='/view' element={<Viewpatients></Viewpatients>}></Route>
    <Route path='/edit/:id' element={<Editform></Editform>}></Route>
  </Routes>
  </BrowserRouter>
    </>
  )
}

export default App
