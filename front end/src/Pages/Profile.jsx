import React, { useEffect, useState } from 'react'
import Siderbar from '../Components/Siderbar'
import Rightbar from '../Components/Rightbar'
import { GoArrowLeft } from 'react-icons/go'
import { Link, useNavigate } from 'react-router-dom'
import profileDemo from '../assets/Image/profile_demo 2.jpg'
import { MdEditSquare } from 'react-icons/md'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useFormik } from 'formik'
import * as yup from 'yup';

const Profile = () => {
  let navigate = useNavigate()
  const [userId, setuserId] = useState("")
  const [user, setuser] = useState("")
  useEffect(() => {
    let token = localStorage.getItem('token')
    let url = 'https://bank-app-vtu-system.onrender.com/user/page_auth'

    axios.get(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
    }).then((res) => {
      const theuserId = res.data.user.userId
      setuser(res.data.userResult)
      setuserId(theuserId)
      if (res.data.userResult.photoUrl) {
        setFile(res.data.userResult.photoUrl)
      }
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

  const [file, setFile] = useState(`${profileDemo}`)

  const whenChanged = (e) => {
    let file = e.target.files[0]
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      setFile(reader.result)
      document.getElementById('profileDisplay').src = reader.result
      document.querySelector('.errorMessage').style.display = 'block'
    }
  }

  const uploadProfile = () => {
    let uploadProfileFile = document.getElementById('uploadInput').files
    if (uploadProfileFile.length === 0) {
      toast.error('No file selected')
    } else {
      document.getElementById('loader').style.display = 'block';
      document.getElementById('buttonText').style.display = 'none';
      let url = 'https://bank-app-vtu-system.onrender.com/user/upload_profile'
      axios.post(url, { file, userId })
        .then((user) => {
          document.getElementById('loader').style.display = 'none';
          document.getElementById('buttonText').style.display = 'block';
          toast.success('Updated successful')
          document.querySelector('.errorMessage').style.display = 'none'
        })
        .catch((err) => {
          document.getElementById('loader').style.display = 'none';
          document.getElementById('buttonText').style.display = 'block';
          document.querySelector('.errorMessage').style.display = 'none'
          toast.error("An Error Occur")
        })
    }
  }

  const changePassword = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    },
    validationSchema: yup.object({
      oldPassword: yup.string().required('Old password is required'),
      newPassword: yup.string().required('Enter a new password').min(8, 'Password must be at least 8 characters long').matches(/[a-z]/, 'Password must contain at least one lowercase')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase')
        .matches(/[0-9]/, 'Password must contain at least number')
        .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character'),
      confirmPassword: yup.string().required('Confirm password')
    }),
    onSubmit: (values) => {
      document.getElementById('loader2').style.display = 'block';
      document.getElementById('buttonText2').style.display = 'none';

      const url = "https://bank-app-vtu-system.onrender.com/user/change_password"
      let newValue = {
        email: user.emailInfo.email,
        oldPassword: values.oldPassword,
        newPassword: values.newPassword
      }
      if (values.newPassword == values.confirmPassword) {
        axios.post(url, newValue)
          .then((res) => {
            toast.success(`${res.data.mgs}`)
            document.getElementById('loader2').style.display = 'none';
            document.getElementById('buttonText2').style.display = 'block';
          })
          .catch((err) => {
            if (err) {
              toast.error(`${err.response.data.mgs}`)
              document.getElementById('loader2').style.display = 'none';
              document.getElementById('buttonText2').style.display = 'block';
            }
          })
      } else {
        toast.error('Confirm password does not match.')
        document.getElementById('loader2').style.display = 'none';
        document.getElementById('buttonText2').style.display = 'block';
      }
    }

  })

  return (
    <>
      <section className="mainSection flex relative w-full ">
        <Siderbar />

        {/* Main body */}

        <div className='w-full lg:w-[60%] md:w-[60%] bg-gray-100 static lg:absolute  md:fixed left-[20%] ' style={{ fontFamily: '"Josefin Sans", sans-serif' }}>
          <h1 className='text-blue-900 text-[1.5rem] ps-7 p-1.5 border-b-2 border-b-blue-100 flex items-center gap-6'> <Link to='/user/dashboard'><GoArrowLeft /> </Link>  <span>Edit Profile</span> </h1>

          {/* Upload profile */}
          <div className=' border-b-2 border-b-blue-100 py-16'>
            <h1 className='text-[1.2rem] text-blue-700 text-center mb-5'>Update your profile picture</h1>
            <div className='flex items-center justify-center mb-3'>
              <div className='w-[12.5rem] h-[12.5rem] relative '>
                <img src={file} alt="" className='w-full h-full rounded-full border-4 border-blue-600  ' id='profileDisplay' />
                <div className='absolute right-0 bottom-[10%]'>
                  <input type="file" id='uploadInput' onChange={whenChanged} className='absolute top-0 left-0 w-full h-full opacity-0' />
                  <MdEditSquare className='text-[2rem] text-blue-900  ' />
                </div>
              </div>
            </div>
            <p className='errorMessage text-center text-red-500 hidden' ><i>Click on save below to save changes.</i> </p>
            <button onClick={uploadProfile} className='bg-blue-500 border-2 border-blue-600 py-2 w-[20%] text-dark font-[500] rounded-md ms-[40%] mt-3 '>
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
              <p id='buttonText'>Save</p>
            </button>
          </div>

          {/* Change password */}
          <h1 className='text-blue-900 text-[1.5rem] ps-7 p-2 border-b-2 border-b-blue-100 '>Security</h1>
          <form onSubmit={changePassword.handleSubmit} className='px-14 mb-10'>
            <h2 className='text-red-500 text-[1.6rem] text-center p-2 mb-3 mt-5'>Change Password</h2>
            <label htmlFor="oldPassword" className='block text-xl text-blue-600'>Old password</label>
            <input className='border-2 border-sky-500 rounded h-[2.6rem] w-[70%] mt-2 bg-blue-50 p-3 focus:border-red-500 focus:outline-none '
              type="password" id='oldPassword' name='oldPassword'
              onBlur={changePassword.handleBlur}
              onChange={changePassword.handleChange} />
            {changePassword.touched.oldPassword ? (
              <div className={changePassword.errors.oldPassword ? 'mb-3 text-center text-red-600 ' : 'hidden'}><i>{changePassword.errors.oldPassword}</i></div>
            ) : null}

            <label htmlFor="newPassword" className='block text-xl text-blue-600 mt-2'>New password</label>
            <input className='border-2 border-sky-500 rounded h-[2.6rem] w-[70%] mt-2 bg-blue-50 p-3 focus:border-red-500 focus:outline-none '
              type="text" id='newPassword' name='newPassword'
              onBlur={changePassword.handleBlur}
              onChange={changePassword.handleChange} />
            {changePassword.touched.newPassword ? (
              <div className={changePassword.errors.newPassword ? 'mb-3 text-center text-red-600 ' : 'hidden'}><i>{changePassword.errors.newPassword}</i></div>
            ) : null}


            <label htmlFor="confirmPassword" className='block text-xl text-blue-600 mt-2'>Confirm password</label>
            <input className='border-2 border-sky-500 rounded h-[2.6rem] w-[70%] mt-2 bg-blue-50 p-3 focus:border-red-500 focus:outline-none '
              type="text" id='confirmPassword' name='confirmPassword'
              onBlur={changePassword.handleBlur}
              onChange={changePassword.handleChange} />
            {changePassword.touched.confirmPassword ? (
              <div className={changePassword.errors.confirmPassword ? 'mb-3 text-center text-red-600 ' : 'hidden'}><i>{changePassword.errors.confirmPassword}</i></div>
            ) : null}


            <button type='submit' className='bg-red-500 w-[30%] h-[2.8em] block mt-6 rounded text-white hover:bg-red-700 hover:text-gray-200 '>
              <div className="spinner center" id='loader2'>
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
              <p id='buttonText2'>Change password</p>
            </button>
          </form>

        </div>

        <Rightbar />
      </section>
    </>
  )
}

export default Profile