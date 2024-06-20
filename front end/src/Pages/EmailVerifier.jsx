import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const EmailVerifier = () => {

    let location = useLocation()
    const searchParams = new URLSearchParams(location.search);

    const token = searchParams.get('token');
    let navigate = useNavigate()

    useEffect(() => {
        if (!token) {
            navigate('/user/login')
        }
        let url = `https://bank-app-vtu-system.vercel.app/user/verify?token=${token}`
        axios.get(url)
            .then((res) => {
                console.log(res);
                if (res) {
                    document.getElementById('success').style.display = "block"
                    document.getElementById('error').style.display = "none"
                }
                setTimeout(() => {
                    navigate('/user/login')
                }, 2000);
            })
            .catch((err) => {
                console.log(err);
                document.getElementById('error').style.display = "block"
                    document.getElementById('success').style.display = "none"
            })

    }, [])


    return (
        <>
            <div id='success' className=' w-[80%] md:w-[40%] lg:w-[40%] ms-[10%] md:ms-[30%] lg:ms-[30%] shadow-lg h-[20rem] mt-14 p-4 hidden'>
                <h1 className='text-2xl pt-[1em] text-center text-blue-500 '>Your Email address has been verified!</h1>
                <Link to="/user/login">
                    <button className='bg-blue-600 w-[50%] md:w-[35%] lg:w-[35%] ms-[25%] md:ms-[37.5%] lg:ms-[37.5%] text-white mt-4 h-10 rounded '>Back to login</button>
                </Link>
            </div>
            <div id='error' className=' w-[80%] md:w-[40%] lg:w-[40%] ms-[10%] md:ms-[30%] lg:ms-[30%] shadow-lg h-[20rem] mt-14 p-4 hidden'>
                <h1 className='text-2xl pt-[1em] text-center text-red-500 '>404 not found!!!</h1>
                <Link to="/user/login">
                    <button className='bg-blue-600 w-[50%] md:w-[35%] lg:w-[35%] ms-[25%] md:ms-[37.5%] lg:ms-[37.5%] text-white mt-4 h-10 rounded '>Back to login</button>
                </Link>
            </div>
        </>
    )
}

export default EmailVerifier