import React, { useEffect, useState } from 'react'
import AdminSidebar from '../Components/AdminSidebar'
import axios from 'axios'
import { RxCross2 } from 'react-icons/rx'
import toast from 'react-hot-toast'

const AdminUsers = () => {
    const [user, setuser] = useState("")
    const [searchUser, setsearchUser] = useState("")
    const [errorMsg, seterrorMsg] = useState("Loading . . .")
    const [userToCredit, setuserToCredit] = useState("")
    const [userToDebit, setuserToDebit] = useState("")
    useEffect(() => {
        const userAuth = () => {
            let token = localStorage.getItem('admin_token')
            let url = 'http://localhost:5000/admin/page_auth'

            axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
            }).then((res) => {
            })
                .catch((err) => {
                    // navigate("/admin/login")
                })
        }
        userAuth()
        getUser()
    }, [])

    const getUser = () => {
        axios.get('http://localhost:5000/admin/get_user')
            .then((res) => {
                console.log(res);
                setuser(res.data.allUsers)
            })
            .catch((err) => {
                console.log(err);
                seterrorMsg("An error occurred, Please check your internet connection and refresh.")
            })
    }

    const initCreditUser = (email) => {
        document.getElementById('creditUser').style.display = "flex"
        setuserToCredit(email)
    }

    const creditUser = () => {
        let amount = document.getElementById("amountToCredit").value
        console.log(amount, userToCredit);
        let url = 'http://localhost:5000/admin/credit_user'
        axios.post(url, { userEmail: userToCredit, amount, reason: "From Admin" })
            .then((res) => {
                console.log(res);
                document.getElementById("amountToCredit").value = ""
                toast.success("User credited successfully!")
                setTimeout(() => {
                    document.getElementById('creditUser').style.display = "none"
                }, 2000);
            })
            .catch((err) => {
                console.log(err);
                toast.error('Something went wrong')
            })
    }

    const initDebitUser = (email) => {
        document.getElementById('debitUser').style.display = "flex"
        setuserToDebit(email)
    }

    const debitUser = () => {
        let amount = document.getElementById("amountToDebit").value
        console.log(amount, userToCredit);
        let url = 'http://localhost:5000/admin/debit_user'
        axios.post(url, { userEmail: userToDebit, amount })
            .then((res) => {
                console.log(res);
                document.getElementById("amountToCredit").value = ""
                toast.success("User debited successfully!")
                setTimeout(() => {
                    document.getElementById('debitUser').style.display = "none"
                }, 2000);
            })
            .catch((err) => {
                console.log(err);
                toast.error('Something went wrong')
            })
    }

    return (
        <>
            <section style={{ width: "100%", height: "100% !important", display: "flex", backgroundColor: "whitesmoke" }}>

                <div className='relative w-[20%] sm:absolute top-0 sm:w-[80%] ' id='sideBarDiv'>
                    <AdminSidebar />
                </div>

                <div className='sm:w-[100%] w-[80%] px-[2.5em] sm:px-[1em] h-screen pb-10' style={{ fontFamily: '"Josefin Sans", sans-serif' }}>

                    {/* Search section */}

                    <div className='w-full bg-white h-28 my-3 rounded-xl'>
                        <h1 className='text-xl text-center pt-3'>Search User</h1>
                        <div className='flex justify-center items-center  mt-3 gap-[5%] px-[5%] '>
                            <input placeholder='Search by email, name or ID' type="text" className='w-[70%] border-2 border-blue-500 rounded-3xl h-10 p-3.5 sm:text-sm' />
                            <button className='w-[15%] bg-blue-500 h-10 rounded text-white sm:text-sm sm:w-[25%] '>Search</button>
                        </div>
                    </div>

                    {/* List of all users */}

                    <div className='w-full bg-white h-[30em] my-3 border-2 rounded-xl overflow-auto'>
                        <h1 className='text-xl text-center pt-3'>All user</h1>
                        <div className='allUser'>
                            <div>

                            {
                                user ? (
                                    <table id='userTable'>
                                        <thead>
                                            <th>Full name</th>
                                            <th>User email</th>
                                            <th>Account Balance</th>
                                            <th>Actions</th>
                                        </thead>
                                        <tbody>
                                            {
                                                user.map(item => (
                                                    <tr>
                                                        <td><span>{item.firstName}</span> <span>{item.lastName}</span></td>
                                                        <td>{item.emailInfo.email}</td>
                                                        <td>{item.accountBal.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}</td>
                                                        <td><button onClick={()=>initDebitUser(item.emailInfo.email)}>Debit</button> <button onClick={()=>initCreditUser(item.emailInfo.email)}>Credit</button></td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                ) : (
                                    <div className='mt-[10%] text-center'>{errorMsg}</div>
                                )
                            }
                            </div>
                            <div className='hidden'>
                            {
                                searchUser ? (
                                    <table id='searchUserTable'>
                                        <thead>
                                            <th>Full name</th>
                                            <th>User email</th>
                                            <th>Account Balance</th>
                                            <th>Actions</th>
                                        </thead>
                                        <tbody>
                                            {
                                                searchUser.map(item => (
                                                    <tr>
                                                        <td><span>{item.firstName}</span> <span>{item.lastName}</span></td>
                                                        <td>{item.emailInfo.email}</td>
                                                        <td>{item.accountBal.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}</td>
                                                        <td><button onClick={()=>initDebitUser(item.emailInfo.email)}>Debit</button> <button onClick={()=>initCreditUser(item.emailInfo.email)}>Credit</button></td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                ) : (
                                    <div className='mt-[10%] text-center'>No result found!</div>
                                )
                            }
                            </div>
                        </div>
                    </div>
                </div>

                {/* Credit User interface */}

                <div id='creditUser' className='absolute top-0 w-full h-full justify-center items-center hidden  ' style={{ backgroundColor: "rgba(0, 0, 0, 0.548)" }}>
                    <div className='bg-white sm:w-[85%] w-[45%] h-[19em] rounded-lg px-10 pt-2 relative'>
                        <div onClick={() => document.getElementById('creditUser').style.display = "none"}
                            className='font-bold text-[2em] text-white cursor-pointer absolute top-[-1em] right-0 '><RxCross2 /></div>
                        <h2 className='text-2xl text-center font-bold text-blue-700'>Credit User</h2>
                        <p className='text-xl my-3'>How much do you want to credit user?</p>
                        <label htmlFor="amountToCredit" className='font-bold'>Amount:</label>
                        <input type="text" id='amountToCredit' className='block w-full h-10 border-2 border-blue-600 p-3 rounded focus:outline-none placeholder:text-blue-400' placeholder='0' />
                        <button className='focus:bg-blue-400 bg-blue-600 w-[50%] h-10 text-white rounded mt-5 ' onClick={creditUser}>Credit</button>
                    </div>
                </div>

                {/* Debit User interface */}

                <div id='debitUser' className='absolute top-0 w-full h-full justify-center items-center hidden  ' style={{ backgroundColor: "rgba(0, 0, 0, 0.548)" }}>
                    <div className='bg-white sm:w-[85%] w-[45%] h-[19em] rounded-lg px-10 pt-2 relative'>
                        <div onClick={() => document.getElementById('debitUser').style.display = "none"}
                            className='font-bold text-[2em] text-white cursor-pointer absolute top-[-1em] right-0 '><RxCross2 /></div>
                        <h2 className='text-2xl text-center font-bold text-blue-700'>Debit User</h2>
                        <p className='text-xl my-3'>How much do you want to debit user?</p>
                        <label htmlFor="amountToCredit" className='font-bold'>Amount:</label>
                        <input type="text" id='amountToDebit' className='block w-full h-10 border-2 border-blue-600 p-3 rounded focus:outline-none placeholder:text-blue-400' placeholder='0' />
                        <button className='focus:bg-blue-400 bg-blue-600 w-[50%] h-10 text-white rounded mt-5 ' onClick={debitUser}>Debit</button>
                    </div>
                </div>

            </section>
        </>
    )
}

export default AdminUsers