import img from '../assets/Image/signPage.jpg'
import { useFormik } from 'formik'
import axios from 'axios';
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import * as yup from 'yup';
import { BiHide, BiShow } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { setAuthenticated } from '../Redux/authSlide';
import { GoArrowLeft } from 'react-icons/go';


const SignIn = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch();

    let url = "https://tenderpayapi.vercel.app/user/login";

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: yup.object({
            email: yup.string().email("invalid email address").required("Email is required"),
            password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters long').matches(/[a-z]/, 'Password must contain at least one lowercase')
                .matches(/[A-Z]/, 'Password must contain at least one uppercase')
                .matches(/[0-9]/, 'Password must contain at least number')
                .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')

        }),
        onSubmit: (values) => {
            document.getElementById('loader').style.display = 'block';
            document.getElementById('buttonText').style.display = 'none';

            axios.post(url, values).then((res) => {
                toast.success("Login successfull")
                localStorage.setItem('token', res.data.token)
                dispatch(setAuthenticated(true));
                let emailVerify = res.data.user.emailInfo.emailVerified
                setTimeout(() => {
                    if (emailVerify === false) {
                        navigate('/user/not-verify')
                    } else if (emailVerify === true) {
                        navigate('/user/dashboard')
                    }
                }, 2000);
            }).catch((err) => {
                if (err) {
                    document.getElementById('loader').style.display = 'none';
                    document.getElementById('buttonText').style.display = 'block';
                }
                if (err.response.data.Message === "Invalid detail" || err.response.data.Message === "Invalid detail") {

                    toast.error("Invalid login details");
                }
            })
        }
    })

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
            <section className='flex w-fl' style={{ fontFamily: '"Josefin Sans", sans-serif' }}>
                <div className=' w-[100%] px-4 md:px-14  lg:w-hf lg:px-20 flex items-center '>
                    <div className='w-[100%] p-5 rounded-lg ' style={{ backgroundColor: "whitesmoke" }}>
                        <h2 className='text-xl text-center mb-2 text-blue-600 hidden sm:block'>Login to your account</h2>
                        <p className='text-cente text-dark mb-5'>Don't have an account? <Link to='/user/register' className='text-red-500 text-lg'>Create an account.</Link></p>
                        <form onSubmit={formik.handleSubmit}>

                            <input className='block bg-white border-2 w-full h-14 mb-4 rounded-lg p-3 focus:outline-2 outline-blue-400'
                                type="text" placeholder='Email' name='email'
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange} value={formik.values.email} />
                            {formik.touched.email ? (
                                <div className={formik.errors.email ? 'mb-3 text-center mt-[-15px] text-red-600 ' : 'hidden'}><i>{formik.errors.email}</i></div>
                            ) : null}

                            <div className='flex items-center relative'>
                                <input className='block bg-white border-2 w-full h-14 mb-4 rounded-lg p-3 focus:outline-2 outline-blue-400'
                                    type="password" placeholder='Password' name='password' id='password'
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange} value={formik.values.password} />
                                <div className='text-[1.5rem] absolute right-3 top-4 cursor-pointer'>
                                    <BiHide className='hidden' id='hidePassword' onClick={hidePassword} />
                                    <BiShow id='showPassword' onClick={showPassword} />
                                </div>
                            </div>
                            {formik.touched.password ? (
                                <div className={formik.errors.password ? 'mb-3 text-center mt-[-15px] text-red-600 ' : 'hidden'}><i>{formik.errors.password}</i></div>
                            ) : null}

                            <p className='text-centr text-dark '>Forgotten password? <Link to='/user/reset_password' className=' text-red-500'>Reset.</Link></p>

                            <button type='submit' className='bg-blue-500 p-2 text-white w-[30%] rounded mt-3'>
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
                                <p id='buttonText'>Sign In</p></button>
                        </form>
                    </div>
                </div>
                <div className='w-hf h-[100vh] hidden md:block lg:block bg-blue-600'>
                    <h1 className='text-xl font-bold text-blue-50 text-center mt-8' >Access your Account here</h1>
                    <p className='text-lg text-center my-3 text-white'>Login to your account by providing your login details</p>

                    <div className='w-hf ms-[25%] rounded overflow-hidden h-[20em] mt-7 bg-slate-900 '>
                        <img src={img} alt="" className='w-full h-full' style={{ objectFit: "cover" }} />
                    </div>

                    <Link to='/'>
                        <button className='text-blue-700 font-semibold bg-white w-hf ms-[25%] mt-10 h-12 rounded-3xl flex items-center justify-center'><span className='text-2xl me-[7%] '><GoArrowLeft /></span> <span>Go back Home</span></button>
                    </Link>
                </div>
            </section>
        </>
    )
}

export default SignIn