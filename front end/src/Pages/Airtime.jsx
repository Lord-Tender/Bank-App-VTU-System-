import React, { useEffect, useState } from 'react'
import Siderbar from '../Components/Siderbar'
import Rightbar from '../Components/Rightbar'
import axios from 'axios'
import toast from 'react-hot-toast'

const Airtime = () => {
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
            getUserTransaction(res.data.userResult.emailInfo.email)
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

    return (
        <>
            <section id='section' className="mainSection flex relative w-full " >

                <Siderbar />

                {/* Main body */}

                <div className='w-full lg:w-[60%] md:w-[60%] h-screen bg-gray-100 static lg:absolute px-7 sm:px-3 md:fixed left-[20%] ' style={{ fontFamily: '"Josefin Sans", sans-serif' }}>

                    <div className='w-full bg-white h-[6em] my-3 rounded-xl'>

                    </div>
                </div>


                <Rightbar />

            </section>
        </>
    )
}

export default Airtime