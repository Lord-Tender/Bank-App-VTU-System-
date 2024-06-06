import React, { useEffect, useState } from 'react'
import AdminSidebar from '../Components/AdminSidebar'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

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
                setsettings(res.data.settings)
            })
            .catch((err) => {
            })
    }

    const setIntraTransferFee = () => {
        const url = "http://localhost:5000/admin/settings/edit"
        let newValue = document.getElementById("intraFeeNewValue").value
        console.log(newValue);
        axios.post(url, { whatToEdit: "intraFee", newValue })
            .then((res) => {
                console.log(res);
                toast.success("Change saved successfully.")
                setTimeout(() => {
                    window.location.reload()
                }, 1500);
            })
            .catch((err) => {
                console.log(err);
                toast.error("An error occured")
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
                    <div className='w-full bg-white h-48 my-5 rounded-xl px-[3%] '>
                        <h1 className='text-2xl text-center text-blue-700 pt-3 pb-3'>Intra-transfer Fee</h1>
                        <p className='text-lg'>This is the fee that will be charge per transaction for <b>Intra - Transfer feature.</b></p>
                        <h2 className='text-xl'>Currently set to <span>{ settings ? ( <span>{settings[0].intraTransferFee.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}</span> ) : ( <span>Loading ...</span> )}</span></h2>
                        <div className='flex items-center  mt-3 gap-[5%] '>
                            <input id='intraFeeNewValue' placeholder='0' type="text" className='w-[70%] border-2 border-blue-500  h-10 p-3.5 sm:text-sm' />
                            <button className='w-[15%] bg-blue-500 focus:bg-blue-400 h-10 text-white sm:text-sm sm:w-[25%] ' onClick={setIntraTransferFee}>Save</button>
                        </div>
                    </div>
                </div>


            </section>
        </>
    )
}

export default AdminSettings