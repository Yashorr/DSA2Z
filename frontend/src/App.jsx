import React from 'react'
import { Route,Routes , Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import HomePage from './pages/HomePage'
const App = () => {
  let authUser= null ;
  return (
  <div className='flex flex-col items-center justify-start'>
    <Routes>
      <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to={"/"}/>}  />
      <Route path='/signup' element={!authUser ? <SignUpPage /> : <Navigate to={"/"}/>}/>
      <Route path='/' element={authUser ? <HomePage /> : <Navigate to={"/login"} />} />
      n
    </Routes>
  </div>
  )
}

export default App