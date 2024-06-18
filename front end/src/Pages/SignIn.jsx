import img from '../assets/Image/App monetization.gif'
import { useFormik } from 'formik'
import axios from 'axios';
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import * as yup from 'yup';
import { BiHide, BiShow } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { setAuthenticated } from '../Redux/authSlide';


const SignIn = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch();

    let url = "http://localhost:5000/user/login";

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
                        navigate('/user/verify')
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
            <section className='flex w-fl'>
                <div className=' w-[100%] px-4 md:px-14  lg:w-hf lg:px-24 bg-[] '>
                    <h1 className='text-center text-2xl text-blue-500 mt-32 mb-1'>Login to account</h1>
                    <p className='text-center text-dark mb-5'>Don't have an account? <Link to='/user/register' className='text-red-500 text-lg'>Create an account.</Link></p>
                    <form onSubmit={formik.handleSubmit}>

                        <input className='block bg-gray-100 w-full h-14 mb-4 rounded-lg p-3 focus:outline-2 outline-blue-400'
                            type="text" placeholder='Email' name='email'
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange} value={formik.values.email} />
                        {formik.touched.email ? (
                            <div className={formik.errors.email ? 'mb-3 text-center mt-[-15px] text-red-600 ' : 'hidden'}><i>{formik.errors.email}</i></div>
                        ) : null}

                        <div className='flex items-center relative'>
                            <input className='block bg-gray-100 w-full h-14 mb-4 rounded-lg p-3 focus:outline-2 outline-blue-400'
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

                        <p className='text-center text-dark '>Forgotten password? <Link to='/user/reset_password' className=' text-red-500'>Reset.</Link></p>

                        <button type='submit' className='bg-blue-400 p-2 text-white w-[30%] rounded ms-[35%] mt-3'>
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
                <div className='w-hf h-[100vh] hidden md:block lg:block bg-blue-200'>
                    <img src={img} alt="" className='w-[80%] h-[90%] ms-[10%]' />
                </div>
            </section>
        </>
    )
}

export default SignIn