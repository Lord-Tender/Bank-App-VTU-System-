import React, { useEffect, useState } from 'react'
import Siderbar from '../Components/Siderbar'
import Rightbar from '../Components/Rightbar'
import axios from 'axios'
import { FaHospitalUser, FaMoneyBillTransfer } from 'react-icons/fa6'
import { TbRecharging } from 'react-icons/tb'
import { MdOutlineDataSaverOn } from 'react-icons/md'
import { BsThreeDotsVertical } from 'react-icons/bs'

const Transaction = () => {
    const [user, setuser] = useState("")
    const [userTransaction, setuserTransaction] = useState("")
    const [message, setMessage] = useState("Loading . . .")

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
            getUserTransaction(res.data.userResult.emailInfo.email)
            if (res.data.emailVerified == false) {
                navigate('/user/not-verify')
            }
        })
            .catch((err) => {
                console.log(err);
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


    const getUserTransaction = (email) => {
        let url = 'https://bank-app-vtu-system.onrender.com/user/transaction'
        axios.post(url, { email })
            .then((response) => {
                let theData = []
                let credit = response.data.creditTransac
                let debit = response.data.debitTransac
                if (credit) {
                    theData = theData.concat(credit);
                }
                if (debit) {
                    theData = theData.concat(debit);
                }
                setuserTransaction(theData.sort((a, b) => new Date(b.date) - new Date(a.date)))
                setMessage("No Transaction yet!")
            })
            .catch((err) => {
                setMessage("An error occurred, please refresh this page!")
                console.log("Error" + err);
            })
    }

    const transactionIcon = (type, dc) => {
        if (type == "Intra_Transfer") {
            return <FaMoneyBillTransfer />
        }
        if (type == "Airtime") {
            return <TbRecharging />
        }
        if (type == "Data") {
            return <MdOutlineDataSaverOn />
        }
        if (type == "Admin") {
            return <FaHospitalUser />
        }

    }

    const transactionText = (type, dc, FR) => {
        if (type == "Intra_Transfer" && dc == "Debit") {
            return `Transfer to ${FR}`
        }
        if (type == "Intra_Transfer" && dc == "Credit") {
            return `Transfer from ${FR}`
        }
        if (type == "Admin" && dc == "Credit") {
            return `${FR} (From Admin)`
        }
        if (type == "Admin" && dc == "Debit") {
            return `By ${FR}`
        }
    }

    const transactionAmount = (DC, amount) => {
        if (DC == "Debit") {
            return `-${Number(amount).toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}`
        }
        if (DC == "Credit") {
            return `+${Number(amount).toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}`
        }
    }

    const displayDate = (date) => {
        let nowDate = new Date(date)
        let localTime = nowDate.toLocaleString()
        return localTime
    }


    return (
        <>
            <section id='section' className="mainSection flex relative w-full " >
                <Siderbar />

                {/* Main body */}

                <div className='w-full lg:w-[60%] md:w-[60%] h-screen bg-gray-100 static lg:absolute px-7 sm:px-3 md:fixed left-[20%] ' style={{ fontFamily: '"Josefin Sans", sans-serif' }}>
                    <div className=' md:hidden lg:hidden bg-blue-200 rounded-lg h-12 mt-6 px-[5%] flex justify-between items-center'>
                        <div className='text-[1.5em] ' onClick={()=>{document.getElementById('sidebar').style.display = "block"}}><BsThreeDotsVertical /></div>
                        <h1>Transaction</h1>
                    </div>

                    {/* Search Transactions */}

                    <div className='w-full bg-white h-[6em] my-3 rounded-xl'>
                        <h2 className='text-center text-[1em] pt-1'>Search transactions</h2>
                        <div className='flex justify-center gap-5 sm:gap-3 mt-2 '>
                            <input type="text" placeholder='Transaction ID'
                                className='w-[50%] sm:w-[60%] border border-blue-400 focus:border-blue-800 focus:outline-blue-200 focus:outline-offset-0 bg-slate-50 rounded h-9 focus:outline-none px-3 placeholder:text-[0.7em] '
                            />
                            <button className='bg-blue-400 focus:bg-blue-500 text-white w-[15%] rounded-[2px] focus:outline-none text-[0.9em] sm:w-[20%] ' >
                                Search
                            </button>
                        </div>
                    </div>

                    {/* Transaction UI */}

                    <div className='bg-white rounded-lg h-[32em] w-full overflow-auto shadow-lg '>
                        {
                            userTransaction ? (
                                <div>
                                    <h1 className='text-md text-center pt-1.5 text-blue-800 '>Transactions</h1>
                                    <div>
                                        {userTransaction.length > 0 ?
                                            userTransaction.map((item, i) => (
                                                <div className='flex justify-between my-2.5 mx-[2%] h-14 bg-slate-100 py-1 px-[3%] rounded-xl items-center border'>
                                                    <div className='w-[20%] sm:w-[17%] '>
                                                        <div className='text-blue-500 bg-white rounded-[100%] h-[42px] w-[42px] flex justify-center items-center text-[1.3em] '>{transactionIcon(item.transactionType)}</div>
                                                    </div>
                                                    <div className='w-[55%] text-[14px] sm:text-[11px] sm:w-[50%]'>
                                                        <p>{transactionText(item.transactionType, item.DC, item.Recipient ? item.Recipient : item.Creditor)}</p>
                                                        <p>{displayDate(item.date)}</p>
                                                    </div>
                                                    <div className='w-[25%] text-[14px] sm:text-[11px] sm:w-[33%] '>
                                                        <p>{transactionAmount(item.DC, item.amount)}</p>
                                                        <p className={item.DC == "Credit" ? 'ms-3 text-[16px] text-blue-600' : 'ms-3 text-[16px] text-red-600'}>{item.DC}</p>
                                                    </div>
                                                </div>
                                            )) : <div className='text-center mt-[15%] '>{message}</div>
                                        }
                                    </div>
                                </div>
                            ) : (
                                <div className='text-center pt-[30%] '>{message}</div>
                            )
                        }
                    </div>
                </div>


                <Rightbar />
            </section>
        </>
    )
}

export default Transaction