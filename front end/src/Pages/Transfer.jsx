import React, { useEffect, useState } from 'react'
import Siderbar from '../Components/Siderbar'
import Rightbar from '../Components/Rightbar'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Transfer = () => {
    let navigate = useNavigate()
    const [userId, setuserId] = useState("")
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
            console.log(res);
            if (res.data.emailVerified == false) {
                navigate('/user/verify')
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
            <section className='flex relative w-full'>
                <Siderbar />

                {/* Body  */}
                <div className='w-full lg:w-[60%] md:w-[60%] bg-gray-100 static lg:absolute  md:fixed left-[20%] '>

                </div>

                <Rightbar />
            </section>
        </>
    )
}

export default Transfer