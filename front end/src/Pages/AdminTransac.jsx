import React from 'react'
import AdminSidebar from '../Components/AdminSidebar'

const AdminTransac = () => {
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
                             className='w-[50%] border-2 border-blue-950 bg-blue-50 rounded h-10 focus:outline-none px-3' />
                            <button className='bg-blue-600 text-white w-[15%] rounded '>search</button>
                        </div>
                    </div>

                    {/* Search result */}
                    <div className='w-full bg-white h-96 my-3 rounded-xl'>

                    </div>
                </div>
            </section>
        </>
    )
}

export default AdminTransac