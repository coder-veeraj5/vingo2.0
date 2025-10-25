import React from 'react'
import Signup from './pages/signup'
import Signin from './pages/signin'
import { BrowserRouter, Route,Routes } from 'react-router-dom'
import Forgotpassword from './pages/Forgotpassword'
import usegetcurrentuser from './hooks/usegetcurrentuser'

export const url="http://localhost:8000"
function App() {
  usegetcurrentuser()
  return (
   <Routes>
    <Route path='/signup' element={<Signup/>}/>
     <Route path='/signin' element={<Signin/>}/>
     <Route path='/forgot-password' element={<Forgotpassword/>}/>
   </Routes>
  )
}

export default App
