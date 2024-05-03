import React, { useEffect, useState } from 'react'
import Siderbar from '../Components/Siderbar'
import Rightbar from '../Components/Rightbar'
import axios from 'axios'
import toast from 'react-hot-toast'
import { IoMdClose } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import wema from '../assets/Image/wema_logo.jpg'
import starling from '../assets/Image/starlinglogo.png'

const AddMoney = () => {
    const [user, setuser] = useState("")
    const [nin, setnin] = useState("")
    const [userAccount, setuserAccount] = useState("")
    let navigate = useNavigate()

    let userEmail = ""

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
            userEmail = res.data.userResult.emailInfo.email
            fetchAccounts()
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

    const fetchAccounts = () => {
        const url = "http://localhost:5000/user/fund_wallet/monnify/get_account"
        axios.post(url, { email: userEmail })
            .then((res) => {
                setuserAccount(res.data.account.reservedAcc)
                if (res) {
                    document.getElementById('created').style.display = 'block'
                    document.getElementById('notCreated').style.display = 'none'
                }
            })
            .catch((err) => {
                if (err) {
                    if (err.data.status == false) {
                        document.getElementById('created').style.display = 'none'
                        document.getElementById('notCreated').style.display = 'block'
                    }
                }
            })
    }

    const ramdomString = () => {
        let text = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
        let randomText = ""

        for (let index = 0; index < 25; index++) {
            randomText += text.charAt(Math.floor(Math.random() * text.length))
        }
        return randomText;
    }

    const generateAccounts = () => {
        document.getElementById('loader').style.display = 'block';
        document.getElementById('buttonText').style.display = 'none';
        const url = "http://localhost:5000/user/fund_wallet/monnify"
        const accountReference = `MFY_Tender_Sub(${user.firstName})_${ramdomString()}`
        const data = {
            accountReference,
            accountName: user.firstName,
            customerEmail: user.emailInfo.email,
            customerName: `${user.firstName} ${user.lastName}`,
            nin
        }
        console.log(data);
        axios.post(url, data)
            .then((res) => {
                document.getElementById('loader').style.display = 'none';
                document.getElementById('buttonText').style.display = 'block';
                if (res) {
                    toast.success("Account generated successfully!!!")
                    setTimeout(() => {
                        window.location.reload()
                    }, 2000);
                }
            })
            .catch((err) => {
                console.log(err);
                document.getElementById('loader').style.display = 'none';
                document.getElementById('buttonText').style.display = 'block';
                if (err.response.data.err) {
                    toast.error(err.response.data.err)
                } else if (err) {
                    toast.error("Unkonown Error")
                }
            })
    }

    const closeCreate = () => {
        document.getElementById('createAccounts').style.display = 'none'
    }

    const showCreate = () => {
        document.getElementById('createAccounts').style.display = 'block'
    }

    const closeShow = () => {
        document.getElementById('showAccounts').style.display = 'none'
    }

    const showShow = () => {
        document.getElementById('showAccounts').style.display = 'block'
    }

    return (
        <>
            <section className='flex'>
                <Siderbar />

                {/* Body */}
                <div className='bg-gray-100 w-full lg:w-[60%] md:w-[60%] static lg:absolute  md:fixed left-[20%] h-screen'>
                    <h1 className='text-blue-500 text-2xl text-center p-5 bg-white'>Fund wallet</h1>
                    <details className='bg-white mt-1 h-56 px-[10%] '>
                        <summary className='text-sky-600 text-lg md:text-xl lg:text-xl px-4 py-4 font-semibold'> From Tender Pay:</summary>
                        <div>
                            <div className='px-10 text-blue-500'>
                                <h6 className='text-lg md:text-3xl lg:text-3xl'>Account Number:</h6>
                                <p className='text-lg md:text-2xl lg:text-2xl'>{user.accountNo}</p>
                                <h6 className='text-lg md:text-3xl lg:text-3xl'>Account Name:</h6>
                                <p className='text-lg md:text-2xl lg:text-2xl'>{user.firstName} {user.lastName}</p>
                            </div>
                        </div>
                    </details>


                    <div className='bg-white mt-1 h-80' id='notCreated'>
                        <h1 className='text-blue-500 text-2xl text-center p-5 bg-sky-50'>Virtual accounts</h1>
                        <div>
                            <h1 className='text-2xl text-red-500 text-center mt-7'>You have not virtue account created</h1>
                            <button className='h-[2.6rem] bg-sky-500 w-[40%] rounded ms-[30%] mt-9 text-xl text-white hover:bg-sky-400 ' onClick={showCreate}>Generate</button>
                        </div>
                    </div>

                    <div className='bg-white mt-1 h-80 hidden' id='created'>
                        <h1 className='text-blue-500 text-2xl text-center p-5 bg-sky-50'>Virtual accounts</h1>
                        <div>
                            <h1 className='text-lg md:text-2xl lg:text-2xl text-rose-500 text-center mt-7 px-[10%] '>Make payment to any of your virtue bank account to fund your <b>Tender pay wallet</b> automatically.</h1>
                            <button onClick={showShow} className='h-[2.6rem] bg-sky-500 w-[40%] rounded ms-[30%] mt-9 text-lg md:text-xl lg:text-xl text-white hover:bg-sky-400 '>View accounts</button>
                        </div>
                    </div>

                    <div id='createAccounts' className=' hidden'>
                        <div className='absolute bottom-0 bg-blue-400 w-full h-[75%] rounded-t-3xl px-4 md:px-9 lg:px-9 py-8 '>
                            <IoMdClose onClick={closeCreate} className=' cursor-pointer text-[1.9rem] text-blue-500 absolute top-[-7%] right-[2%] ' />
                            <h6 className='text-lg md:text-xl lg:text-xl w-[100%] md:w-[80%] lg:w-[80%] font-bold my-3'>Enter your National Identity Number(NIN) to generate virtue accounts.</h6>
                            <label htmlFor="bvn" className='text-lg md:text-xl lg:text-xl text-white font-bold'>NIN</label>
                            <input type="text" onChange={(e) => { setnin(e.target.value) }}
                                name='bvn' id='bvn' autoFocus
                                className='block w-[70%] md:w-hf lg:w-hf h-[2.7em] rounded p-3 focus:outline-1 outline-blue-700 my-2 '
                                placeholder='0××××××××××' />
                            <button onClick={generateAccounts} className='bg-white w-[30%] h-[2.5rem] rounded my-3 hover:bg-gray-100 '>
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
                                <p id='buttonText'>Generate</p>
                            </button>
                        </div>
                    </div>

                    <div id='showAccounts' className=' hidden '>
                        <div className='absolute bottom-0 bg-blue-400 w-full h-[90%] rounded-t-3xl px-9 py-8'>
                            <IoMdClose onClick={closeShow} className=' cursor-pointer text-[1.9rem] text-blue-500 absolute top-[-7%] right-[2%] ' />

                            <div className="banks">
                                {userAccount ? (
                                    <div className='block md:flex lg:flex gap-[7%] justify-center'>
                                        <div className='w-[100%] md:w-[45%] lg:w-[45%] bg-blue-50 h-[17em] md:h-80 lg:h-80 rounded  '>
                                            <div className='text-md font-bold mx-auto w-[90%] pt-3 '>
                                                <img src={wema} alt="" className='w-[50%] pt-2 mb-[20%] ' />
                                                <h2>Bank name: <span>{userAccount[0].bankName}</span></h2>
                                                <h2>Account Number: <span>{userAccount[0].accountNumber}</span></h2>
                                                <h2>Account Name: Tender Sub <span>{userAccount[0].accountName}</span></h2>

                                            </div>
                                        </div>
                                        <div className='w-[100%] mt-3 md:mt-0 lg:mt-0 md:w-[45%] lg:w-[45%] bg-blue-50 h-[17em] md:h-80 lg:h-80 rounded '>
                                            <div className='text-md font-bold mx-auto w-[80%] pt-3 '>
                                                <img src={starling} alt="" className='w-[50%] pt-2 mb-[20%] ' />
                                                <h2>Bank name: <span>{userAccount[1].bankName}</span></h2>
                                                <h2>Account Number: <span>{userAccount[1].accountNumber}</span></h2>
                                                <h2>Account Name: Tender Sub <span>{userAccount[1].accountName}</span></h2>
                                            </div>
                                        </div>
                                    </div>
                                ) : null
                                }
                            </div>

                        </div>
                    </div>
                </div>

                <Rightbar />
            </section>
        </>
    )
}

export default AddMoney