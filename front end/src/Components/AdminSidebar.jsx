import React from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../assets/Image/sublogo.png'
import '../assets/Styles/comp.css'
import { LuView } from 'react-icons/lu'
import { IoIosArrowBack } from 'react-icons/io'

const AdminSidebar = () => {
    
    const hideSidebar = () => {
        document.getElementById('sidebar').style.display = "none"
    }

  return (
    <>
        <div className="sideBar md:block lg:block w-[20%] h-[100vh] fixed " id='sidebar' style={{backgroundColor: "rgb(15, 7, 7)"}}>
                <div title='Close' onClick={hideSidebar} className=' text-[2rem] absolute right-[-15%] hidden sm:block'>
                    <IoIosArrowBack />
                </div>
                <img src={logo} alt="" className='h-[13%] mt-5  mx-auto' style={{ paddingLeft: "-0.3rem" }} />
                <NavLink to='/admin/dashboard' className={`text-gray-300 flex text-[1.3rem] items-center gap-2.5 ps-4 mt-8 h-14 justify-items-center align-items-center hover:bg-gray-700 hover:text-white ${location.pathname === '/admin/dashboard' ? 'border-l-4 border-blue-100 ps-4' : ''
                    }`}>
                    <LuView />
                    <p>Overviews</p>
                </NavLink>

                <NavLink to='/user/dashboard/transfer' className={`text-gray-300 flex text-[1.3rem] items-center gap-2.5 ps-5 mt-2 h-14 justify-items-center align-items-center hover:bg-gray-700 hover:text-white ${location.pathname === '/user/dashboard/transfer' ? 'border-l-4 border-blue-100 ps-4' : ''
                    }`}>
                    {/* <FaMoneyBillTransfer /> */}
                    <p>Transfer</p>
                </NavLink>

                <NavLink to='/user/dashboard/pay-bills' className={`text-gray-300 flex text-[1.3rem] items-center gap-2.5 ps-5 mt-2 h-14 justify-items-center align-items-center hover:bg-gray-700 hover:text-white ${location.pathname === '/user/dashboard/pay-bills' ? 'border-l-4 border-blue-100 ps-4' : ''
                    }`}>
                    {/* <FaMoneyBills /> */}
                    <p>Pay Bills</p>
                </NavLink>

                <NavLink to='/user/dashboard/transactions' className={`text-gray-300 flex text-[1.3rem] items-center gap-2.5 ps-5 mt-2 h-14 justify-items-center align-items-center hover:bg-gray-700 hover:text-white ${location.pathname === '/user/dashboard/transactions' ? 'border-l-4 border-blue-100 ps-3.5' : ''
                    }`}>
                    {/* <GrTransaction /> */}
                    <p>Transactions</p>
                </NavLink>

                <NavLink to='/user/dashboard/help' className={`text-gray-300 flex text-[1.3rem] items-center gap-2.5 ps-5 mt-2 h-14 justify-items-center align-items-center hover:bg-gray-700 hover:text-white ${location.pathname === '/user/dashboard/help' ? 'border-l-4 border-blue-100 ps-4' : ''
                    }`}>
                    {/* <MdLiveHelp /> */}
                    <p>Support</p>
                </NavLink>
            </div>
    </>
  )
}

export default AdminSidebar