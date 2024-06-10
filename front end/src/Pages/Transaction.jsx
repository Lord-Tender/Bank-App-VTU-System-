import React, { useEffect, useState } from 'react'
import Siderbar from '../Components/Siderbar'
import Rightbar from '../Components/Rightbar'
import axios from 'axios'

const Transaction = () => {
    const [user, setuser] = useState("")

    useEffect(() => {
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


    return (
        <>
            <section id='section' className="mainSection flex relative w-full " >
                <Siderbar />

                {/* MAin body */}

                <div className='w-full lg:w-[60%] md:w-[60%] h-screen bg-gray-100 static lg:absolute px-7 md:fixed left-[20%] ' style={{ fontFamily: '"Josefin Sans", sans-serif' }}>

                    {/* Search Transactions */}

                    <div className='w-full bg-white h-28 my-3 rounded-xl'>
                        <h2 className='text-center text-lg pt-1.5'>Search transactions</h2>
                        <div className='flex justify-center gap-5 mt-3 '>
                            <input type="text" placeholder='Transaction ID'
                                className='w-[50%] border-2 border-blue-950 bg-blue-50 rounded h-10 focus:outline-none px-3'
                            />
                            <button className='bg-blue-600 text-white w-[15%] rounded focus:outline-none ' >
                                Search
                            </button>
                        </div>
                    </div>

                    {/* Transaction UI */}

                    <div className=''>

                    </div>
                </div>


                <Rightbar />
            </section>
        </>
    )
}

export default Transaction