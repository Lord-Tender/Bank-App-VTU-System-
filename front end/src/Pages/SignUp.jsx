import { useFormik } from 'formik'
import React from 'react'
import img from '../assets/Image/signPage.jpg'
import '../assets/Styles/form.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import * as yup from 'yup'
import { BiHide, BiShow } from 'react-icons/bi'
import { GoArrowLeft } from 'react-icons/go'

const SignUp = () => {
    let navigate = useNavigate()

    let url = "http://localhost:5000/user/register"
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            dateOfBirth: "",
            phoneNumber: "",
            email: '',
            password: ''
        },
        validationSchema: yup.object({
            firstName: yup.string().required("First name is required").min(3, "Minimum 3 characters required").max(14, "Can't be more then 14 character"),
            lastName: yup.string().required("Last name is required").min(3, "Minimum 3 characters required").max(14, "Can't be more then 14 character"),
            dateOfBirth: yup.string().required("DOB is required")
                .test('dateOfBirth', 'Must be 18 or older', function (value) {
                    if (!value) return false; // Handle empty value gracefully

                    const today = new Date();
                    const eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
                    return new Date(value) <= eighteenYearsAgo;
                }),
            phoneNumber: yup.string().required("Phone number is required").min(11, "Invalid Phone number").max(11, "Invalid Phone number"),
            email: yup.string().email("invalid email address").required("Email is required"),
            password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters long').matches(/[a-z]/, 'Password must contain at least one lowercase')
                .matches(/[A-Z]/, 'Password must contain at least one uppercase')
                .matches(/[0-9]/, 'Password must contain at least number').max(15, 'Password must not be longer 15 characters')
                .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')

        }),
        onSubmit: (values) => {
            document.getElementById('loader').style.display = 'block';
            document.getElementById('buttonText').style.display = 'none';
            axios.post(url, values)
                .then((res) => {
                    if (res.data.status === "Register sucessfully") {
                        toast.success("Register sucessfully")
                        setTimeout(() => {
                            navigate('/user/login')
                        }, 3000);
                    }
                }).catch((err) => {
                    let numberExist = err.response.data.error.keyPattern["phoneNo.phone"]
                    let emailExist = err.response.data.error.keyPattern["emailInfo.email"]
                    if (emailExist === 1) {
                        toast.error("Email taken!")
                        document.getElementById('loader').style.display = 'none';
                        document.getElementById('buttonText').style.display = 'block';
                    } else if (numberExist === 1) {
                        toast.error("Number Taken!")
                        document.getElementById('loader').style.display = 'none';
                        document.getElementById('buttonText').style.display = 'block';
                    } else if (err.response.data.error.connectionGeneration) {
                        toast.error("Unknown network error")
                        document.getElementById('loader').style.display = 'none';
                        document.getElementById('buttonText').style.display = 'block';
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
                <div className=' w-[100%] px-4 md:px-14  lg:w-hf lg:px-20 flex items-center'>
                    <div className='w-[100%] p-5 rounded-lg ' style={{ backgroundColor: "whitesmoke" }}>
                    <h2 className='text-xl text-center mb-2 text-blue-600 hidden sm:block'>Register new account</h2>
                        <form onSubmit={formik.handleSubmit}>
                            <input className='block bg-white border-2 w-full h-12 mb-3.5 rounded-lg p-3 focus:outline-2 outline-blue-400'
                                type="text" placeholder='First name' name='firstName'
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange} value={formik.values.firstName} />
                            {formik.touched.firstName ? (
                                <div className={formik.errors.firstName ? 'mb-3 text-center mt-[-15px] text-red-600 ' : 'hidden'}><i>{formik.errors.firstName}</i></div>
                            ) : null}

                            <input className='block bg-white border-2 w-full h-12 mb-3.5 rounded-lg p-3 focus:outline-2 outline-blue-400'
                                type="text" placeholder='Last name' name='lastName'
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange} value={formik.values.lastName} />
                            {formik.touched.lastName ? (
                                <div className={formik.errors.lastName ? 'mb-3 text-center mt-[-15px] text-red-600 ' : 'hidden'}><i>{formik.errors.lastName}</i></div>
                            ) : null}

                            <input className='block bg-white border-2 w-full h-12 mb-3.5 rounded-lg p-3 focus:outline-2 outline-blue-400'
                                type="date" placeholder='' name='dateOfBirth'
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange} value={formik.values.dateOfBirth} />
                            {formik.touched.dateOfBirth ? (
                                <div className={formik.errors.dateOfBirth ? 'mb-3 text-center mt-[-15px] text-red-600 ' : 'hidden'}><i>{formik.errors.dateOfBirth}</i></div>
                            ) : null}

                            <input className='block bg-white border-2 w-full h-12 mb-3.5 rounded-lg p-3 focus:outline-2 outline-blue-400'
                                type="text" placeholder='Phone number' name='phoneNumber'
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange} value={formik.values.phoneNumber} />
                            {formik.touched.phoneNumber ? (
                                <div className={formik.errors.phoneNumber ? 'mb-3 text-center mt-[-15px] text-red-600 ' : 'hidden'}><i>{formik.errors.phoneNumber}</i></div>
                            ) : null}

                            <input className='block bg-white border-2 w-full h-12 mb-3.5 rounded-lg p-3 focus:outline-2 outline-blue-400'
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

                            <p className='text-center text-dark '>Already had an account? <Link to='/user/login' className='text-red-500'>Sign in.</Link></p>

                            <button type='submit' className='bg-blue-500 p-2 text-white w-[30%] rounded ms-[35%] mt-3'>
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
                                <p id='buttonText'>Sign Up</p></button>
                        </form>
                    </div>
                </div>
                <div className='w-hf h-[100vh] hidden md:block lg:block bg-blue-600'>
                    <h1 className='text-xl font-bold text-blue-50 text-center mt-8' >Register a new account</h1>
                    <p className='text-lg text-center my-3 text-white'>Provide the require info to register with us and get started.</p>

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


export default SignUp