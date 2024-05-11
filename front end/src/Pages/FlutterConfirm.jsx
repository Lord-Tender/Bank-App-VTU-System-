import React from 'react'
import { useLocation } from 'react-router-dom'

const FlutterConfirm = () => {
    let location = useLocation()
    const searchParams = new URLSearchParams(location.search);

    const status = searchParams.get('status');
    const transaction_id = searchParams.get('transaction_id');
    console.log(transaction_id, status);

    return (
        <>
            <h1>Confirmed</h1>
        </>
    )
}

export default FlutterConfirm