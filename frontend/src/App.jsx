import React, { useEffect } from 'react'
import { Route,Routes , Navigate, useLocation } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import HomePage from './pages/HomePage'
import {Toaster} from 'react-hot-toast'
import { useAuthStore } from './store/useAuthStore'
import { Loader } from 'lucide-react'
import Layout from './layout/Layout'
import AdminRoute from './components/AdminRoute'
import AddProblem from './pages/AddProblem'
import ProblemPage from './pages/ProblemPage'
import ProfilePage from './pages/ProfilePage'
import LandingPage from './pages/LandingPage'
import ProblemTablePage from './pages/ProblemTablePage'
import EditProblem from './pages/EditProblem'
const App = () => {
  const {authUser, checkAuth ,isLoggedOut, isCheckingAuth} = useAuthStore()
  useEffect(() => {
   const fetch = async () =>{
    await checkAuth();

   }
   fetch();
  }, [checkAuth])



   

  if((!authUser && !isLoggedOut) ||   isCheckingAuth  ){ return (
    <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>

  )}
  
  
  return (
  <div className='flex flex-col items-center justify-start'>
    <Toaster />
    <Routes>
      <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to={ "/"} />}   />
      <Route path='/signup' element={!authUser ? <SignUpPage /> : <Navigate to={"/"}  />}/>
      
        <Route path='/' element={authUser ? <LandingPage /> : <Navigate to={"/login"}   />} />
      
      <Route element={<AdminRoute />}>
        <Route path="/add-problem" element={authUser ? <AddProblem /> : <Navigate to={"/login"}  />} />
        <Route path='/edit-problem/:id' element={authUser ? <EditProblem /> : <Navigate to={"/login"} />} />
      </Route>
      <Route path="/problem/:id" element={authUser ? <ProblemPage /> : <Navigate to={"/login"}   />} />
      <Route path="/profile" element ={authUser ? <ProfilePage /> : <Navigate to = {"/login"}  />} />
      
      <Route path="/problem" element={authUser ? <ProblemTablePage />: <Navigate to={"/login"}   />} />
      
    </Routes>
  </div>
  )
}

export default App