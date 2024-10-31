import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Button, Container, Row, Col } from 'react-bootstrap';


const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    let [total, setTotal] = useState(0)
    const [showFilter, setShowFilter] = useState(false)
    const navigate = useNavigate();
    const [filteredOrders, setFilteredOrders] = useState([]) // *normally would have endpoint to show results by customer ID but this is a react focused project
    useEffect(() => {
        fetchOrders();
      }, []);
        
      const fetchOrders = async () => {
        try {
          const response = await axios.get(`http://127.0.0.1:5000/orders`);
          setOrders(response.data);
          console.log('Orders:')
          console.log(response.data)
          setLoading(false);
          response.data.map(order => (
            setTotal(total = 0),
            order.products.map(product => (
              setTotal(total+=product.price))),
            order['total'] = total
          ))
        } catch (error) {
          console.error('Error fetching orders data:', error);
        }
      }

      // *normally would have endpoint to show results by customer ID but this is a react focused project
      const fetchFilteredOrders = async (value) => {
        try {
          fetch(`http://127.0.0.1:5000/orders`)
            .then((response) => response.json())
            .then((json) =>{
              const results = json.filter((customer) => {
                return customer && customer.customer_id.includes(value);
              });
              setLoading(false);
              results.map(order => (
                setTotal(total = 0),
                order.products.map(product => (
                  setTotal(total+=product.price))),
                order['total'] = total
              ))
              console.log('Filtered Orders:')
              console.log(results)
              setFilteredOrders(results)
            });
        } catch (error) {
          console.error('Error fetching orders data:', error);
        }
      }

      const deleteOrder = async (id) => {
        try {
          await axios.delete(`http://127.0.0.1:5000/orders/${id}`);
          fetchOrders();
        } catch (error) {
          console.error('Error deleting order:', error);
        }
      };
      
      const handleChange = (value) => { // *normally would have endpoint to show results by customer ID but this is a react focused project)
        console.log(value)
        if (value.length === 0) {
          console.log('yes')
          setShowFilter(false)
        }
        else {
          console.log('Value:')
          console.log(value)
          fetchFilteredOrders(value)
          setShowFilter(true)
          
        }
    }

    if(loading) return <h1>Loading orders. Please wait...</h1>
    // Sorts orders by customer id
    orders.sort(function(a, b) {
      let id1 = a.customer_id
      let id2 = b.customer_id
      if (id1 < id2) {
        return -1
      }
      if (id1 > id2) {
        return 1
      } else {
        return 0
      }
    });
    return (
      <div>
      {showFilter ? (
        <Container fluid>
            <Row>
              <h2 className="m-2 mt-3 text-center">Orders</h2>
            </Row>
            <h4 className="ms-2">Search Orders by Customer ID#</h4>
            <input type="text" id="userInput" onChange={(e) => handleChange(e.target.value)} className='ms-2 my-3 p-3 border border-1 border-dark rounded-2'placeholder="Search orders by Customer ID#" title="Enter a number"></input>
            <Row id="myList">
                {filteredOrders.map(order => (
                  <Col md={6} key={order.id}>
                  <div className='bg-light border border-2 rounded-3 border-dark m-2 p-2'>
                        <p id="customerID"> Customer ID#: {order.customer_id} </p>
                        <p>OrderID#: {order.id}</p>
                        <p>Order Date: {order.order_date}</p>
                        <p>Delivery Date: {order.delivery_date} </p>                        
                        <ul>{order.products.map(product => (
                          <li key={product.id}>
                            <p>{product.name}: ${product.price} (Product-ID#:{product.id})</p>
                          </li>
                        ))}</ul>
                        <p>
                          <strong>Total: ${order.total}</strong>
                        </p>
                        {/* LATER WORK TO ENABLE ORDER EDITTING */}
                        {/* <Button className='m-2 px-5 border border-dark border-1'onClick={() => navigate(`/orders/${order.id}`)}>Edit Order</Button> */}
                        <Button variant='warning' className='m-2 px-5 border border-1 border-dark rounded-3'onClick={() => deleteOrder(order.id)}>Delete Order</Button>
                    </div>
                  </Col>
                ))}
            </Row>
        </Container>
    ) : (
      <Container fluid>
            <Row>
              <h2 className="m-2 mt-3 text-center">Orders</h2>
            </Row>
            <h4 className="ms-2">Search Orders by Customer ID#</h4>
            <input type="text" id="userInput" onChange={(e) => handleChange(e.target.value)} className='ms-2 my-3 p-3 border border-1 border-dark rounded-2'placeholder="Search orders by Customer ID#" title="Enter a number"></input>
            <Row id="myList">
                {orders.map(order => (
                  <Col md={6} key={order.id}>
                  <div className='bg-light border border-2 rounded-3 border-dark m-2 p-2'>
                        <p id="customerID"> Customer ID#: {order.customer_id} </p>
                        <p> OrderID#: {order.id}</p>
                        <p>Order Date: {order.order_date}</p>
                        <p>Delivery Date: {order.delivery_date} </p>
                        <ul>{order.products.map(product => (
                          <li key={product.id}>
                            <p>{product.name}: ${product.price} (Product-ID#:{product.id})</p>
                          </li>
                        ))}</ul>
                        <p>
                          <strong>Total: ${order.total}</strong>
                        </p>
                         {/* LATER WORK TO ENABLE ORDER EDITTING */}
                        {/* <Button className='m-2 px-5 border border-dark border-1'onClick={() => navigate(`/orders/${order.id}`)}>Edit Order</Button> */}
                        <Button variant='warning' className='m-2 px-5 border border-1 border-dark rounded-3'onClick={() => deleteOrder(order.id)}>Delete Order</Button>
                  </div>
                  </Col>
                ))}
            </Row>
        </Container>
    )}
    </div>
    )
}

export default OrderList;