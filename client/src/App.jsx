import { useState } from 'react'

import './App.css'
import Login from './loginPage/Login'
import DashBord from './deshBord/DashBord'
import {Routes,Route} from 'react-router-dom'
function App() {
  
  return (
    <>
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/dashbord" element={<DashBord/>} />
    </Routes>
    </>
  )
}

export default App
