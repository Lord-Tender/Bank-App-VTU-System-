import React, { useEffect, useState } from 'react'
import Siderbar from '../Components/Siderbar'
import Rightbar from '../Components/Rightbar'
import axios from 'axios'
import toast from 'react-hot-toast'

const Airtime = () => {
    const [user, setuser] = useState("")
    const [network, setnetwork] = useState("")
    const [adminSettings, setadminSettings] = useState("")



    useEffect(() => {
        getNetworks()
        getSetting()
        let token = localStorage.getItem('token')
        let url = 'http://localhost:5000/user/page_auth'

        axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
        }).then((res) => {
            setuser(res.data.userResult)
            if (res.data.emailVerified == false) {
                navigate('/user/not-verify')
            }
        })
            .catch((err) => {
                console.log(err);
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

    const getNetworks = () => {
        let url = 'http://localhost:5000/user/get_plans'
        axios.get(url)
            .then((res) => {
                setnetwork(res.data.plans)
            })
            .catch((err) => {
            })
    }

    const getSetting = () => {
        let url = 'http://localhost:5000/user/get_setting'
        axios.get(url)
            .then((res) => {
                setadminSettings(res.data.setting[0])
            })
            .catch((err) => {
            })
    }

    const [networkBorder, setnetworkBorder] = useState("")

    const handleNetwork = (e) => {
        let value = e.target.value
        setnetworkId(value)
        if (value === "") {
            setnetworkBorder("#e5e7eb")
        }
        if (value == 1) {
            setnetworkBorder("yellow")
        }
        if (value == 2) {
            setnetworkBorder("#ADF802")
        }
        if (value == 3) {
            setnetworkBorder("gray")
        }
        if (value == 4) {
            setnetworkBorder("#E90000")
        }
    }

    const handleAirtimeAmount = (e) => {
        let value = e.target.value
        setairtimeAmount(value)
        let adminBonus = (Number(adminSettings.airtimePrice) / 100) * Number(value)
        let amountTo = value - adminBonus
        setamounToPay(amountTo)
    }

    const [networkId, setnetworkId] = useState("")
    const [artimeType, setartimeType] = useState("")
    const [mobileNo, setmobileNo] = useState("")
    const [airtimeAmount, setairtimeAmount] = useState("")

    const [amounToPay, setamounToPay] = useState("")

    return (
        <>
            <section id='section' className="mainSection flex relative w-full " >

                <Siderbar />

                {/* Main body */}

                <div className='w-full lg:w-[60%] md:w-[60%] bg-gray-100 static lg:absolute px-7 sm:px-3 md:fixed left-[20%] ' style={{ fontFamily: '"Josefin Sans", sans-serif' }}>
                    <h1 className='text-[1.5em] text-center pt-2 '>Airtime TopUp</h1>

                    {/* Network */}

                    <div className={`w-full bg-white h-[6.5em] my-3 rounded-xl border-[3px] p-3 border-[]`} style={{ borderColor: `${networkBorder}` }}>
                        <h2 className='text-[1em] text-blue-800 '>Network</h2>
                        <select onChange={handleNetwork} name="network" id="network" className='w-full border px-3 h-8 my-2 rounded border-blue-400 focus:border-blue-500 focus:outline-none gap-2 '>
                            <option value="">------</option>
                            {network ?
                                network.map((item, i) => (
                                    <option className='m-2' value={item.network_id} key={i}>{item.network_name}</option>
                                ))
                                : null
                            }
                        </select>
                    </div>

                    {/* Airtime Type */}

                    <div className={`w-full bg-white h-[6.5em] my-3 rounded-xl border-[3px] p-3 `}>
                        <h2 className='text-[1em] text-blue-800 '>Airtime Type</h2>
                        <select onChange={(e) => { setartimeType(e.target.value) }} name="type" id="type" className='w-full border px-3 h-8 my-2 rounded border-blue-400 focus:border-blue-500 focus:outline-none gap-2 '>
                            <option value="VTU">VTU</option>
                            <option value="Share and Sell">Share and Sell</option>
                        </select>
                    </div>

                    {/* Number */}

                    <div className={`w-full bg-white h-[6.5em] my-3 rounded-xl border-[3px] p-3 `}>
                        <h2 className='text-[1em] text-blue-800 '>Mobile Number</h2>
                        <input type="number" onChange={(e)=>{setmobileNo(e.target.value)}} className='w-full border px-3 h-8 my-2 rounded border-blue-400 focus:border-blue-500 focus:outline-none' placeholder='' />
                    </div>

                    {/* Amount */}

                    <div className={`w-full bg-white h-[6.5em] my-3 rounded-xl border-[3px] p-3 `}>
                        <h2 className='text-[1em] text-blue-800 '>Amount</h2>
                        <input type="number" onChange={handleAirtimeAmount} className='w-full border px-3 h-8 my-2 rounded border-blue-400 focus:border-blue-500 focus:outline-none' placeholder='' />
                    </div>

                    {/* Amount to pay */}

                    <div className={`w-full bg-white h-[6.5em] my-3 rounded-xl border-[3px] p-3 `}>
                        <h2 className='text-[1em] text-blue-800 '>Amount to pay in total:</h2>
                        <input type="text" className='w-full border px-3 h-8 my-2 rounded border-blue focus:outline-none' readOnly  value={amounToPay.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}/>
                    </div>

                    <button className='w-full h-10 bg-blue-400 mb-9 rounded text-blue-50 hover:bg-blue-300 hover:text-blue-950 focus:bg-blue-500'>Buy now</button>
                </div>


                <Rightbar />

            </section>
        </>
    )
}

export default Airtime