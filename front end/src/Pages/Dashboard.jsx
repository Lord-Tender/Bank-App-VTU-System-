import React, { useEffect, useState } from 'react'
import Siderbar from '../Components/Siderbar'
import { FaAngleDown } from "react-icons/fa6";
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import { MdArrowBackIosNew, MdElectricBolt, MdNotificationsNone, MdOutlinePhoneInTalk, MdPersonalVideo, MdSpeakerPhone } from "react-icons/md";
import { BiBox, BiLogOut } from "react-icons/bi";
import { IoMdAdd, IoMdClose } from "react-icons/io";
import { FaLongArrowAltRight } from "react-icons/fa";
import '../assets/Styles/pages.css'
import { HiCubeTransparent } from 'react-icons/hi';
import { BsCash } from 'react-icons/bs';
import { PiUsersThreeFill } from 'react-icons/pi';
import axios from 'axios';
import toast from 'react-hot-toast';
import Rightbar from '../Components/Rightbar';
import profileDemo from '../assets/Image/profile_demo 2.jpg'
import '../assets/Styles/pages.css'


const Dashboard = () => {
  let navigate = useNavigate();
  const [user, setuser] = useState("")
  const [userBal, setuserBal] = useState("")
  const [profilePic, setprofilePic] = useState(profileDemo)


  useEffect(() => {
    let token = localStorage.getItem('token')
    let url = 'https://bank-app-vtu-system.vercel.app/user/page_auth'

    axios.get(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
    }).then((res) => {
      document.getElementById('loading').style.display = 'none';
      if (res.data.userResult.photoUrl) {
        setprofilePic(res.data.userResult.photoUrl)
      }
      setuser(res.data.userResult)
      setuserBal(res.data.userResult.accountBal.toLocaleString())
      if (res.data.emailVerified == false) {
        navigate('/user/not-verify')
      }
    })
      .catch((err) => {
        if (err.response.data.error.name == "TokenExpiredError") {
          toast.error("Session expired!!!")
          setTimeout(() => {
            localStorage.removeItem('token')
            navigate('/user/login')
          }, 3000);
        } else if (err) {
          navigate('/user/login')
        }
      })
  }, [])


  const showProfileDropDown = () => {
    profileDropDown.style.display = 'block';
  }

  const closeProfileDropDown = () => {
    profileDropDown.style.display = 'none';
  }

  const logOut = () => {
    localStorage.removeItem('token')
    navigate('/user/login')
  }

  const showSidebar = () => {
    document.getElementById('sidebar').style.display = "block"
  }


  return (
    <>
      <section className='flex'>
          <Siderbar />

        {/* Main body */}
        <div className='bg-gray-100 static md:fixed lg:fixed left-[20%] h-screen w-[100%] lg:w-[60%] px-4 md:px-12 lg:px-14 z-10 '>
          <div className='header flex pt-3 justify-between items-center  '>
            <div>
              <h1 className='text-xl font-bold '>Welcome,</h1>
              <h2 className='text-3xl text-blue-800'><span> <span id='loading'>Loading...</span>{user.firstName}</span>.</h2>
            </div>
            <div>
              <div className='relative'>
                <div className='flex justify-center items-center hover:cursor-pointer' onClick={showProfileDropDown}>
                  <div className='w-[50px] h-[50px] rounded-full bg-blue-100 border-1 border-gray-100 outline outline-2 outline-blue-800'><img src={profilePic} alt="" className='w-full h-full rounded-full' /></div>
                  <FaAngleDown className='text-dark ml-2 text-xl' />
                </div>
                <div className='bg-white flex flex-col justify-items-start items-start gap-1 py-4 rounded-b-md absolute top-[120%] md:top-[90%] lg:top-[90%] left-[-90%] md:left-[70%] lg:left-[70%] w-[150px] rounded-t-md z-20' id='profileDropDown'>
                  <IoMdClose onClick={closeProfileDropDown} className='text-[1.4rem] absolute top-[5%] right-[7%] mb-3' />
                  <NavLink to="/user/dashboard/profile" className='flex w-full px-3 justify-start items-center py-1 text-[1.2rem] gap-1 text-left mt-4 hover:bg-gray-200 ' >
                    <CgProfile />
                    <p>Profile</p>
                  </NavLink>
                  <NavLink className='flex w-full px-3 justify-start items-center py-1 text-[1.2rem] gap-1 text-left hover:bg-gray-200'>
                    <MdNotificationsNone />
                    <p>Notification</p>
                  </NavLink>
                  <div onClick={logOut} className='flex w-full px-3 justify-start items-center py-1 text-[1.2rem] gap-1 text-left hover:bg-gray-200 cursor-pointer '>
                    <BiLogOut />
                    <p>Logout</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='w-full h-[10rem] bg-blue-900 rounded-lg mt-3 px-5 md:px-10 lg:px-10 relative'>
            <h1 className='text-gray-200 text-[1.2rem] pt-4 '>Your balance:</h1>
            <div className="yourBalance">
              <h1 id='realBalance' className='text-white text-[1.7rem] mt-[-7px]'>₦<span className='text-[2.5rem] ms-1 '>{userBal}</span></h1>
            </div>
            <NavLink className='flex items-center justify-center gap-1 bg-white mt-4 w-[50%] md:w-[25%] lg:w-[25%] rounded ms-[50%] md:ms-[75%] lg:ms-[75%] a '>
              <p>View History</p>
              <FaLongArrowAltRight />
            </NavLink>
            <NavLink to='/user/dashboard/fund_wallet' className='flex items-center justify-center gap-1 bg- mt-4 w-[50%] md:w-[25%] lg:w-[23%] rounded absolute top-2 right-9 text-white bg-black '>
              <p>Add money</p>
              <IoMdAdd />
            </NavLink>
          </div>

          <div className="mainBody mt-14 p-1 md:px-5 lg:px-5 flex justify-between relative" style={{ fontFamily: '"Josefin Sans", sans-serif' }}>
            <div className='absolute top-[-35%] block md:hidden lg:hidden text-[1.2rem] text-blue-700 bg-blue-200 rounded-full p-1.5' onClick={showSidebar}>
              <MdArrowBackIosNew />
            </div>
            <Link className='w-[22%] md:w-[20%] lg:w-[20%]' to='/user/dashboard/airtime'>
              <div className='bg-blue-100 w-full h-[5rem] flex justify-center items-center rounded-lg text-[1.7rem] md:text-[2.5rem] lg:text-[2.5rem] text-blue-900 '><MdOutlinePhoneInTalk /></div>
              <p className=' text-[0.9rem] md:text-xl lg:text-xl text-center mt-2 '>Airtime</p>
            </Link>

            <Link className='w-[22%] md:w-[20%] lg:w-[20%]'to='/user/dashboard/data' >
              <div className='bg-blue-100 w-full h-[5rem] flex justify-center items-center rounded-lg text-[1.7rem] md:text-[2.5rem] lg:text-[2.5rem] text-blue-900 '><MdSpeakerPhone /></div>
              <p className=' text-[0.9rem] md:text-xl lg:text-xl text-center mt-2 '>Data</p>
            </Link>

            <Link className='w-[22%] md:w-[20%] lg:w-[20%]'>
              <div className='bg-blue-100 w-full h-[5rem] flex justify-center items-center rounded-lg text-[1.7rem] md:text-[2.5rem] lg:text-[2.5rem] text-blue-900 '><HiCubeTransparent /></div>
              <p className=' text-[0.9rem] md:text-xl lg:text-xl text-center mt-2 '>Bet</p>
            </Link>

            <Link className='w-[22%] md:w-[20%] lg:w-[20%]'>
              <div className='bg-blue-100 w-full h-[5rem] flex justify-center items-center rounded-lg text-[1.7rem] md:text-[2.5rem] lg:text-[2.5rem] text-blue-900 '><MdPersonalVideo /></div>
              <p className=' text-[0.9rem] md:text-xl lg:text-xl text-center mt-2 '>TV</p>
            </Link>

          </div>

          <div className="mainBody mt-8 p-1 md:px-5 lg:px-5 flex justify-between " style={{ fontFamily: '"Josefin Sans", sans-serif' }}>
            <Link className='w-[22%] md:w-[20%] lg:w-[20%]'>
              <div className='bg-blue-100 w-full h-[5rem] flex justify-center items-center rounded-lg text-[1.7rem] md:text-[2.5rem] lg:text-[2.5rem] text-blue-900 '><PiUsersThreeFill /></div>
              <p className=' text-[0.9rem] md:text-xl lg:text-xl text-center mt-2 '>Refer&Earn</p>
            </Link>

            <Link className='w-[22%] md:w-[20%] lg:w-[20%]'>
              <div className='bg-blue-100 w-full h-[5rem] flex justify-center items-center rounded-lg text-[1.7rem] md:text-[2.5rem] lg:text-[2.5rem] text-blue-900 '><MdElectricBolt /></div>
              <p className=' text-[0.9rem] md:text-xl lg:text-xl text-center mt-2 '>Electricy</p>
            </Link>

            <Link className='w-[22%] md:w-[20%] lg:w-[20%]'>
              <div className='bg-blue-100 w-full h-[5rem] flex justify-center items-center rounded-lg text-[1.7rem] md:text-[2.5rem] lg:text-[2.5rem] text-blue-900 '><BiBox /></div>
              <p className=' text-[0.9rem] md:text-xl lg:text-xl text-center mt-2 '>Cashbox</p>
            </Link>

            <Link className='w-[22%] md:w-[20%] lg:w-[20%]'>
              <div className='bg-blue-100 w-full h-[5rem] flex justify-center items-center rounded-lg text-[1.7rem] md:text-[2.5rem] lg:text-[2.5rem] text-blue-900 '><BsCash /></div>
              <p className=' text-[0.9rem] md:text-xl lg:text-xl text-center mt-2 '>Withdraw</p>
            </Link>

          </div>
        </div>

        <Rightbar />
      </section>
    </>
  )
}

export default Dashboard