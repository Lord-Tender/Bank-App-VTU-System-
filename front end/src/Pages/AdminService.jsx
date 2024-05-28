import React, { useEffect } from 'react'
import AdminSidebar from '../Components/AdminSidebar'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const AdminService = () => {
    let navigate = useNavigate()

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
    }, [])


    return (
        <>
            <section style={{ width: "100%", height: "100%", display: "flex" }} >

                <div className='relative w-[20%] sm:absolute top-0 sm:w-[80%] ' id='sideBarDiv'>
                    <AdminSidebar />
                </div>

                <div className='sm:w-[100%] w-[80%] px-[2.5em] sm:px-[1em] h-screen pb-10' style={{ backgroundColor: "whitesmoke", fontFamily: '"Josefin Sans", sans-serif' }}>

                    {/* Select Service */}
                    <div className='w-full bg-white h-28 my-3 rounded-xl'>
                        <h2 className='text-center text-lg pt-3 text-blue-700'>Select a service to edit</h2>
                        <div className='flex justify-center mt-3 '>
                            <select name="" id="service" className='border-2 border-blue-600 rounded p-2 w-[50%]  text-blue-600 focus:outline-none'>
                                <option value="null" className=''>Select service</option>
                                <option value="airtime">Airtime</option>
                                <option value="data">Data</option>
                            </select>
                            
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AdminService