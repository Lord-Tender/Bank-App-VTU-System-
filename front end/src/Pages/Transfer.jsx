import React, { useEffect, useState } from 'react'
import Siderbar from '../Components/Siderbar'
import Rightbar from '../Components/Rightbar'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../assets/Styles/pages.css'

const Transfer = () => {
    let navigate = useNavigate()
    const [userId, setuserId] = useState("")
    const [user, setuser] = useState("")
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

    const [mgs, setmgs] = useState("Enter account number")
    const [mgs2, setmgs2] = useState("Enter amount")
    const [receiver, setreceiver] = useState(false)
    const [amount, setamount] = useState(false)
    const getReceiver = (e) => {
        let value = e.target.value
        if (value.length === 10) {
            const url = 'http://localhost:5000/user/intra_transfer/get_receiver'
            axios.post(url, { accountNo: e.target.value })
                .then((res) => {
                    setmgs(res.data.name)
                console.log(validate());
                setreceiver(res.data.userEmail)
                })
                .catch((err) => {
                console.log(validate());
                setmgs(err.response.data.mgs)
                    setreceiver(false)
                })
        } else {
                console.log(validate());
                setmgs("Must be 10 digits")
            setreceiver(false)
        }
    }

    const transacValidator = (e) => {
        const url = 'http://localhost:5000/user/intra_transfer/validate'
        axios.post(url, { sender: user.emailInfo.email, amount: e.target.value })
            .then((res) => {
                setamount(res.data.totalCharge)
                setmgs2(res.data.totalCharge)
                console.log(validate());
            })
            .catch((err) => {
                console.log(validate());
                setmgs2(err.response.data.mgs)
                setamount(false)
            })
    }

    const validate = () => {
        if (receiver != false && amount != false) {
            return true
        }else{
            return false
        }
    }

    const sendMoney = () => {
        console.log(receiver, amount);
    }

    return (
        <>
            <section className='flex relative w-full'>
                <Siderbar />

                {/* Body  */}
                <div className='w-full lg:w-[60%] md:w-[60%] static lg:absolute  md:fixed left-[20%] '>
                    <div className='bg-blue-100 rounded-lg mx-[3%] h-20 mt-6 px-[5%] flex justify-between text-[2em] items-center text-blue-800 mb-8'>
                        <p>Balance:</p>
                        <p>{user.accountBal}</p>
                    </div>

                    <div className=''>
                        <label htmlFor="accountNo" className='text-[1.6em] ms-[5%] text-blue-500 '>Account Number:</label>
                        <input type="number" id='accountNo' placeholder='××××××××××' onChange={getReceiver}
                            className='transaccountNo w-[90%] ms-[5%] mt-3 rounded-3xl h-[3.1rem] bg-blue-50 px-5 border-2 border-blue-300 focus:border-blue-500 focus:outline-none' />
                        <div className='bg-blue-50 border-t-2 w-[90%] ms-[5%] h-[2.3em] mt-2 border-t-blue-300 rounded-t-xl mb-4 px-[5%] text-sm py-1 text-blue-500'>{mgs}</div>

                        <label htmlFor="accountNo" className='text-[1.6em] ms-[5%] text-blue-500 '>Amount:</label>
                        <input type="number" id='amount' placeholder='0' onChange={transacValidator}
                            className='transAmount mt-3 w-[90%] ms-[5%] rounded-3xl h-[3.1rem] bg-blue-50 px-5 border-2 border-blue-300 focus:border-blue-500 focus:outline-none' />
                        <div className='bg-blue-50 border-t-2 w-[90%] ms-[5%] h-[2.3em] mt-2 border-t-blue-300 rounded-t-xl px-[5%] text-sm py-1 text-blue-500'>Total charge: {mgs2}</div>
                        <button onClick={sendMoney} className='h-[2.7em] bg-blue-600 w-[30%] ms-[35%] mt-4 rounded text-[1.2em] font-[600] text-white '>Send</button>
                    </div>
                </div>

                <Rightbar />
            </section>
        </>
    )
}

export default Transfer 