import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Image, Button } from 'react-bootstrap';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import { ProductContext } from "./product-context";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const { AddToCart } = useContext(ProductContext)
      
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/products`);
      setProducts(response.data);
      console.log('Products:', response.data)
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products data:', error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

    useEffect(() => {
      fetchProducts();
    }, []);


    if(loading) return <h3>Loading products. Please wait...</h3>
    return (
      <Container fluid>
        <div className="border border-dark border-2 rounded-2 bg-light m-2 p-4">
          <Row>
            <h2 className="m-2 mb-4 text-center">Browse Products</h2>
          </Row>
          <Row>
              {products.map(product => (
                <Col lg={4} md={6}>
                  <div className=" text-center">
                    <div key={product.id} className="row border border-dark rounded-2 fs-4 p-2 m-2">
                        <p>{product.name}: ${product.price} </p>
                        <p>(Product-ID#:{product.id})</p>
                        <div>
                          <Button variant='warning' className='m-2 px-5 border border-1 border-dark rounded-3'onClick={() => navigate(`/products/${product.id}`)}>Edit</Button>
                          <Button variant='warning' className='m-2 px-5 border border-1 border-dark rounded-3'onClick={() => deleteProduct(product.id)}>Delete</Button>
                        </div>
                        {/* Placeholder img of product */}
                        <div>
                          <Image src="../src/assets/placeholder.svg" className='border border-2 border-dark mb-2'rounded fluid/>
                          <Button variant='success'className='m-2 px-5 border border-dark border-1' id='addToCartBtn'onClick={() => AddToCart(product.id)}>Add to Cart</Button>

                        </div>
                    </div>
                  </div>
                </Col>
              ))}
          </Row>
        </div>
      </Container>
    )

}

export default ProductList;