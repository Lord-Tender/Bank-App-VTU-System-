import React, { useEffect, useState } from 'react'
import AdminSidebar from '../Components/AdminSidebar'
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import {
    Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend, Filler,
} from 'chart.js';

ChartJS.register(
    LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend, Filler
);


const AdminDashboard = () => {
    const [chartData, setChartData] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('http://localhost:5000/admin/get_transactions/for_chart');
            const data = response.data.result;
            console.log(data);

            const dates = data.map(item => item.date);
            const transactionCounts = data.map(item => item.transactionCount);
            console.log(dates, transactionCounts);

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

        fetchData();
    }, []);

    const options = {
        plugins: {
            legend: {
                labels: {
                    color: 'black', // Color of the legend text
                },
            },
            title: {
                display: true,
                text: 'Daily Transaction Counts',
                color: 'black', // Color of the title text
            },
            tooltip: {
                titleColor: 'black', // Color of the tooltip title
                bodyColor: 'black', // Color of the tooltip body text
            },
        },
        scales: {
            x: {
                ticks: {
                    color: 'black', // Color of the x-axis labels
                },
            },
            y: {
                ticks: {
                    color: 'black', // Color of the y-axis labels
                },
            },
        },
    };

    return (
        <>
            <section style={{ width: "100%", height: "100%", display: "flex" }}>
                <div className='relative w-[20%] '>
                    <AdminSidebar />
                </div>

                {/* Body */}

                <div className='w-[80%] px-[2.5em] h-full pb-10' style={{ backgroundColor: "whitesmoke" }}>
                    <h1 className='text-2xl font-semibold mt-5 '>Overviews</h1>

                    <div className="flex justify-between  my-[2em] w-[100%] ">
                        <div className='w-[30%] bg-white rounded border-2 h-[10em] flex flex-col items-center justify-center '>
                            <p className='text-xl font-semibold'>Total User</p>
                            <h2 className='text-3xl font-semibold'>20</h2>
                        </div>
                        <div className='w-[30%] bg-white rounded border-2 border-blue-500 h-[10em] flex flex-col items-center justify-center text-blue-600 '>
                            <p className='text-xl font-semibold'>Total Deposit</p>
                            <h2 className='text-3xl font-semibold'>50</h2>
                        </div>
                        <div className='w-[30%] bg-white rounded border-2 h-[10em] flex flex-col items-center justify-center '>
                            <p className='text-xl font-semibold'>Total Transaction</p>
                            <h2 className='text-3xl font-semibold'>70</h2>
                        </div>
                    </div>

                    <div className=' h-[25em] w-[100%] bg-white ' style={{ display: "Flex", alignItems: "center", justifyContent: "center", flexDirection: "column", width: "100%", height: "25em" }}>
                        <h1>Transaction Stats</h1>
                        <div style={{ width: "100%", height: "90%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            {chartData ? (<Line style={{ width: "90%", height: "80%" }} options={options} data={chartData} />) : (<p>Loading chart data...</p>)}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AdminDashboard