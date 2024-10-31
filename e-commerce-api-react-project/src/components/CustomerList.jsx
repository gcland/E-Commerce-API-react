import AccountDetail from "./CustomerAccountDetail";
import { useState, useEffect } from "react";
import { Form, Button, Alert, Modal, Spinner } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';

const CustomerList = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCustomers();
      }, []);
        
      const fetchCustomers = async () => {
        try {
          const response = await axios.get(`http://127.0.0.1:5000/customers`);
          setCustomers(response.data);
          console.log('Customers:')
          console.log(response.data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching customers data:', error);
        }
      }

      const deleteCustomer = async (id) => {
        try {
          await axios.delete(`http://127.0.0.1:5000/customers/${id}`);
          fetchCustomers();
        } catch (error) {
          console.error('Error deleting customer:', error);
        }
      };
    
    if(loading) return <h3>Loading customers. Please wait...</h3>
    return (
      <Container fluid>
        <div className='m-3'>
          <Row>
            <h2 className="text-center">Customers</h2>
          </Row>
          <Row>
              {customers.map(customer => (
                <Col lg={4}>
                  <div className='bg-light border border-2 rounded-3 border-dark m-2 p-2'>
                  <div className='border rounded-2 border-dark m-2 p-2'key={customer.id}>
                      <div className="text-center"><strong className="fs-4">{customer.name}</strong></div>
                      <div><strong>Customer ID:</strong> {customer.id}</div>
                      <div><strong>Email:</strong> {customer.email}</div>
                      <div><strong>Phone:</strong> {customer.phone}</div>
                  </div>
                      <AccountDetail id={customer.id} />
                      <Button className='m-2 px-5 border border-dark border-1'onClick={() => navigate(`/customers/${customer.id}`)}>Edit Account</Button>
                      <Button className='m-2 px-5 border border-dark border-1'onClick={() => deleteCustomer(customer.id)}>Remove Account</Button>
                  </div>
                </Col>
              ))}
          </Row>
        </div>
      </Container>
    )
}
export default CustomerList