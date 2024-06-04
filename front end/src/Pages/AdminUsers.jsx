import React, { useEffect } from 'react'
import AdminSidebar from '../Components/AdminSidebar'

const AdminUsers = () => {

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
                toast.success("Welcome Back!!!")
            })
            .catch((err) => {
                // navigate("/admin/login")
            })
        }
        userAuth()
    }, [])
    
    return (
        <>
            <section style={{ width: "100%", height: "100%", display: "flex" }}>

                <div className='relative w-[20%] sm:absolute top-0 sm:w-[80%] ' id='sideBarDiv'>
                    <AdminSidebar />
                </div>

                <div className='sm:w-[100%] w-[80%] px-[2.5em] sm:px-[1em] h-screen pb-10' style={{ backgroundColor: "whitesmoke", fontFamily: '"Josefin Sans", sans-serif' }}>
                    
                    {/* Select Service */}
                    <div className='w-full bg-white h-28 my-3 rounded-xl'>
                        <h1 className='text-xl text-center'>Search User</h1>
                    </div>

                </div>

            </section>
        </>
    )
}

export default AdminUsers