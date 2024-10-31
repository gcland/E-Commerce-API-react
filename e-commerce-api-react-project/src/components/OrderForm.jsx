import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Alert, Modal, Spinner } from 'react-bootstrap';
import { useState, useEffect, useContext } from "react";
import axios from 'axios';
import { ProductContext } from "./product-context";

const OrderForm = () => {
    const [errors, setErrors] = useState(false);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();
    const [currentDate, setCurrentDate] = useState(getDate);
    const [deliveryDate, setDeliveryDate] = useState(getDeliveryDate);
    const { getCart, resetCart } = useContext(ProductContext)
    const [productList, setProductList] = useState(getCart)
    // const [existingProductList, setExistingProductList] = useState([])
    const [cartProducts, setCartProducts] = useState([])
    let [total, setTotal] = useState(0)
    console.log("Product List:", productList)
    const [order, setOrder] = useState({customer_id: '', delivery_date: `${deliveryDate}`, order_date: `${currentDate}`, products: productList});


    // LATER WORK TO ENABLE ORDER EDITTING
    // useEffect(() => {
    //     if (id) {
    //         axios.get(`http://127.0.0.1:5000/orders/by-id?id=${id}`)
    //             .then(response => {
    //                 console.log(response.data.products)
    //                 setOrder(response.data)
    //                 response.data.products.map(product => {
    //                     existingProductList.push(product.id)
    //                 })
    //                setOrder({customer_id: response.data.customer_id, delivery_date: response.data.deliveryDate, order_date: response.data.currentDate, products: existingProductList})
    //             })
    //             .catch(error => setErrorMessage(error.message))
    //     }
    // }, [id]);

    const fetchCartProducts = async (productList) => {
        try {
            const response = await axios.get(`http://127.0.0.1:5000/products`);
            setTotal(total = 0)
            let filter_products = response.data.filter(item => productList.includes(item.id));
            filter_products.map(product => (
                setTotal(total+=product.price)));
            let roundedTotal = (Math.round(total * 100) / 100)
            setTotal(roundedTotal)
            
            console.log('Cart Products:', filter_products)
            setCartProducts(filter_products)
            
            setLoading(false);
        } catch (error) {
            console.error('Error fetching products data:', error);
        }
        
    };

    const formValidate = () => {
        let errors = {};
        if (!order.customer_id) errors.customer_id = 'Order Customer ID missing input!';
        if (!order.delivery_date) errors.delivery_date = 'Order delivery date missing input!';
        if (!order.order_date) errors.order_date = 'Order order date missing input!';
        if (!order.products) errors.products = 'Order must have products!';
        setErrors(errors);
        return Object.keys(errors).length === 0;

    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!formValidate()) return;
        resetCart()
        setSubmitting(true);
        try {
            if (id) {
                await axios.put(`http://127.0.0.1:5000/orders/${id}`, order);
            } else {
                await axios.post(`http://127.0.0.1:5000/orders`, order); 
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
        setOrder(prevOrder => ({
            ...prevOrder, 
            [name]: value
        }));
    };

    const handleClose = () => {
        setShowSuccessModal(false);
        setOrder({customer_id: '', delivery_date: `${deliveryDate}`, order_date: `${currentDate}`, products: ""});
        setSubmitting(false);
        navigate('/orders'); 
    };

    function getDate() {
        const today = new Date();
        const month = today.getMonth()+1;
        const year = today.getFullYear();
        const date = today.getDate();
        return(`${year}-${month}-${date}`);
    }

    function getDeliveryDate() {
        let deliveryDate = new Date();
        deliveryDate.setDate(deliveryDate.getDate()+5);
        const deliveryMonth = deliveryDate.getMonth()+1;
        const deliveryYear = deliveryDate.getFullYear();
        const deliveryDay = deliveryDate.getDate();
        return(`${deliveryYear}-${deliveryMonth}-${deliveryDay}`);
    }

    if (submitting) return <p>Submitting input...</p>;
    console.log('Order:', order)
    return (
        <div>
            <Form className='border border-dark border-2 rounded-2 bg-light m-2 p-4' onSubmit={handleSubmit}>
                <h2 className="text-center m-4">{id ? 'Edit' : 'Add'} Order </h2>
                {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                <Form.Group className="border border-1 rounded-3 border-dark p-3 m-2">
                    <Form.Label>Customer ID:</Form.Label>
                    <Form.Control
                        className="border border-1 border-warning"
                        type='number'
                        name='customer_id'
                        value={order.customer_id}
                        onChange={handleChange}
                        isInvalid={!!errors.customer_id}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.customer_id}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="border border-1 rounded-3 border-dark p-3 m-2">
                    <Form.Label>Order Date:</Form.Label>
                    <Form.Control
                        id='disabledDates'
                        type='text'
                        name='order_date'
                        value={order.order_date}
                        onChange={handleChange}
                        isInvalid={!!errors.order_date}
                        disabled
                        readOnly
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.order_date}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="border border-1 rounded-3 border-dark p-3 m-2">
                    <Form.Label>Estimated Delivery Date:</Form.Label>
                    <Form.Control
                        className="bg-success"
                        type='text'
                        name='delivery_date'
                        value={order.delivery_date}
                        onChange={handleChange}
                        isInvalid={!!errors.delivery_date}
                        disabled
                        readOnly
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.delivery_date}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="border border-1 rounded-3 border-dark p-3 m-2">
                    <Form.Label>Product ID's:</Form.Label>
                    <Form.Control
                        id='disabledDates'
                        type='text'
                        name='products'
                        placeholder="Go to the 'Shop Products' page to add products!"
                        value={order.products}
                        disabled
                        onChange={handleChange}
                        isInvalid={!!errors.products}
                    />
                </Form.Group>
                <Button className='m-2 px-5 border border-dark border-1'onClick={() => fetchCartProducts(productList)}>View Order Summary</Button>
                {/* <Button className='m-2 px-5 border border-dark border-1'onClick={() => resetCart}>Clear Cart</Button> */}

                <h3 className="mt-5 mb-4 ms-2">Order Summary:</h3>
                <div className='bg-light border border-2 rounded-3 border-dark m-2 p-2'>
                        <p id="customerID"> Customer ID#: {order.customer_id} </p>
                        <p>Order Date: {order.order_date} </p>
                        <p>Delivery Date: {order.delivery_date} </p>
                        <p>Cart: </p>
                        <ul>{cartProducts.map(product => (
                          <li key={product.id}>
                            <p>{product.name}: ${product.price} (Product-ID#: {product.id})</p>
                          </li>
                        ))}</ul>
                        <p>
                          <strong>Total: ${total}</strong>
                        </p>
                  </div>

                <Button className='m-2 p-2 px-5'variant="success" type="submit" disabled={submitting}>
                    {submitting ? <Spinner as='span' animation="border" size='lg' /> : 'Submit'}
                </Button>
            </Form>
            
            <Modal show={showSuccessModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Submission Successful</Modal.Title>
                </Modal.Header>
                <Modal.Body>Order{id ? ` ID#: ${id}` :""} has been successfully {id ? 'updated' : 'added'}.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )

}

export default OrderForm