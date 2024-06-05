import React, { useEffect, useState } from 'react'
import AdminSidebar from '../Components/AdminSidebar'
import axios from 'axios'

const AdminUsers = () => {
    const [user, setuser] = useState("")
    const [errorMsg, seterrorMsg] = useState("Loading . . .")
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
                            <input placeholder='Search by email, name or ID' type="text" className='w-[70%] border-2 border-blue-500 rounded-3xl h-10 p-3.5 sm:text-sm'/>
                            <button className='w-[15%] bg-blue-500 h-10 rounded text-white sm:text-sm sm:w-[25%] '>Search</button>
                        </div>
                    </div>

                    {/* List of all users */}

                    <div className='w-full bg-white h-[30em] my-3 border-2 rounded-xl overflow-auto'>
                        <h1 className='text-xl text-center pt-3'>All user</h1>
                        <div className='allUser'>
                            {
                                user ? (
                                    <table>
                                        <thead>
                                            <th>Full name</th>
                                            <th>User email</th>
                                            <th>Account Balance</th>
                                            <th>Actions</th>
                                        </thead>
                                        <tbody>
                                            {
                                                user.map(item =>(
                                                    <tr>
                                                        <td><span>{item.firstName}</span> <span>{item.lastName}</span></td>
                                                        <td>{item.emailInfo.email}</td>
                                                        <td>{item.accountBal}</td>
                                                        <td><img src={item.photoUrl} alt="" width="30px" /></td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                ) : (
                                    <div className='mt-[10%] '>Loading ...</div>
                                )
                            }
                        </div>
                    </div>

                </div>

            </section>
        </>
    )
}

export default AdminUsers