import React from 'react'
import Siderbar from '../Components/Siderbar'
import Rightbar from '../Components/Rightbar'

const Airtime = () => {
    return (
        <>
            <section id='section' className="mainSection flex relative w-full " >

                <Siderbar />

                {/* Main body */}

                <div className='w-full lg:w-[60%] md:w-[60%] h-screen bg-gray-100 static lg:absolute px-7 sm:px-3 md:fixed left-[20%] ' style={{ fontFamily: '"Josefin Sans", sans-serif' }}>

                    <div className='w-full bg-white h-[6em] my-3 rounded-xl'>

                    </div>
                </div>


                <Rightbar />

            </section>
        </>
    )
}

export default Airtime