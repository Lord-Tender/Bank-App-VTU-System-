import React, { useEffect, useState } from 'react'
import AdminSidebar from '../Components/AdminSidebar'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AdminSettings = () => {
    let navigate = useNavigate()
    const [settings, setsettings] = useState("")

    useEffect(() => {
        const userAuth = () => {

            let token = localStorage.getItem('admin_token')
            let url = 'http://localhost:5000/admin/page_auth'


            axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
            }).then((res) => {
            })
                .catch((err) => {
                    // navigate("/admin/login")
                })
        }
        userAuth()
        getSettings()
    }, [])
    


    const getSettings = () => {
        const url = "http://localhost:5000/admin/get_settings"
        axios.get(url)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
            })
    }

    return (
        <>
            <section style={{ width: "100%", height: "100vh", display: "flex", backgroundColor: "whitesmoke" }}>

                {/* Sidebar  */}
                <div className='relative w-[20%] sm:absolute top-0 sm:w-[80%] ' id='sideBarDiv'>
                    <AdminSidebar />
                </div>


                {/* Body */}
                <div className='sm:w-[100%] w-[80%] px-[2.5em] sm:px-[1em] h-screen pb-10' style={{ fontFamily: '"Josefin Sans", sans-serif' }}>
                    <div className='w-full bg-white h-32 my-3 rounded-xl'>
                        <h1 className='text-xl text-center pt-3'>Search User</h1>
                        <div className='flex justify-center items-center  mt-3 gap-[5%] px-[5%] '>
                            <input id='searchUserInput' placeholder='Search by email, Phone no or ID' type="text" className='w-[70%] border-2 border-blue-500 rounded-3xl h-10 p-3.5 sm:text-sm' />
                            <button className='w-[15%] bg-blue-500 h-10 rounded text-white sm:text-sm sm:w-[25%] ' >Search</button>
                        </div>
                    </div>
                </div>


            </section>
        </>
    )
}

export default AdminSettings