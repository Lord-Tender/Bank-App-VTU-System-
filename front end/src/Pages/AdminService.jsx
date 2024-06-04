import React, { useEffect, useState } from 'react'
import AdminSidebar from '../Components/AdminSidebar'
import '../assets/Styles/admin.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { RxCross2 } from 'react-icons/rx'
import { useFormik } from 'formik'
import * as yup from 'yup';

const AdminService = () => {
    let navigate = useNavigate()
    const [service, setservice] = useState("")
    const [airtimeFetched, setairtimeFetched] = useState("")
    const [dataPlan, setdataPlan] = useState("")

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
                navigate("/admin/login")
            })
                .catch((err) => {
                })
        }
        userAuth()
        getSettings()
        getDataPlan()
    }, [])

    const getSettings = () => {
        const url = "http://localhost:5000/admin/get_settings"
        axios.get(url)
            .then((res) => {
                setairtimeFetched(res.data.settings[0].airtimePrice)
            })
            .catch((err) => {
            })
    }

    const getDataPlan = () => {
        console.log("Getting plans ....");
        const url = "http://localhost:5000/admin/get_plan"
        axios.get(url)
            .then((res) => {
                console.log(res);
                setdataPlan(res.data.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const formik = useFormik({
        initialValues: {
            serverId: "",
            dataPrice: "",
            validationPeriod: "",
            dataSize: ""
        },
        validationSchema: yup.object({
            serverId: yup.number().required("Server Id is required"),
            dataPrice: yup.number().required("Price is required"),
            validationPeriod: yup.string().required("Valid for is required"),
            dataSize: yup.string().required("Data size is required")
        }),
        onSubmit: (values) => {
            let networkId = document.getElementById('network').value
            if (!networkId) {
                toast.error("Please select a network")
            } else {
                console.log(values, networkId);
                const url = "http://localhost:5000/admin/add_dataplan"
                const data = {
                    network_id: networkId,
                    server_id: values.serverId,
                    price: values.dataPrice,
                    valid_period: values.validationPeriod,
                    byte: values.dataSize
                }
                axios.post(url, data)
                    .then((res) => {
                        console.log(res);
                        toast.success("Added successfully!")
                        formik.resetForm()
                    })
                    .catch((err) => {
                        console.log(err);
                        toast.error("An error occured")
                    })
            }
        }
    })

    const editAirtime = () => {
        const url = "http://localhost:5000/admin/settings/edit"
        let newValue = document.getElementById("airtimePercentage").value
        console.log(newValue);
        axios.post(url, { whatToEdit: "airtimePrice", newValue })
            .then((res) => {
                console.log(res);
                toast.success("Change saved successfully.")
                setTimeout(() => {
                    window.location.reload()
                }, 1500);
            })
            .catch((err) => {
                console.log(err);
                toast.error("An error occured")
            })
    }

    const addNetwork = () => {
        let network_id = document.getElementById('networkId').value
        let network_name = document.getElementById('networkName').value
        if (dataPlan.length == 4) {
            toast.error("You added upto 4 network already")
        } else if (network_id == "" || network_name == "") {
            toast.error("Spaces can't be empty")
        } else {
            const url = "http://localhost:5000/admin/add_network"
            axios.post(url, { network_id, network_name })
                .then((res) => {
                    console.log(res);
                    toast.success("Network added successfully.")
                    toast.loading("Reloading")
                    setTimeout(() => {
                        window.location.reload()
                    }, 1500);
                })
                .catch((err) => {
                    console.log(err);
                    let errorMsg = err.response.data.msg
                    if (err.response.data.error.code == 11000) {
                        toast.error("Id or name already exist")
                    } else if (errorMsg) {
                        toast.error(`${errorMsg}`)
                    } else {
                        toast.error("Unknow network error")
                    }
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

                    {/* Select Service */}
                    <div className='w-full bg-white h-28 my-3 rounded-xl'>
                        <h2 className='text-center text-lg pt-3 text-blue-700'>Select a service to edit</h2>
                        <div className='flex justify-center mt-3 '>
                            <select name="" onChange={(e) => { setservice(e.target.value) }} id="service" className='border-2 border-blue-600 rounded p-2 w-[50%]  text-blue-600 focus:outline-none'>
                                <option value="null" className=''>Select service</option>
                                <option value="airtime">Airtime</option>
                                <option value="data">Data</option>
                            </select>

                        </div>
                    </div>

                    {/* Service settings */}

                    <div className='w-full bg-white h-[29em] my-3 rounded-xl flex justify-center items-center'>
                        {service ? (<div className='w-[95%] h-[100%]'>
                            {service === "airtime" ? (<div className='pt-[3em] '>
                                <h1 className='text-3xl text-center mt-4 text-sky-800 '>Airtime Price</h1>
                                <h2 className='text-[2em] text-red-700 text-center mt-3 sm:text-lg '>Currently set to <span>{airtimeFetched}%</span> Off</h2>
                                <p className='text-center text-lg'>Your user will get <span>{airtimeFetched}%</span> off their airtimes.</p>
                                <button className=' bg-blue-600 w-[30%] h-[2.3em] rounded text-white ms-[35%] mt-7 '
                                    onClick={() => document.getElementById('airtimeEdit').style.display = "flex"}>Edit</button>
                            </div>) : (
                                <div className=''>
                                    <h1 className='text-center text-2xl mt-4'>Data Plan</h1>
                                    <p className='text-center text-lg my-4 sm:text-md'>Here you can add, check and delete data plan available on your app.</p>
                                    <div className='flex flex-col justify-center items-center'>
                                        <table className='w-hf mt-3 bg-[whitesmoke] border '>
                                            <thead>
                                                <tr>
                                                    <th>Network name</th>
                                                    <th>Network Id</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    dataPlan ? (
                                                        dataPlan.map(user => (
                                                            <tr key={user.network_id}>
                                                                <td>{user.network_name}</td>
                                                                <td>{user.network_id}</td>
                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <tr>
                                                            <td>Network Id will show here</td>
                                                            <td>Network name will show here</td>
                                                        </tr>
                                                    )
                                                }
                                            </tbody>
                                        </table>
                                        <button className='bg-blue-700 w-[40%] sm:text-sm text-white h-[2.6em] rounded mt-8 ' onClick={() => { document.getElementById('addNetwork').style.display = "flex" }}>Add network</button>
                                    </div>
                                    <div className='flex justify-center gap-[10%] w-full mt-8 '>
                                        <button className='bg-blue-500 w-[40%] sm:text-sm text-white h-[2.6em] rounded ' onClick={() => document.getElementById('showDataPlan').style.display = "flex"}>Show data plans</button>
                                        <button onClick={() => document.getElementById('addDataPlan').style.display = "flex"}
                                            className='bg-blue-500 w-[40%] sm:text-sm text-white h-[2.6em] rounded '>Add new data plan</button>
                                    </div>
                                </div>
                            )}
                        </div>) : (<div>Select a service to edit.</div>)}
                    </div>

                </div>

                {/* Edit airtime div */}

                <div id='airtimeEdit' className='absolute top-0 w-full h-full justify-center items-center hidden ' style={{ backgroundColor: "rgba(0, 0, 0, 0.548)" }}>
                    <div className='bg-white sm:w-[85%] w-[35%] h-[16em] rounded-lg px-10 pt-2 relative'>
                        <div onClick={() => document.getElementById('airtimeEdit').style.display = "none"}
                            className='font-bold text-[2em] text-white cursor-pointer absolute top-[-1em] right-0 '><RxCross2 /></div>
                        <h3 className='mt-6 font-bold text-lg'>Enter bonus in percentage:</h3>
                        <p>Please enter new value without any sign, Just a number!</p>
                        <input type="number" id='airtimePercentage' className='mt-3 block w-full h-[3em] rounded mb-3 p-3 border-2 border-blue-400 focus:border-blue-500 focus:outline-none ' placeholder='0' />
                        <button onClick={editAirtime} className=' focus:bg-blue-400 bg-blue-600 w-[50%] h-10 text-white rounded mt-5 '>Save</button>
                    </div>
                </div>

                {/* Addnetwork UI */}

                <div id='addNetwork' className='absolute top-0 w-full h-full justify-center items-center hidden ' style={{ backgroundColor: "rgba(0, 0, 0, 0.548)" }}>
                    <div className='bg-white sm:w-[85%] w-[45%] h-[19em] rounded-lg px-10 pt-2 relative'>
                        <div onClick={() => document.getElementById('addNetwork').style.display = "none"}
                            className='font-bold text-[2em] text-white cursor-pointer absolute top-[-1em] right-0 '><RxCross2 /></div>
                        <h2 className='text-2xl text-center font-bold text-blue-700'>Add a new network</h2>
                        <label htmlFor="networkId">Network ID</label>
                        <input type="number" id='networkId' className='block w-full h-10 border-2 border-blue-400 p-3 rounded focus:outline-none mb-3 placeholder:text-blue-400' placeholder='ID' />
                        <label htmlFor="networkName">Network name</label>
                        <input type="text" id='networkName' className='block w-full h-10 border-2 border-blue-400 p-3 rounded focus:outline-none placeholder:text-blue-400' placeholder='Name' />
                        <button className='focus:bg-blue-400 bg-blue-600 w-[50%] h-10 text-white rounded mt-5 ' onClick={addNetwork}>Add</button>
                    </div>
                </div>



                {/* Add data plan ui */}

                <div id='addDataPlan' className='absolute top-0 w-full h-full justify-center items-center hidden  ' style={{ backgroundColor: "rgba(0, 0, 0, 0.548)" }}>
                    <div className='bg-white sm:w-[85%] w-[35%] h-[34em] rounded-lg px-10 pt-2 relative'>
                        <div onClick={() => document.getElementById('addDataPlan').style.display = "none"}
                            className='font-bold text-[2em] text-white cursor-pointer absolute top-[-1em] right-0 '><RxCross2 />
                        </div>

                        <div id='adminAddDataPlan'>
                            <h1>Add new data plan</h1>
                            <form onSubmit={formik.handleSubmit}>
                                <label htmlFor="network">Network</label>
                                <select id='network' >
                                    <option value="">Select network</option>
                                    {
                                        dataPlan ? (
                                            dataPlan.map(item => (
                                                <option key={item.network_id} value={item.network_id}>{item.network_name}</option>
                                            ))
                                        ) : null
                                    }
                                </select>

                                <label htmlFor="serverId">Server ID</label>
                                <input type="number" name="" id="serverId" placeholder='000'
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange} value={formik.values.serverId} />
                                {formik.touched.serverId ? (
                                    <div className={formik.errors.serverId ? 'my-[-7px] text-center text-blue-500 ' : 'hidden'}><i>{formik.errors.serverId}</i></div>
                                ) : null}

                                <label htmlFor="dataPrice">Price</label>
                                <input type="number" name="" id="dataPrice" placeholder='300'
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange} value={formik.values.dataPrice} />
                                {formik.touched.dataPrice ? (
                                    <div className={formik.errors.dataPrice ? 'my-[-7px] text-center text-blue-500 ' : 'hidden'}><i>{formik.errors.dataPrice}</i></div>
                                ) : null}

                                <label htmlFor="validationPeriod">Valid For</label>
                                <input type="text" name="" id="validationPeriod" placeholder='1 Day'
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange} value={formik.values.validationPeriod} />
                                {formik.touched.validationPeriod ? (
                                    <div className={formik.errors.validationPeriod ? 'my-[-7px] text-center text-blue-500 ' : 'hidden'}><i>{formik.errors.validationPeriod}</i></div>
                                ) : null}

                                <label htmlFor="dataSize">Data Size</label>
                                <input type="text" id='dataSize' placeholder='E.G: 500MB or 1GB'
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange} value={formik.values.dataSize} />
                                {formik.touched.dataSize ? (
                                    <div className={formik.errors.dataSize ? 'my-[-7px] mb-3 text-center text-blue-500 ' : 'hidden'}><i>{formik.errors.dataSize}</i></div>
                                ) : null}

                                <button type='submit' className='focus:bg-blue-400 text-white'>Add plan</button>
                            </form>
                        </div>

                    </div>
                </div>


                {/* Show data plan ui */}


                <div id='showDataPlan' className='absolute top-0 w-full h-full justify-center items-center hidden ' style={{ backgroundColor: "rgba(0, 0, 0, 0.548)" }}>
                        <div onClick={() => document.getElementById('showDataPlan').style.display = "none"}
                            className='font-bold text-[2em] text-white cursor-pointer absolute top-[9px] sm:right-[7.5%] right-[32.5%]'><RxCross2 />
                        </div>
                    <div className='listOfPlansDiv bg-white sm:w-[85%] w-[35%] h-[34em] rounded-lg px-10 pt-2 relative'>

                        <h1 className='text-xl text-center text-blue-800 font-bold'>All data plans</h1>

                        <div>
                            {
                                dataPlan ? (
                                    dataPlan.map(item => (
                                        <div id='listOfPlans'>
                                            <h1>{item.network_name}</h1>
                                            <table>
                                                <thead>
                                                    <th>Plans</th>
                                                    <th>Price</th>
                                                    <th>ID</th>
                                                </thead>
                                                <tbody>
                                                    {
                                                        item.dataPlans.map(plan =>(
                                                            <tr>
                                                                <td>{plan.byte}</td>
                                                                <td>{plan.price}</td>
                                                                <td>{plan.server_id}</td>
                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    ))
                                ) : (
                                    <div className='text-center mt-[50%]'>Please check your internet connection</div>
                                )
                            }
                        </div>
                    </div>
                </div>



            </section>
        </>
    )
}

export default AdminService