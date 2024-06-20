import React, { useState } from 'react'
// import '../assets/Styles/pages.css'
import axios from 'axios';

const Forgotten = () => {
    const [email, setemail] = useState("")

    const restPassword = (e) => {
        e.preventDefault()
        document.getElementById('loader').style.display = 'block';
        document.getElementById('buttonText').style.display = 'none';

        const url = "https://bank-app-vtu-system.onrender.com/user/reset_password"
        axios.post(url, { email })
            .then((res) => {
                document.getElementById('form').style.display = 'none';
                document.getElementById('success').style.display = 'block';
            })
            .catch((err) => {
                console.log(err);
                if (err.response.data.mgs === "User not found") {
                    document.getElementById('form').style.display = 'none';
                    document.getElementById('error').style.display = 'block';
                }
            })
    }

    return (
        <>
            <section className='bg-blue-300 px-0 md:px-[20%] lg:px-[20%] h-screen  ' id='resetPassword'>
                <div className='bg-white h-screen w-full p-5'>
                    <h1 className='text-4xl text-red-500 mb-4 mt-[6%] '>Reset password</h1>
                    <p className='text-lg'>Enter the email associated with your account. A new password will be sent to your <b>Email address</b>.</p>
                    <p className='text-md w-[70%] '><b>Note :</b> This can not be undo, once you <i>reset your password</i> the old one will become <b><i>invalid</i></b>.</p>
                    <form action="" id='form' className='bg-slate-100 mb-4 mt-3 w-[100%] md:w-hf lg:w-hf p-2 h-hf border-2 border-slate-300 rounded '>
                        <label className='text-lg text-blue-800 font-semibold mb-0 mt-[10%] ' htmlFor="resetEmail">Enter email:</label>
                        <input type="text" autoFocus
                            onChange={(e) => setemail(e.target.value)}
                            name='email' id='resetEmail'
                            className='block w-[80%] my-4 h-12 rounded p-2 border-2 border-red-400  '
                            placeholder='example@domain.com' />
                        <button onClick={restPassword} className='bg-blue-600 p-2 text-white w-[50%] rounded mt-1'>
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
                            <p id='buttonText'>Reset Password</p></button>
                    </form>
                    <div id='success' className='hidden bg-slate-100 mb-4 mt-3 w-[80%]  p-2 h-hf border-2 border-slate-300 rounded '>
                        <h1 className='text-3xl text-blue-700 mb-5 mt-7 '>Password rest successfully</h1>
                        <h2 className='text-md text-blue-900 '>A new password as been sent to your email address. use it to access your account.</h2>
                        <p className='text-lg text-red-700 mt-2 '>It is advisable to use the <i>new password</i> to change your password immediately you you login in to your for <i><b>Security reason</b></i>.</p>
                        <a href="/user/login"><p className='bg-blue-600 text-white rounded p-2 w-hf text-center mt-7 '>Go back to login page</p></a>
                    </div>

                    <div id='error' className='hidden bg-red-100 mb-4 mt-3 w-[80%]  p-2 h-hf border-2 border-slate-300 rounded '>
                        <h1 className='text-3xl text-blue-700 mb-5 mt-7 '>An error occurred!!!</h1>
                        <h2 className='text-md text-sky-800 '>It posible you don't have an account with us.</h2>
                        <p className='text-lg text-red-700 mt-3'>An account associated with the email provided could not be found. Try <a href="/user/register" className='underline text-red-700'><i><b>registering an account here</b></i></a>.</p>
                        <a href="/user/login"><p className='bg-blue-600 text-white rounded p-2 w-hf text-center mt-7  '>Go back to login page</p></a>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Forgotten