import { Row, Col, Image, Container, Button, Card } from 'react-bootstrap'

const Home = () => {

    return (
        <div>
            <Container>
                <h1 className='bg-primary rounded-2 text-light m-3 py-5 d-flex justify-content-center'>E-Commerce-App</h1>
                <Row>
                    <Col md={6}>
                        <Card style={{ width: 'auto' }} id='homeCard'className='my-3 border border-primary border-3'>
                            <Card.Body>
                                <Card.Title className='text-center text-dark mb-3 fs-2'>Customer Accounts</Card.Title>
                                <Card.Text className='fs-5 text-dark'>
                                Add New Customers, View Existing Customer Details, or Update Customer Accounts
                                </Card.Text>
                                <Card.Link href="/customers"activeclassname="active" className='text-light bg-primary ms-0 p-2 border rounded-3 border-dark border-1 shadow-lg'>Customers Page</Card.Link>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6}>
                        <Card style={{ width: 'auto' }} id='homeCard'className='my-3 border border-primary border-3'>
                            <Card.Body>
                                <Card.Title className='text-center text-dark mb-3 fs-2'>Products</Card.Title>
                                <Card.Text className='fs-5 text-dark'>
                                Browse Products, Add New Products, Update Existing Products
                                </Card.Text>
                                <Card.Link href="/products"activeclassname="active" className='text-light bg-primary ms-0 p-2 border rounded-3 border-dark border-1 shadow-lg'>Products Page</Card.Link>
                            </Card.Body>
                        </Card>
                    </Col>  
                </Row>
                <Row>
                <Col md={12}>
                        <Card style={{ width: 'auto' }} id='homeCard'className='my-3 border border-primary border-3'>
                            <Card.Body>
                                <Card.Title className='text-center text-dark mb-3 fs-1'>Order Products</Card.Title>
                                <Card.Text className='fs-5 text-dark'>
                                </Card.Text>
                                <div>
                                    <Card.Link href="/add-orders"activeclassname="active" className='d-flex justify-content-center text-light bg-primary mt-4 px-5 p-2 fs-4 border rounded-3 border-dark border-1 shadow-lg'>Order Now</Card.Link>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Home;