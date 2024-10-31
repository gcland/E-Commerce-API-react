import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Alert, Modal, Spinner } from 'react-bootstrap';
import { useState, useEffect } from "react";
import axios from 'axios';

const ProductForm = () => {
    const [product, setProduct] = useState({name: '', price: ''});
    const [errors, setErrors] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            axios.get(`http://127.0.0.1:5000/products/by-id?id=${id}`)
                .then(response => {
                    setProduct(response.data)
                })
                .catch(error => setErrorMessage(error.message))
        }
    }, [id]);

    const formValidate = () => {
        let errors = {};
        if (!product.name) errors.name = 'Product name missing input!';
        if (!product.price || product.price <= 0) errors.price = 'Price must be a positive number!';
        setErrors(errors);
        return Object.keys(errors).length === 0;

    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!formValidate()) return;
        setSubmitting(true);
        try {
            if (id) {
                await axios.put(`http://127.0.0.1:5000/products/${id}`, product);
            } else {
                await axios.post(`http://127.0.0.1:5000/products`, product); 
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
        setProduct(prevProduct => ({
            ...prevProduct, 
            [name]: value
        }));
    };

    const handleClose = () => {
        setShowSuccessModal(false);
        setProduct({ name: '', price: ''});
        setSubmitting(false);
        navigate('/products'); 
    };

    if (submitting) return <p>Submitting input...</p>;

    return (
        <div>
            <Form className='border border-dark border-2 rounded-2 bg-light m-2 p-4' onSubmit={handleSubmit}>
                <h2 className="text-center m-4">{id ? 'Edit' : 'Add'} Product </h2>
                {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                <Form.Group className="border border-1 rounded-3 border-dark p-3 m-2">
                    <Form.Label>Name:</Form.Label>
                    <Form.Control
                        type='text'
                        name='name'
                        value={product.name}
                        onChange={handleChange}
                        isInvalid={!!errors.name}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.name}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="border border-1 rounded-3 border-dark p-3 m-2">
                    <Form.Label>Price:</Form.Label>
                    <Form.Control
                        type='number'
                        name='price'
                        value={product.price}
                        onChange={handleChange}
                        isInvalid={!!errors.price}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.price}
                    </Form.Control.Feedback>
                </Form.Group>

                <Button className='m-2 px-5 p-2'variant="success" type="submit" disabled={submitting}>
                    {submitting ? <Spinner as='span' animation="border" size='lg' /> : 'Submit'}
                </Button>
            </Form>
            
            <Modal show={showSuccessModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Submission Successful</Modal.Title>
                </Modal.Header>
                <Modal.Body>Product {id ? `ID#: ${id}` : `'${product.name}'`} has been successfully {id ? 'updated' : 'added'}.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )

}

export default ProductForm