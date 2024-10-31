import { Routes, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar.jsx';
import 'bootstrap/dist/css/bootstrap.min.css'
import Home from './components/Home.jsx';
import CustomerList from './components/CustomerList.jsx';
import CustomerForm from './components/CustomerForm.jsx';
import OrderList from './components/OrderList';
import OrderForm from './components/OrderForm.jsx';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm.jsx';
import NotFound from './components/NotFound.jsx';
import './App.css';
import { ProductContextProdiver } from './components/product-context.jsx';

const App = () => {

  return (
    <div>
      <ProductContextProdiver>
        <NavigationBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/customers' element={<CustomerList />} />
          <Route path='/add-customers' element={<CustomerForm />} />
          <Route path='/customers/:id' element={<CustomerForm />} />
          <Route path='/orders' element={<OrderList />} />
          <Route path='/add-orders' element={<OrderForm />} />
          <Route path='/orders/:id' element={<OrderForm />} />
          <Route path='/products' element={<ProductList />} />
          <Route path='/add-products' element={<ProductForm />} />
          <Route path='/products/:id' element={<ProductForm />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </ProductContextProdiver>
    </div>
  )
}

export default App
