import { useState } from 'react'

import './App.css'
import Login from './loginPage/Login'
import DeshBord from './deshBord/DeshBord'
import {Routes,Route} from 'react-router-dom'
function App() {
  
  return (
    <>
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/deshbord" element={<DeshBord/>} />
    </Routes>
    </>
  )
}

export default App
