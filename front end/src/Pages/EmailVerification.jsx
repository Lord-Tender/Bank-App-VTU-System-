import axios from 'axios'
import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const EmailVerification = () => {
    let navigate = useNavigate()
    let userId = ""
    useEffect(() => {
        checkStatus()
    }, [])

    const checkStatus = () => {
        let token = localStorage.getItem('token')
        let url = 'https://bank-app-vtu-system.onrender.com/user/page_auth'

        axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
        }).then((res) => {
            userId = res.data.user.userId
            if (res.data.userResult.emailInfo.emailVerified === true) {
                navigate("/user/dashboard")
            }else{
                toast.error("Email not verified!")
            }
        })
            .catch((err) => {
                if (err) {
                    let errorMassage = err.response.data.error.message
                    let backendMassage = err.response.data.Message
                    if (errorMassage === "invalid token" || backendMassage === "User not found") {
                        navigate("/user/login")
                        localStorage.removeItem('token')
                    }
                }
            })

    }

    const resendLink = () => {
        let url = 'https://bank-app-vtu-system.onrender.com/user/resendlink'

        axios.post(url, { userId })
            .then((res) => {
                if (res.data.data.msg) {
                    toast.success("Verification link sent!")
                }
            })
            .catch((err) => {
                if (err) {
                    toast.error("An error occured!")
                }
            })
    }



    return (
        <>
            <nav className='bg-blue-400 p-5'>
                <h1 className='text-lg text-white'>Tender Pay</h1>
            </nav>
            <h1 className='text-[1.5rem] text-center my-3 text-blue-800 sm:text-[2.2rem]'>Complete your registration</h1>
            <h2 className='text-2xl text-center '>Verify your email</h2>
            <p className='text-[1rem] w-[75%] ms-[12.5%] text-center mt-5 lg:text-[1.2rem] lg:w-[75%] lg:ms-[12.5%]'>Check your email inbox for the <i>verification mail</i> sent to your email address and click the verification link to verify your email.</p>
            <p className='text-red-500 text-[1rem] w-[75%] ms-[12.5%] text-center mt-4 lg:text-[1.2rem] lg:w-[75%] lg:ms-[12.5%]'>You should check your spam folder and other folder for it.</p>
            <button onClick={resendLink} className='bg-red-600 p-3 px-4 text-white rounded-lg w-[40%] ms-[30%] mt-4 lg:w-[15%] lg:ms-[42.5%] lg:mt-7'>Resend Link</button>
            <button onClick={checkStatus} className='bg-blue-500 p-3 px-4 text-white rounded-lg w-[40%] ms-[30%] mt-2 lg:w-[15%] lg:ms-[42.5%] lg:mt-4'>I have clicked the link!</button>
        </>
    )
}

export default EmailVerification