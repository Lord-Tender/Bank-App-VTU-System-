import React from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
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
        {/* <Route path="/user"> */}
          <Route path="/register" element={<SignUp />} />
          <Route path="/login" element={<Sign />} />
          <Route path="/reset_password" element={<Forgotten />} />
          <Route path="/dashboard" element={token ? <Dashboard /> : <Sign />} />
          <Route path="/dashboard/profile" element={token ? <Profile /> : <Sign />} />
          <Route path="/dashboard/fund_wallet" element={token ? <AddMoney /> : <Sign />} />
          <Route path="/verify" element={token ? <EmailVerification /> : <SignUp />} />
        {/* </Route> */}
      </Routes>
    </>
  )
}

export default App