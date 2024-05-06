import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <>
    <h1>Home page</h1>
      <div><Link to='/user/login'>Login</Link></div>
      <div><Link to='/user/Register'>Register</Link></div>
      <div><Link to='/user/reset_password'>Login</Link></div>
    </>
  )
}

export default Home