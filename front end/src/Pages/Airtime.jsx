import React, { useEffect, useState } from 'react'
import Siderbar from '../Components/Siderbar'
import Rightbar from '../Components/Rightbar'
import axios from 'axios'
import toast from 'react-hot-toast'

const Airtime = () => {
    const [user, setuser] = useState("")
    const [network, setnetwork] = useState("")

    useEffect(() => {
        getNetworks()
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
        .then((res)=>{
            console.log(res);
            setnetwork(res.data.plans)
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    return (
        <>
            <section id='section' className="mainSection flex relative w-full " >

                <Siderbar />

                {/* Main body */}

                <div className='w-full lg:w-[60%] md:w-[60%] h-screen bg-gray-100 static lg:absolute px-7 sm:px-3 md:fixed left-[20%] ' style={{ fontFamily: '"Josefin Sans", sans-serif' }}>
                    <h1 className='text-[1.5em] text-center pt-2 '>Airtime TopUp</h1>

                    <div className='w-full bg-white h-[7em] my-3 rounded-xl border-4 p-3'>
                        <h2 className='text-[1.2em] '>Network</h2>
                        <select name="network" id="network">
                            <option value=""></option>
                        </select>
                    </div>
                </div>


                <Rightbar />

            </section>
        </>
    )
}

export default Airtime