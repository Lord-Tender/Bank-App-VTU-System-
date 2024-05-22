import React, { useEffect, useState } from 'react'
import AdminSidebar from '../Components/AdminSidebar'
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import {
    Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend, Filler,
} from 'chart.js';
import { HiOutlineDotsVertical } from 'react-icons/hi';

ChartJS.register(
    LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend, Filler
);


const AdminDashboard = () => {
    const [chartData, setChartData] = useState("");
    const [totalTransac, settotalTransac] = useState("")
    const [totalUser, settotalUser] = useState("")
    const [totalDeposit, settotalDeposit] = useState("")

    useEffect(() => {
        getUser()
        getTotalTransac()
        fetchData();
    }, []);

    const getUser = () => {
        axios.get('http://localhost:5000/admin/get_user')
        .then((res)=>{
            settotalUser(res.data.allUsers.length)
            let totalBal = 0
            res.data.allUsers.map(items => { totalBal += Number(items.accountBal) } )
            console.log(totalBal);
            settotalDeposit(totalBal.toLocaleString('ng-en'))
        })
        .catch((err)=>{
        })
    }

    const getTotalTransac = () =>{
        axios.get('http://localhost:5000/admin/get_transactions')
        .then((res)=>{
            settotalTransac(res.data.allTransaction.length)

        })
        .catch((err)=>{
            console.log(err);
        })
    }

    const fetchData = async () => {
        const response = await axios.get('http://localhost:5000/admin/get_transactions/for_chart');
        const data = response.data.result;

        const dates = data.map(item => item.date);
        const transactionCounts = data.map(item => item.transactionCount);

        setChartData({
            labels: dates,
            datasets: [
                {
                    label: 'Daily Transaction Counts',
                    data: transactionCounts,
                    borderColor: '#4A90E2',
                    backgroundColor: 'whitesmoke',
                    fill: true,
                },
            ],
        });
    };

    const options = {
        plugins: {
            legend: {
                labels: {
                    color: 'black',
                },
            },
            title: {
                display: true,
                text: 'Daily Transaction Counts',
                color: 'black',
            },
            tooltip: {
                titleColor: 'black',
                bodyColor: 'black',
            },
        },
        scales: {
            x: {
                ticks: {
                    color: 'black',
                },
            },
            y: {
                ticks: {
                    color: 'black',
                },
            },
        },
    };

    const showSidebar = () => {
        console.log("yug");
        document.getElementById('sidebar').style.display = "block"
        document.getElementById("section").style.overflow = "hidden !important"
      }

    return (
        <>
            <section id='section' style={{ width: "100%", height: "100%", display: "flex" }}>
                <div className='relative w-[20%] sm:absolute top-0 sm:w-[80%] ' id='sideBarDiv'>
                    <AdminSidebar />
                </div>

                {/* Body */}

                <div className='sm:w-[100%] w-[80%] px-[2.5em] sm:px-[1em] h-full pb-10' style={{ backgroundColor: "whitesmoke" }}>

                    <div className='sm:flex items-center justify-between'>
                        <HiOutlineDotsVertical onClick={showSidebar} className='hidden sm:block text-3xl sm:text-3xl mt-5' />
                        <h1 className='text-2xl font-semibold mt-5 sm:text-center '>Overviews</h1>

                    </div>

                    <div className="flex justify-between  my-[2em] w-[100%] sm:flex-wrap sm:gap-y-3 ">
                        <div className='w-[30%] sm:w-[48%] bg-white rounded border-2 sm:h-[8em] h-[10em] flex flex-col items-center justify-center '>
                            <p className='text-xl font-semibold'>Total User</p>
                            <h2 className='text-3xl sm:text-xl font-semibold'>{totalUser}</h2>
                        </div>
                        <div className='w-[30%] sm:w-[48%] bg-white rounded border-2 border-blue-500 sm:h-[8em] h-[10em] flex flex-col items-center justify-center text-blue-600 sm:border-white sm:text-black '>
                            <p className='text-xl font-semibold'>Total Deposit</p>
                            <h2 className='text-3xl sm:text-xl font-semibold'>{totalDeposit}</h2>
                        </div>
                        <div className='w-[30%] sm:w-[100%] bg-white rounded border-2 sm:h-[8em] h-[10em] flex flex-col items-center justify-center sm:border-blue-500 sm:text-blue-500'>
                            <p className='text-xl font-semibold'>Total Transaction</p>
                            <h2 className='text-3xl sm:text-xl font-semibold'>{totalTransac}</h2>
                        </div>
                    </div>

                    <div className=' h-[25em] w-[100%] bg-white ' style={{ display: "Flex", alignItems: "center", justifyContent: "center", flexDirection: "column", width: "100%", height: "25em" }}>
                        <h1>Transaction Stats</h1>
                        <div className='sm:h-[1000em]' style={{ width: "100%", height: "90%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            {chartData ? (<Line className='w-[90%] h-[80%] sm:!h-[95%] ' options={options} data={chartData} />) : (<p>Loading chart data...</p>)}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AdminDashboard