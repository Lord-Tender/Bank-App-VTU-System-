import React from 'react'
import { Link } from 'react-router-dom'
import '../assets/Styles/pages.css'

const Home = () => {
  return (
    <>
      <nav className='flex justify-between px-14 bg-blue-500 h-20 text-white items-center ' style={{ fontFamily: '"Josefin Sans", sans-serif' }}>
        <div className='homePage'>
          <Link>Tender Pay</Link>
        </div>
        <ul className='flex gap-10 h-full items-center'>
          <li className='h-full flex items-center justify-center'>
            <Link className='bg-white h-[50%] w-28 rounded-3xl text-blue-700 flex items-center justify-center ' to='/user/login'>Login</Link>
          </li>

          <li className='flex gap-10 h-full items-center '>
            <Link className='bg-white h-[50%] w-28 rounded-3xl text-blue-700 flex items-center justify-center ' to='/user/register'>Register</Link>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default Home