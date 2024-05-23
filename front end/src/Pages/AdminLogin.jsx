import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { BiHide, BiShow } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'

const AdminLogin = () => {
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    let navigate = useNavigate()

    const loginUser = () => {
        document.getElementById('loader').style.display = 'block';
        document.getElementById('buttonText').style.display = 'none';
        const url = "http://localhost:5000/admin/login"
        axios.post(url, { email, password })
            .then((res) => {
                console.log(res.data);
                localStorage.setItem('admin_token', res.data.token)
                toast.success("Login Successfull")
                document.getElementById('loader').style.display = 'none';
                document.getElementById('buttonText').style.display = 'block';
                setTimeout(() => {
                    navigate("/admin/dashboard")
                }, 2000);
            })
            .catch((err) => {
                console.log(err);
                document.getElementById('loader').style.display = 'none';
                document.getElementById('buttonText').style.display = 'block';
            })
    }

    const showPassword = () => {
        let password = document.getElementById('password');
        let showPassword = document.getElementById('showPassword');
        let hidePassword = document.getElementById('hidePassword');

        if (password.type === "password") {
            password.type = "text";
            showPassword.style.display = 'none';
            hidePassword.style.display = 'block';
        }
    }

    const hidePassword = () => {
        let password = document.getElementById('password');
        let showPassword = document.getElementById('showPassword');
        let hidePassword = document.getElementById('hidePassword');

        if (password.type === "text") {
            password.type = "password";
            showPassword.style.display = 'block';
            hidePassword.style.display = 'none';
        }
    }
    return (
        <>
            <section className='bg-blue-950 h-screen flex items-center justify-center'>
                <div className='bg-blue-100 h-[17em] w-[35%] rounded shadow-sm shadow-white px-5 ' style={{ fontFamily: '"Josefin Sans", sans-serif' }}>
                    <h1 className='text-center text-xl font-semibold my-2 text-blue-800 '>Welcome Admin</h1>
                    <label htmlFor=""></label>
                    <input type="email" id='email' autoFocus onChange={(e) => { setemail(e.target.value) }}
                        placeholder='example@email.com '
                        className='block w-full h-[3em] rounded mb-3 p-3 border border-blue-300 focus:border-blue-500 focus:outline-none ' />
                    <div className='flex items-center relative'>
                        <input className='block w-full h-[3em] rounded mb-3 p-3 border border-blue-300 focus:border-blue-500 focus:outline-none ' onChange={(e) => { setpassword(e.target.value) }}
                            type="password" placeholder='Password' name='password' id='password' />
                        <div className='text-[1.4rem] absolute right-3 top-3 text-blue-700'>
                            <BiHide className='hidden' id='hidePassword' onClick={hidePassword} />
                            <BiShow id='showPassword' onClick={showPassword} />
                        </div>
                    </div>
                    <button className='bg-blue-600 w-[40%] ms-[30%] h-[2.5rem] rounded-3xl mt-3 text-white hover:bg-blue-800 ' onClick={loginUser} >
                        <div className="spinner center" id='loader'>
                            <div className="spinner-blade"></div>
                            <div className="spinner-blade"></div>
                            <div className="spinner-blade"></div>
                            <div className="spinner-blade"></div>
                            <div className="spinner-blade"></div>
                            <div className="spinner-blade"></div>
                            <div className="spinner-blade"></div>
                            <div className="spinner-blade"></div>
                            <div className="spinner-blade"></div>
                            <div className="spinner-blade"></div>
                            <div className="spinner-blade"></div>
                            <div className="spinner-blade"></div>
                        </div>
                        <p id='buttonText'>Log In</p></button>
                </div>
            </section>
        </>
    )
}

export default AdminLogin