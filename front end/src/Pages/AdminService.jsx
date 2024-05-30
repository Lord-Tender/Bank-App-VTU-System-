import React, { useEffect, useState } from 'react'
import AdminSidebar from '../Components/AdminSidebar'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { RxCross2 } from 'react-icons/rx'

const AdminService = () => {
    let navigate = useNavigate()
    const [service, setservice] = useState("")
    const [airtimeFetched, setairtimeFetched] = useState("")

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
                setairtimeFetched(res.data.settings[0].airtimePrice)
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const getServiceDetails = (e) => {
        setservice(e.target.value)
    }


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
                            <select name="" onChange={getServiceDetails} id="service" className='border-2 border-blue-600 rounded p-2 w-[50%]  text-blue-600 focus:outline-none'>
                                <option value="null" className=''>Select service</option>
                                <option value="airtime">Airtime</option>
                                <option value="data">Data</option>
                            </select>

                        </div>
                    </div>

                    {/* Service settings */}

                    <div className='w-full bg-white h-96 my-3 rounded-xl flex justify-center items-center'>
                        {service ? (<div className='w-[95%] h-[100%]'>
                            {service === "airtime" ? (<div className='pt-[3em] '>
                                <h1 className='text-3xl text-center mt-4 text-sky-800 '>Airtime Price</h1>
                                <h2 className='text-[2em] text-red-700 text-center mt-3 '>Currently set to <span>{airtimeFetched}%</span> Off</h2>
                                <p className='text-center text-lg'>Your user will get <span>{airtimeFetched}%</span> off their airtimes.</p>
                                <button className=' bg-blue-600 w-[30%] h-[2.3em] rounded text-white ms-[35%] mt-7 '
                                    onClick={() => document.getElementById('airtimeEdit').style.display = "flex"}>Edit</button>
                            </div>) : (
                                <div>
                                    <h1>Data Plan</h1>
                                </div>
                            )}
                        </div>) : (<div>Select a service to edit.</div>)}
                    </div>

                </div>

                {/* Edit airtime div */}

                <div id='airtimeEdit' className='absolute top-0 w-full h-full justify-center items-center hidden ' style={{ backgroundColor: "rgba(0, 0, 0, 0.548)" }}>
                    <div className='bg-white w-[35%] h-[16em] rounded-lg px-10 pt-2 relative'>
                        <div onClick={() => document.getElementById('airtimeEdit').style.display = "none"}
                            className='font-bold text-[2em] text-white cursor-pointer absolute top-[-1em] right-0 '><RxCross2 /></div>
                        <h3 className='mt-6 font-bold text-lg'>Enter bonus in percentage:</h3>
                        <input type="number" className='mt-3 block w-full h-[3em] rounded mb-3 p-3 border-2 border-blue-400 focus:border-blue-500 focus:outline-none ' placeholder='0%' />
                        <button className='bg-blue-600 w-[50%] h-10 text-white rounded mt-5 '>Save</button>
                    </div>
                </div>

            </section>
        </>
    )
}

export default AdminService