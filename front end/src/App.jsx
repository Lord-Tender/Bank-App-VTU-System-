import React, { useEffect, useState } from 'react'
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
import Transfer from './Pages/Transfer'
import FlutterConfirm from './Pages/FlutterConfirm'
import EmailVerifier from './Pages/EmailVerifier'
import { useDispatch, useSelector } from 'react-redux';
import { setAuthenticated } from './Redux/authSlide';
import AdminDashboard from './Pages/AdminDashboard'
import AdminLogin from './Pages/AdminLogin'
import AdminService from './Pages/AdminService'
import AdminTransac from './Pages/AdminTransac'

const App = () => {

  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(setAuthenticated(true));
    }
  }, []);

  return (
    <>
      <Toaster position='top-center' reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/register" element={<SignUp />} />
        <Route path="/user/login" element={<Sign />} />
        <Route path="/user/verify" element={<EmailVerifier />} />
        <Route path="/user/reset_password" element={<Forgotten />} />
        <Route path="/user/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/user/login" />} replace />
        <Route path="/user/dashboard/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/user/login" />} replace />
        <Route path="/user/dashboard/fund_wallet" element={isAuthenticated ? <AddMoney /> : <Navigate to="/user/login" />} replace />
        <Route path="/user/dashboard/fund_wallet/flutter_confirm" element={isAuthenticated ? <FlutterConfirm /> : <Navigate to="/user/login" />} replace />
        <Route path="/user/dashboard/transfer" element={isAuthenticated ? <Transfer /> : <Navigate to="/user/login" />} replace />
        <Route path="/user/not-verify" element={isAuthenticated ? <EmailVerification /> : <Navigate to="/user/login" />} replace />

        {/* Admin routes */}

        <Route path="/admin" element={ <AdminDashboard />} />
        <Route path="/admin/login" element={ <AdminLogin />} />
        <Route path="/admin/dashboard" element={ <AdminDashboard />} />
        <Route path="/admin/service" element={ <AdminService />} />
        <Route path="/admin/transactions" element={ <AdminTransac />} />

      </Routes>
    </>
  )
}

export default App