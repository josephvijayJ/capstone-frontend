import Home from './pages/Home';
import ProductList from './pages/ProductList';

import Product from './pages/Product';
import Register from './pages/Register';
import Login from './pages/Login';
import Cart from './pages/Cart';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import Success from './pages/Success';
import ResetPassword from './pages/ResetPassword';
import Forgetpassword from './pages/ForgetPasswor';

function App() {
  const user = false;
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/products/:category" element={<ProductList />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/success" element={<Success />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/resetpassword/:token"
            element={<ResetPassword />}
          ></Route>
          <Route path="/forgetpassword" element={<Forgetpassword />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
