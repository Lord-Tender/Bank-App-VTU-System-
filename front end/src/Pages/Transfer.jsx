import React, { useEffect, useState } from 'react'
import Siderbar from '../Components/Siderbar'
import Rightbar from '../Components/Rightbar'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../assets/Styles/pages.css'
import toast from 'react-hot-toast'
import { BsThreeDotsVertical } from 'react-icons/bs'

const Transfer = () => {
    let navigate = useNavigate()
    const [userId, setuserId] = useState("")
  const [userBal, setuserBal] = useState("")
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
            setuser(res.data.userResult)
            setuserBal(res.data.userResult.accountBal.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' }))
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

    const [mgs, setmgs] = useState("Enter account number")
    const [mgs2, setmgs2] = useState("Enter amount")
    const [receiver, setreceiver] = useState(false)
    const [amount, setamount] = useState(false)
    const getReceiver = (e) => {
        let value = e.target.value
        if (value.length === 10) {
            const url = 'https://bank-app-vtu-system.onrender.com/user/intra_transfer/get_receiver'
            axios.post(url, { accountNo: e.target.value })
                .then((res) => {
                    setmgs(res.data.name)
                    setreceiver(res.data.userEmail)
                    if (res.data.userEmail === user.emailInfo.email) {
                        setmgs("Why trying to send money to your own wallet?")
                    }
                })
                .catch((err) => {
                    setmgs(err.response.data.mgs)
                    setreceiver(false)
                })
        } else {
            setmgs("Must be 10 digits")
            setreceiver(false)
        }
    }

    const transacValidator = (e) => {
        const url = 'https://bank-app-vtu-system.onrender.com/user/intra_transfer/validate'
        axios.post(url, { sender: user.emailInfo.email, amount: e.target.value })
            .then((res) => {
                setamount(e.target.value)
                setmgs2(res.data.totalCharge.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' }))
            })
            .catch((err) => {
                setmgs2(err.response.data.mgs)
                setamount(false)
            })
    }

    const validate = () => {
        if (receiver != false && amount != false) {
            return true
        } else {
            return false
        }
    }

    const showConfirmination = () => {
        let validator = validate()
        if (validator == false) {
            toast.error("Invalid account or insufficent fund")
        } else if (validator == true && validator != false) {
            document.getElementById('confirmination').style.display = 'block'
        }
    }

    const sendMoney = () => {
        document.getElementById('loader').style.display = 'flex'
        const url = 'https://bank-app-vtu-system.onrender.com/user/intra_transfer'
        axios.post(url, { sender: user.emailInfo.email, receiver, amount })
            .then((res) => {
                document.getElementById('loader').style.display = 'none'
                window.location.reload()
            })
            .catch((err) => {
                toast.error(err.response.data.mgs)
                document.getElementById('loader').style.display = 'none'
            })
    }

    const cancelConfirmination = () => {
        document.getElementById('confirmination').style.display = 'none'
    }

    const showSidebar = () => {
        document.getElementById('sidebar').style.display = "block"
      }

    return (
        <>
            <section className='flex relative w-full'>
                <Siderbar />

                {/* Body  */}

                <div className='w-full lg:w-[60%] md:w-[60%] static lg:absolute  md:fixed left-[20%] ' style={{ fontFamily: '"Josefin Sans", sans-serif' }}>
                    <div className=' md:hidden lg:hidden bg-blue-50 rounded-lg mx-[3%] h-12 mt-6 px-[5%] flex justify-between items-center'>
                        <div className='text-[1.5em] ' onClick={showSidebar}><BsThreeDotsVertical /></div>
                        <h1>Transfer</h1>
                    </div>

                    <div className='bg-blue-100 rounded-lg mx-[3%] h-20 mt-3 md:mt-6 lg:mt-6 px-[5%] flex justify-between sm:text-[1.3em]  md:text-[2em] lg:text-[2em] items-center text-blue-800 mb-8'>
                        <p>Balance:</p>
                        <p>{userBal}</p>
                    </div>

                    <div className=''>
                        <label htmlFor="accountNo" className='text-[1.6em] sm:text-[1.3em] ms-[5%] text-blue-500 '>Account Number:</label>
                        <input type="number" id='accountNo' placeholder='××××××××××' onChange={getReceiver}
                            className='transaccountNo w-[90%] ms-[5%] mt-3 rounded h-[3.1rem] bg-blue-50 px-5 border-2 border-blue-300 focus:border-blue-500 focus:outline-none' />
                        <div className='bg-blue-50 border-t-2 w-[90%] ms-[5%] h-[2.3em] mt-2 border-t-blue-300 rounded-t-xl mb-4 px-[5%] text-sm py-1 text-blue-500'>{mgs}</div>

                        <label htmlFor="accountNo" className='text-[1.6em] sm:text-[1.3em]  ms-[5%] text-blue-500 '>Amount:</label>
                        <input type="number" id='amount' placeholder='0' onChange={transacValidator}
                            className='transAmount mt-3 w-[90%] ms-[5%] rounded h-[3.1rem] bg-blue-50 px-5 border-2 border-blue-300 focus:border-blue-500 focus:outline-none' />
                        <div className='bg-blue-50 border-t-2 w-[90%] ms-[5%] h-[2.3em] mt-2 border-t-blue-300 rounded-t-xl px-[5%] text-sm py-1 text-blue-500'>Total charge: {mgs2}</div>
                        <button onClick={showConfirmination} className='h-[2.4em] bg-blue-600 w-[30%] ms-[35%] mt-4 text-[1em] font-[600] text-white '>Send</button>
                    </div>
                </div>

                <Rightbar />
                <div id='confirmination' className='absolute top-0 w-full hidden'>
                    <div className=" h-[100vh] w-full flex justify-center items-center" style={{ backgroundColor: "rgba(0, 0, 0, 0.200)" }}>
                        <div className='bg-white w-[80%] md:w-[40%] lg:w-[40%] h-[50%] rounded-lg p-7 mt-[-8%] shadow-lg relative '>
                            <p className=' text-xl md:text-3xl lg:text-3xl'>Are you sure you want to send <span>{amount.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}</span> to {mgs}?</p>
                            <div className='text-[1em] md:text-lg lg:text-lg mt-4'>
                                <p><b>Receiver name: </b>{mgs}</p>
                                <p><b>Receiver email: </b>{receiver}</p>
                                <p><b>Total charge: </b>{mgs2}</p>
                            </div>
                            <div className='flex gap-4 justify-end w-full absolute bottom-6 right-4'>
                                <button className='bg-slate-200 w-[35%] h-9 rounded' onClick={cancelConfirmination}>Cancel</button>
                                <button className='bg-blue-700 w-[35%] h-9 rounded text-white hover:bg-blue-800 ' onClick={sendMoney}>Continue</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div id='loader' style={{ backgroundColor: "rgba(0, 0, 0, 0.100)", display: "none" }} className='absolute top-0 w-full h-[100vh] flex justify-center items-center'>
                    <div className="spinner2"></div>
                </div>
            </section>
        </>
    )
}

export default Transfer 