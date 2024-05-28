import React, { useEffect, useState } from 'react'
import AdminSidebar from '../Components/AdminSidebar'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const AdminTransac = () => {

    let navigate = useNavigate()
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
    }, [])

    const [transactionId, settransactionId] = useState("")
    const [result, setresult] = useState("")
    const [errorMsg, seterrorMsg] = useState("Search transaction with ID")

    const searchTransac = () => {
        document.getElementById('loader').style.display = 'block';
        document.getElementById('buttonText').style.display = 'none';
        if (transactionId === "") {
            toast.error("Input a transaction ID")
            document.getElementById('loader').style.display = 'none';
            document.getElementById('buttonText').style.display = 'block';
        } else {
            let url = 'http://localhost:5000/admin/transaction/get_one'
            axios.post(url, { transactionId })
                .then((res) => {
                    console.log(res);
                    setresult(res.data.transactionDetail)
                    document.getElementById('loader').style.display = 'none';
                    document.getElementById('buttonText').style.display = 'block';
                })
                .catch((err) => {
                    console.log(err);
                    document.getElementById('loader').style.display = 'none';
                    document.getElementById('buttonText').style.display = 'block';
                    seterrorMsg("No transaction found!")
                })
        }
    }

    return (
        <>
            <section style={{ width: "100%", height: "100%", display: "flex" }} >

                <div className='relative w-[20%] sm:absolute top-0 sm:w-[80%] ' id='sideBarDiv'>
                    <AdminSidebar />
                </div>

                <div className='sm:w-[100%] w-[80%] px-[2.5em] sm:px-[1em] h-screen pb-10' style={{ backgroundColor: "whitesmoke", fontFamily: '"Josefin Sans", sans-serif' }}>

                    {/* Search bar */}
                    <div className='w-full bg-white h-28 my-3 rounded-xl'>
                        <h2 className='text-center text-lg pt-1.5'>Search transactions</h2>
                        <div className='flex justify-center gap-5 mt-3 '>
                            <input type="text" placeholder='Transaction ID'
                                className='w-[50%] border-2 border-blue-950 bg-blue-50 rounded h-10 focus:outline-none px-3'
                                onChange={(e) => { settransactionId(e.target.value) }} />
                            <button className='bg-blue-600 text-white w-[15%] rounded focus:outline-none ' onClick={searchTransac}>
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
                                <p id='buttonText'>Search</p>
                            </button>
                        </div>
                    </div>

                    {/* Search result */}
                    <div className='w-full bg-white h-96 my-3 rounded-xl flex justify-center items-center'>
                        { result ? <div className='h-[90%] w-[90%]  '>
                            <table className='h-full w-full border-2 border-blue-800 '>
                                <tr className='p-20'>
                                    <td>Transaction Type:</td>
                                    <td>{result.transactionType}</td>
                                </tr>
                                <tr>
                                    <td>Transactor Email:</td>
                                    <td>{result.transactor}</td>
                                </tr>
                                <tr>
                                    <td>Transaction ID:</td>
                                    <td>{result.transactionId}</td>
                                </tr>
                                <tr>
                                    <td>Amount:</td>
                                    <td>{result.amount}</td>
                                </tr>
                                <tr>
                                    <td>Date:</td>
                                    <td>{result.date}</td>
                                </tr>
                                <tr>
                                    <td>Action</td>
                                    <td>{result.date}</td>
                                </tr>
                            </table>
                        </div> : <div> { errorMsg } </div> }
                    </div>
                </div>
            </section>
        </>
    )
}

export default AdminTransac