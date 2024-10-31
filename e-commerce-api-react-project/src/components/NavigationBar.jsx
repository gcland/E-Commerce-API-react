import { Link, NavLink } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";
import { ShoppingCart } from 'phosphor-react'

function NavigationBar() {
    return (
        <Navbar bg="primary" expand="lg" className="p-2">
            <Navbar.Brand  >E-Commerce App</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar-nav" />
            <Navbar.Collapse id="navbar-nav" className="text-center" >
                <Nav className=''>
                    <Nav.Link as={NavLink} to="/"activeclassname="active">
                        Home
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/customers"activeclassname="active">
                        View/Edit Customers
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/add-customers"activeclassname="active">
                        Add Customers
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/add-products"activeclassname="active">
                        Add Products
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/orders"activeclassname="active">
                        View Orders
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/products"activeclassname="active">
                        Shop Products
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/add-orders"activeclassname="active">
                        Checkout <ShoppingCart size={24} />
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavigationBar