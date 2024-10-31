import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Alert, Modal, Spinner } from 'react-bootstrap';
import { useState, useEffect } from "react";
import axios from 'axios';

const CustomerForm = () => {
    const [customer, setCustomer] = useState({name: '', email: '', phone: '', username: '', password: ''});
    const [errors, setErrors] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();
    let regex_phone = /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;

    useEffect(() => {
        if (id) {
            axios.get(`http://127.0.0.1:5000/customers/by-id?id=${id}`)
                .then(response => {
                    setCustomer(response.data)
                }).catch(error => setErrorMessage(error.message))

    }}, [id]);

    const formValidate = () => {
        let errors = {};

        if (!customer.name) errors.name = 'Customer name missing input!';
        if (!customer.email) errors.email = 'Email missing input!';
        if (!customer.phone || regex_phone.test(customer.phone)==false) errors.phone = 'Phone incorrect input.';
        if (!customer.username) errors.username = 'Username missing input!';
        if (!customer.password) errors.password = 'Password missing input!';
        setErrors(errors);
        return Object.keys(errors).length === 0;

    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!formValidate()) return;
        setSubmitting(true);
        try {
            if (id) {
                await axios.put(`http://127.0.0.1:5000/customers/${id}`, customer);
            } else {
                await axios.post(`http://127.0.0.1:5000/customers`, customer);
            }
            setShowSuccessModal(true);
        } catch(error) {
            setErrorMessage(error.message); 
        } finally {
            setSubmitting(false);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCustomer(prevCustomer => ({
            ...prevCustomer, 
            [name]: value
        }));
    };

    const handleClose = () => {
        setShowSuccessModal(false);
        setCustomer({ name: '', email: '', phone: '', username: '', password: ''});
        setSubmitting(false);
        navigate('/customers'); 
    };

    if (submitting) return <p>Submitting input...</p>;

    return (
        <div>
            <Form className='border border-dark border-2 rounded-2 bg-light m-2 p-4' onSubmit={handleSubmit}>
                <h2 className="text-center m-4">{id ? 'Edit' : 'Add'} Customer </h2>
                {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                <Form.Group className="border border-1 rounded-3 border-dark p-3 m-2">
                    <Form.Label>Full Name:</Form.Label>
                    <Form.Control
                        type='text'
                        name='name'
                        placeholder="Jon Doe"
                        value={customer.name}
                        onChange={handleChange}
                        isInvalid={!!errors.name}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.name}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="border border-1 rounded-3 border-dark p-3 m-2">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                        type='text'
                        name='email'
                        placeholder="JonDoe@email.com"
                        value={customer.email}
                        onChange={handleChange}
                        isInvalid={!!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.email}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="border border-1 rounded-3 border-dark p-3 m-2">
                    <Form.Label>Phone Number:</Form.Label>
                    <Form.Control
                        type='text'
                        name='phone'
                        placeholder="###-###-####"
                        value={customer.phone}
                        onChange={handleChange}
                        isInvalid={!!errors.phone}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.phone}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="border border-1 rounded-3 border-dark p-3 m-2">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                        type='text'
                        name='username'
                        placeholder="Username"
                        value={customer.username}
                        onChange={handleChange}
                        isInvalid={!!errors.username}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.username}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="border border-1 rounded-3 border-dark p-3 m-2">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                        type='password'
                        name='password'
                        placeholder="abc123!@"
                        value={customer.password}
                        onChange={handleChange}
                        isInvalid={!!errors.password}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.password}
                    </Form.Control.Feedback>
                </Form.Group>

                <Button variant="success" className='m-2 px-5 p-2 border border-dark border-1' type="submit" disabled={submitting}>
                    {submitting ? <Spinner as='span' animation="border" size='lg' /> : 'Submit'}
                </Button>
            </Form>
            
            <Modal show={showSuccessModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Submission Successful</Modal.Title>
                </Modal.Header>
                <Modal.Body>Customer {id ? `${customer.name} (ID#: ${id})` : `${customer.name}`} has been successfully {id ? 'updated' : 'added'}.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" className='m-2 px-5 border border-dark border-1'onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )

}

export default CustomerForm