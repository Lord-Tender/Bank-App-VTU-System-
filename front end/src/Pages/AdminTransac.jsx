import React, { useEffect, useState } from 'react'
import AdminSidebar from '../Components/AdminSidebar'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import "../assets/Styles/admin.css"

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
                    navigate("/admin/login")
                })
        }
        userAuth()
    }, [])

    const [transactionId, settransactionId] = useState("")
    const [result, setresult] = useState("")
    const [errorMsg, seterrorMsg] = useState("Search transaction with ID")
    const [transacType, settransacType] = useState("")

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
                    setresult(res.data.transactionDetail)
                    settransacType(res.data.transactionType)
                    document.getElementById('loader').style.display = 'none';
                    document.getElementById('buttonText').style.display = 'block';
                })
                .catch((err) => {
                    setresult("")
                    document.getElementById('loader').style.display = 'none';
                    document.getElementById('buttonText').style.display = 'block';
                    seterrorMsg("No transaction found!")
                })
        }
    }

    const refundDebit = () => {
        document.getElementById('loader3').style.display = 'block';
        document.getElementById('buttonText3').style.display = 'none';
        let url = 'http://localhost:5000/admin/credit_user'
        axios.post(url, { userEmail: result.transactor, amount: result.amount.split("₦")[1], reason: "Refunded" })
            .then((res) => {
                toast.success("Refund made successfully")
                document.getElementById('loader3').style.display = 'none';
                document.getElementById('buttonText3').style.display = 'block';
            })
            .catch((err) => {
                document.getElementById('loader3').style.display = 'none';
                document.getElementById('buttonText3').style.display = 'block';
                toast.error("An error occured")
            })
    }

    const reverseCredit = () => {
        document.getElementById('loader2').style.display = 'block';
        document.getElementById('buttonText2').style.display = 'none';
        let url = 'http://localhost:5000/admin/debit_user'
        axios.post(url, { userEmail: result.transactor, amount: result.amount.split("₦")[1] })
            .then((res) => {
                toast.success("Fund reversed successfully")
                document.getElementById('loader2').style.display = 'none';
                document.getElementById('buttonText2').style.display = 'block';
            })
            .catch((err) => {
                toast.error("An error occurred")
                document.getElementById('loader2').style.display = 'none';
                document.getElementById('buttonText2').style.display = 'block';
            })
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
                        {result ? <div className='h-[90%] w-[90%] border-2 border-[whitesmoke] rounded-xl '>
                            <table className='h-full w-full '>
                                <tr>
                                    <td>Transaction Type:</td>
                                    <td>{`${result.transactionType} (${transacType == "Credit" ? "Credit" : "Debit"})`}</td>
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
                                    <td>{transacType == "Credit" ? (<button className='bg-red-600 w-28 h-[2em] rounded text-white' onClick={reverseCredit}>
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
                                        <p id='buttonText2'>Reverse</p>
                                    </button>) : (<button className='bg-blue-800 w-28 h-[2em] rounded text-white' onClick={refundDebit}>
                                        <div className="spinner center" id='loader3'>
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
                                        <p id='buttonText3'>Refund</p>
                                    </button>)}</td>
                                </tr>
                            </table>
                        </div> : <div> {errorMsg} </div>}
                    </div>
                </div>
            </section>
        </>
    )
}

export default AdminTransac