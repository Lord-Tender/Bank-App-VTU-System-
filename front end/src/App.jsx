import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import SignUp from './Pages/SignUp'
import Sign from './Pages/SignIn'
import Dashboard from './Pages/Dashboard'
import { Toaster } from 'react-hot-toast'
import EmailVerification from './Pages/EmailVerification'
import Profile from './Pages/Profile'
import Forgotten from './Pages/Forgotten'
import AddMoney from './Pages/AddMoney'
import Home from './Pages/Home'

const App = () => {

  let token = localStorage.getItem('token')

  return (
    <>
      <Toaster position='top-center' reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/register" element={<SignUp />} />
        <Route path="/user/login" element={<Sign />} />
        <Route path="/user/reset_password" element={<Forgotten />} />
        <Route path="/user/dashboard" element={token ? <Dashboard /> : <Navigate to="/user/login?redirected=true" />} />
        <Route path="/user/dashboard/profile" element={token ? <Profile /> : <Navigate to="/user/login?redirected=true" />} />
        <Route path="/user/dashboard/fund_wallet" element={token ? <AddMoney /> : <Navigate to="/user/login?redirected=true" />} />
        <Route path="/user/verify" element={token ? <EmailVerification /> : <Navigate to="/user/login?redirected=true" />} />
      </Routes>
    </>
  )
}

export default App