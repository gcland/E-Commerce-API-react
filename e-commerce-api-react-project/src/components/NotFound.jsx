import { Link } from "react-router-dom";
import { Row, Col, Image, Container } from 'react-bootstrap'

function NotFound() {
    return (
        <Container className='ms-1 my-2 border border-2 border-dark rounded-3 bg-warning' fluid>
            <Row className='p-2 m-2'>
                <Col className="text-center align-content-center px-5 p-2 border border-2 border-dark rounded bg-secondary text-light" lg={6}>
                    <h1 className="p-4">404 - Page Not Found</h1>
                    <p className="fs-2 m-4 p-4 text-center">The requested page is not found! </p>
                    <Link to="/" className="fs-3 px-5 p-2 border border-2 border-dark rounded bg-primary text-dark" fluid>Return Home</Link>
                </Col>
                <Col className="d-flex align-items-center ">
                    <Image src="../src/assets/meme.jpeg" className='border border-2 border-dark'width="1000px" height="auto"rounded fluid/>
                </Col>
            </Row>
        </Container>
    )
}

export default NotFound;