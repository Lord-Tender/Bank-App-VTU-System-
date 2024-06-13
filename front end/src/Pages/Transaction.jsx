import React, { useEffect, useState } from 'react'
import Siderbar from '../Components/Siderbar'
import Rightbar from '../Components/Rightbar'
import axios from 'axios'
import { FaMoneyBillTransfer } from 'react-icons/fa6'
import { TbRecharging } from 'react-icons/tb'
import { MdOutlineDataSaverOn } from 'react-icons/md'

const Transaction = () => {
    const [user, setuser] = useState("")
    const [userTransaction, setuserTransaction] = useState("")
    const [message, setMessage] = useState("Loading . . .")

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
        let url = 'http://localhost:5000/user/transaction'
        axios.post(url, { email })
            .then((response) => {
                console.log(response);
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

    const check = () => {
        console.log(userTransaction)
    }

    const transactionIcon = (type, dc) => {
        if (type == "Intra_Transaction") {
            return <FaMoneyBillTransfer />
        }
        if (type == "Airtime") {
            return <TbRecharging />
        }
        if (type == "Data") {
            return <MdOutlineDataSaverOn />
        }
    }

    const transactionText = (type, dc, FR) => {
        console.log(type, dc, FR);
        if (type == "Intra_Transaction" && dc == "Debit") {
            return `Transfer to ${FR}`
        }
        if (type == "Intra_Transaction" && dc == "Credit") {
            return `Transfer from ${FR}`
        }
    }


    return (
        <>
            <section id='section' className="mainSection flex relative w-full " >
                <Siderbar />

                {/* MAin body */}

                <div className='w-full lg:w-[60%] md:w-[60%] h-screen bg-gray-100 static lg:absolute px-7 md:fixed left-[20%] ' style={{ fontFamily: '"Josefin Sans", sans-serif' }}>

                    {/* Search Transactions */}

                    <div className='w-full bg-white h-28 my-3 rounded-xl'>
                        <h2 className='text-center text-lg pt-1.5'>Search transactions</h2>
                        <div className='flex justify-center gap-5 mt-3 '>
                            <input type="text" placeholder='Transaction ID'
                                className='w-[50%] border-2 border-blue-950 bg-blue-50 rounded h-10 focus:outline-none px-3'
                            />
                            <button onClick={check} className='bg-blue-600 text-white w-[15%] rounded focus:outline-none ' >
                                Search
                            </button>
                        </div>
                    </div>

                    {/* Transaction UI */}

                    <div className='bg-white rounded-lg h-[30em] w-full '>
                        {
                            userTransaction ? (
                                <div>
                                    <h1 className='text-xl text-center py-3'>Transactions</h1>
                                    <div>
                                        {userTransaction.length > 0 ?
                                            userTransaction.map((item) => (
                                                <div>
                                                    <div className='text-blue-800'>{transactionIcon(item.transactionType)}</div>
                                                    <div>
                                                        <p>{transactionText(item.transactionType, item.DC, item.Recipient ? item.Recipient : item.Creditor)}</p>
                                                        <p>{item.date}</p>
                                                    </div>
                                                    <div></div>
                                                </div>
                                            )) : <div className='text-center mt-[15%] '>{message}</div>
                                        }
                                    </div>
                                </div>
                            ) : (
                                <div>{message}</div>
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