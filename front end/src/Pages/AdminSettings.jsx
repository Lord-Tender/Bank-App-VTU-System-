import React, { useEffect, useState } from 'react'
import AdminSidebar from '../Components/AdminSidebar'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { PiListDashesBold } from 'react-icons/pi'

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
        if (newValue == "") {
            toast.error("Please input a new value")
        } else {
            axios.post(url, { whatToEdit: "intraFee", newValue })
                .then((res) => {
                    toast.success("Change saved successfully.")
                    setTimeout(() => {
                        window.location.reload()
                    }, 1000);
                })
                .catch((err) => {
                    toast.error("An error occured")
                })
        }
    }

    const setMonnifyTransacFee = () => {
        const url = "http://localhost:5000/admin/settings/edit"
        let newValue = document.getElementById("monnifyFeeNewValue").value
        if (newValue == "") {
            toast.error("Please input a new value")
        } else {
            axios.post(url, { whatToEdit: "monnifyFee", newValue })
                .then((res) => {
                    toast.success("Change saved successfully.")
                    setTimeout(() => {
                        window.location.reload()
                    }, 1000);
                })
                .catch((err) => {
                    toast.error("An error occured")
                })
        }
    }

    return (
        <>
            <section style={{ width: "100%", height: "100%", display: "flex", backgroundColor: "whitesmoke" }}>

                {/* Sidebar  */}
                <div className='relative w-[20%] sm:absolute top-0 sm:w-[80%] ' id='sideBarDiv'>
                    <AdminSidebar />
                </div>


                {/* Body */}
                <div className='sm:w-[100%] w-[80%] px-[2.5em] sm:px-[1em] h-full pb-10' style={{ fontFamily: '"Josefin Sans", sans-serif' }}>

                    <div className='hidden sm:block text-4xl mt-3 text-blue-900 font-bold'>
                        <div onClick={() => { document.getElementById('sidebar').style.display = "block" }}>
                            <PiListDashesBold />
                        </div>
                    </div>

                    {/* Intra transfer setting */}

                    <div className='w-full bg-white h-48 my-5 sm:h-[16em] rounded-xl px-[3%] '>
                        <h1 className='text-2xl text-center text-blue-700 pt-3 pb-3'>Intra-transfer Fee</h1>
                        <p className='text-lg'>This is the fee that will be charge per transaction for <b>Intra - Transfer feature.</b></p>
                        <h2 className='text-xl'>Currently set to <span>{settings ? (<span>{settings[0].intraTransferFee.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}</span>) : (<span>Loading ...</span>)}</span></h2>
                        <div className='flex items-center  mt-3 gap-[5%] '>
                            <input id='intraFeeNewValue' placeholder='0' type="text" className='w-[70%] border-2 border-blue-500  h-10 p-3.5 sm:text-sm' />
                            <button className='w-[15%] bg-blue-500 focus:bg-blue-400 h-10 text-white sm:text-sm sm:w-[25%] ' onClick={setIntraTransferFee}>Save</button>
                        </div>
                    </div>

                    {/* Monnify fee */}

                    <div className='w-full bg-white h-48 my-5 sm:h-[16em] rounded-xl px-[3%] '>
                        <h1 className='text-2xl text-center text-blue-700 pt-3 pb-3'>Monnify Fee</h1>
                        <p className='text-lg'>This is the fee that will be charge per transaction for <b>Monnify wallet funding method.</b></p>
                        <h2 className='text-xl'>Currently set to <span>{settings ? (<span>{settings[0].monnifyTransactionFee.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}</span>) : (<span>Loading ...</span>)}</span></h2>
                        <div className='flex items-center  mt-3 gap-[5%] '>
                            <input id='monnifyFeeNewValue' placeholder='0' type="text" className='w-[70%] border-2 border-blue-500  h-10 p-3.5 sm:text-sm' />
                            <button className='w-[15%] bg-blue-500 focus:bg-blue-400 h-10 text-white sm:text-sm sm:w-[25%] ' onClick={setMonnifyTransacFee}>Save</button>
                        </div>
                    </div>

                    {/* Add new User UI */}

                    <div className='w-full bg-white h-[20em] my-5 rounded-xl px-[3%] '>
                        <h1 className='text-2xl text-center text-blue-700 pt-3 pb-3'>Add new admin</h1>
                        <p className='text-lg w-[80%]'>Enter new admin detail to give new user access to backend, NOTE: He/She ip address must be wishlisted.</p>

                        <input id='monnifyFeeNewValue' placeholder='0' type="text" className='w-[70%] border-2 border-blue-500  h-10 p-3.5 sm:text-sm' />
                    </div>
                </div>


            </section>
        </>
    )
}

export default AdminSettings