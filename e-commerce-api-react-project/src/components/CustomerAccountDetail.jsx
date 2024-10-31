import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Form, Button, Alert, Modal, Spinner } from 'react-bootstrap';

const AccountDetail = ({ id }) => {
    const [customerAccountShow, setCustomerAccountShow] = useState(false); // boolean to toggle show / hide details of account
    const [customerAccount, setCustomerAccount] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        displayDetail(id);
      }, []);

    const displayDetail = async (id) => {
        try {
            const response = await axios.get(`http://127.0.0.1:5000/customers/by-id?id=${id}`);
            console.log(response.data)
            setCustomerAccount(response.data)
            setLoading(false);
        } catch (error) {
                console.error(`Error fetching customer ${id} data:`, error);
        }}
        
    const toggleCustomerAccountDetailHidden = () => {
        setCustomerAccountShow(false);
    }
    
    const toggleCustomerAccountDetailView = () => {
        setCustomerAccountShow(true);
    }
    if(loading) return <h3>Loading...</h3>
    return (
        <div>
        {customerAccountShow ? (
            <div>
                <Button variant='warning'className='text-dark border border-1 border-dark m-2 px-5'onClick={toggleCustomerAccountDetailHidden}>Hide Account Details</Button>
                <p className='mx-2 px-2'><strong>Username: </strong>{customerAccount.username}</p>
                <p className='mx-2 px-2'><strong>Password: </strong> {customerAccount.password}</p>
            </div>
            
        ) : (
            <div>
                <Button variant='warning'className='text-dark border border-1 border-dark m-2 px-5'onClick={toggleCustomerAccountDetailView}>Show Account Details</Button>
            </div>
        )
        }
        </div>
    )
    
}


export default AccountDetail