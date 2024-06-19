import React from 'react'
import { Link } from 'react-router-dom'
import '../assets/Styles/pages.css'
import section1Img from '../assets/Image/section1.jpg'
import section2Img from '../assets/Image/section2.jpg'

const Home = () => {
  return (
    <>
      <nav className='flex justify-between px-14 sm:px-5 bg-blue-500 h-20 sm:h-16 text-white items-center ' style={{ fontFamily: '"Josefin Sans", sans-serif', position: "sticky", top: "0" }}>
        <div className='homePage'>
          <Link>Tender Pay</Link>
        </div>
        <ul className='flex gap-10 sm:gap-5 h-full items-center '>
          <li className='h-full flex items-center justify-center'>
            <Link className='bg-white h-[50%] w-28 sm:w-20 sm:h-[45%] sm:text-[0.8em] rounded-3xl text-blue-700 flex items-center justify-center ' to='/user/login'>Login</Link>
          </li>

          <li className='flex gap-10 h-full items-center '>
            <Link className='bg-white h-[50%] w-28 sm:w-20 sm:h-[45%] sm:text-[0.8em] rounded-3xl text-blue-700 flex items-center justify-center ' to='/user/register'>Register</Link>
          </li>
        </ul>
      </nav>

      {/* Section 1 */}

      <div className="section2 w-full h-[30em] bg-slate-100 flex border-b-8 border-blue-300" style={{ fontFamily: '"Josefin Sans", sans-serif' }}>
        <div className='w-hf flex mt-[-2em] items-center'>
          <div className='ms-[10%]'>
            <h1 className='text-[2.6em] text-bold text-blue-600 border-s-8 border-blue-600 ps-4 rounded-[5px]'>Bank Beyond Imagination</h1>
            <p className='text-[3em] ps-6 text-red-500 '>Save, Send & Invest</p>
            <h2 className='ps-6'><span className='text-blue-600 text-[1.7em]'> <i>Bank easy,</i></span><span className='text-red-500 text-[2.2em] '> <i>Live long.</i></span> </h2>
            <Link to='/user/register'>
              <button className='h-12 bg-sky-400 text-white font-semibold hover:bg-white hover:text-blue-950 w-[10em] rounded-3xl ms-6 mt-5'>Get Started</button>
            </Link>
          </div>
        </div>
        <div className='w-hf'>
          <img src={section1Img} alt="" className='w-full h-full ' />
        </div>
      </div>

      {/* Section  */}

      <div className="section2 w-full h-[30em] bg-white flex" style={{ fontFamily: '"Josefin Sans", sans-serif' }}>
        <div className='w-hf'>
          <img src={section2Img} alt="" className='w-full h-full ' />
        </div>
        <div className='w-hf flex mt-[-4em] items-center border-blue-50'>
          <div className='ms-[10%]'>
          <h1 className='text-[2.8em] text-bold border-blue-700 rounded-[5px]'>Fast Transfer</h1>
          <p className='mt-3 text-lg text-blue-700 w-[70%] '>Money movement made easy. Move your money anyway in ease at low transaction fee...</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home