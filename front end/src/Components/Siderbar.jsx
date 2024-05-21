import React from 'react'
import logo from '../assets/Image/sublogo.png'
import { NavLink } from 'react-router-dom'
import { FaUser } from "react-icons/fa6";
import { MdLiveHelp } from "react-icons/md";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { FaMoneyBills } from "react-icons/fa6";
import { GrTransaction } from "react-icons/gr";
import '../assets/Styles/comp.css'
import { IoIosArrowBack } from 'react-icons/io';

const Siderbar = () => {

  const hideSidebar = () => {
    document.getElementById('sidebar').style.display = "none"
  }
  return (
    <>
      <div className="sideBar md:block lg:block w-[20%] bg-blue-950 h-[100vh] fixed " id='sidebar' style={{}}>
          <div title='Close' onClick={hideSidebar} className=' text-[2rem] absolute right-[-15%] block md:hidden lg:hidden'>
            <IoIosArrowBack />
          </div>
          <img src={logo} alt="" className='h-[13%] mt-5  mx-auto' style={{ paddingLeft: "-0.3rem" }} />
          <NavLink to='/user/dashboard' className={`text-gray-300 flex text-[1.3rem] items-center gap-2.5 ps-4 mt-8 h-14 justify-items-center align-items-center hover:bg-gray-700 hover:text-white ${location.pathname === '/user/dashboard' ? 'border-l-4 border-blue-100 ps-4' : ''
            }`}>
            <FaUser />
            <p>Dashboard</p>
          </NavLink>

          <NavLink to='/user/dashboard/transfer' className={`text-gray-300 flex text-[1.3rem] items-center gap-2.5 ps-5 mt-2 h-14 justify-items-center align-items-center hover:bg-gray-700 hover:text-white ${location.pathname === '/user/dashboard/transfer' ? 'border-l-4 border-blue-100 ps-4' : ''
            }`}>
            <FaMoneyBillTransfer />
            <p>Transfer</p>
          </NavLink>

          <NavLink to='/user/dashboard/pay-bills' className={`text-gray-300 flex text-[1.3rem] items-center gap-2.5 ps-5 mt-2 h-14 justify-items-center align-items-center hover:bg-gray-700 hover:text-white ${location.pathname === '/user/dashboard/pay-bills' ? 'border-l-4 border-blue-100 ps-4' : ''
            }`}>
            <FaMoneyBills />
            <p>Pay Bills</p>
          </NavLink>

          <NavLink to='/user/dashboard/transactions' className={`text-gray-300 flex text-[1.3rem] items-center gap-2.5 ps-5 mt-2 h-14 justify-items-center align-items-center hover:bg-gray-700 hover:text-white ${location.pathname === '/user/dashboard/transactions' ? 'border-l-4 border-blue-100 ps-3.5' : ''
            }`}>
            <GrTransaction />
            <p>Transactions</p>
          </NavLink>

          <NavLink to='/user/dashboard/help' className={`text-gray-300 flex text-[1.3rem] items-center gap-2.5 ps-5 mt-2 h-14 justify-items-center align-items-center hover:bg-gray-700 hover:text-white ${location.pathname === '/user/dashboard/help' ? 'border-l-4 border-blue-100 ps-4' : ''
            }`}>
            <MdLiveHelp />
            <p>Support</p>
          </NavLink>
        </div>
    </>
  )
}

export default Siderbar