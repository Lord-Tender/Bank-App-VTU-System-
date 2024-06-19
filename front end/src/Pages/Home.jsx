import React from 'react'
import { Link } from 'react-router-dom'
import '../assets/Styles/pages.css'
import section1Img from '../assets/Image/section1.jpg'
import section2Img from '../assets/Image/section2.jpg'
import section3Img from '../assets/Image/section3.jpg'
import section4Img from '../assets/Image/section4.jpg'

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

      <div className="section2 w-full h-[30em] bg-slate-100 flex border-b-8 border-red-400 sm:flex-col" style={{ fontFamily: '"Josefin Sans", sans-serif' }}>
        <div className='w-hf sm:w-full sm:mt-10 sm:h-hf flex mt-[-2em] items-center'>
          <div className='ms-[10%]'>
            <h1 className='text-[2.6em] sm:text-[1.4em] text-bold text-blue-600 border-s-8 border-blue-600 ps-4 rounded-[5px]'>Bank Beyond Imagination</h1>
            <p className='text-[3em] sm:text-[1em] ps-6 text-red-500 '>Save, Send & Invest</p>
            <h2 className='ps-6'><span className='text-blue-600 text-[1.7em] sm:text-[1em]'> <i>Bank easy,</i></span><span className='text-red-500 text-[2.2em] sm:text-[1.3em]'> <i>Live long.</i></span> </h2>
            <Link to='/user/register'>
              <button className=' transition-all h-12 bg-sky-400 text-white font-semibold hover:bg-white hover:text-blue-950 w-[10em] rounded-3xl ms-6 mt-5 sm:h-8 sm:text-[0.7em] sm:mt-3'>Get Started</button>
            </Link>
          </div>
        </div>
        <div className='w-hf sm:w-full sm:h-hf'>
          <img src={section1Img} alt="" className='w-full h-full ' />
        </div>
      </div>

      {/* Section  2*/}

      <div className="section2 w-full h-[30em] bg-white flex sm:flex-col-reverse" style={{ fontFamily: '"Josefin Sans", sans-serif' }}>
        <div className='w-hf sm:h-hf sm:w-full '>
          <img src={section2Img} alt="" className='w-full h-full ' />
        </div>
        <div className='w-hf sm:w-full sm:h-hf flex mt-[-4em] items-center border-blue-50'>
          <div className='ms-[10%]'>
            <h1 className='text-[2.8em] text-bold border-blue-600 text-blue-800 rounded-[5px]'>Fast Transfer</h1>
            <p className='mt-3 text-lg text-blue-700 w-[70%] '>Money movement made easy. Move your money anyway in ease at low transaction fee...</p>
          </div>
        </div>
      </div>

      {/* Section  3*/}

      <div className="section2 w-full h-[30em] bg-white flex sm:flex-col border-b-8 border-white sm:border-4" style={{ fontFamily: '"Josefin Sans", sans-serif' }}>
        <div className='w-hf sm:w-full sm:h-hf flex items-center border-4 border-sky-300'>
          <div className='ms-[10%]'>
            <h1 className='text-[2.8em] text-bold border-blue-700 text-blue-800 rounded-[5px]'>Pay Bills</h1>
            <p className='mt-3 text-lg text-blue-600 w-[70%] '>Buy airtime, data and others telecom service at a very affordable price. This also includes electricity bill and TV subscriptions.</p>
          </div>
        </div>
        <div className='w-hf sm:h-hf sm:w-full '>
          <img src={section3Img} alt="" className='w-full h-full ' />
        </div>
      </div>

      {/* Section  4*/}

      <div className="section2 w-full h-[30em] bg-white flex sm:flex-col-reverse" style={{ fontFamily: '"Josefin Sans", sans-serif' }}>
        <div className='w-hf sm:h-hf sm:w-full '>
          <img src={section4Img} alt="" className='w-full h-full ' />
        </div>
        <div className='w-hf sm:w-full sm:h-hf flex mt-[-4em] items-center border-blue-50'>
          <div className='ms-[10%]'>
            <h1 className='text-[2.8em] text-bold border-blue-700 text-blue-800 rounded-[5px]'>Save & Earn</h1>
            <p className='mt-3 text-lg text-blue-600 w-[70%] '>Make your money secure. Save your money with Tender pay and withdraw anytime anyday. Very Secure & Fast</p>
          </div>
        </div>
      </div>

      <footer style={{ fontFamily: '"Josefin Sans", sans-serif' }} className='bg-blue-950 h-28 text-blue-50 flex items-center justify-center border-t-8'>
        <p>Copy right, (Tender Pay) 2024.</p>
      </footer>
    </>
  )
}

export default Home