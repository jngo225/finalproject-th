import React, { Component } from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from './Home';
import Cart from './Cart';
import Checkout from './Checkout';
import Products from './Products';
import ProductDetails from './ProductDetails'
import NotFound from './NotFound';

export default function Navigation() {
    return (
    
    <Router>
    <div className="Navigation">
<>
  <Navbar bg="dark" variant="dark">
    <Container>
    <Navbar.Brand as={Link} to="/">Home</Navbar.Brand>
    <Nav className="me-auto">
      <Nav.Link as={Link} to="/products">Products</Nav.Link>
      <Nav.Link as={Link} to="/cart">Cart</Nav.Link>
      <Nav.Link as={Link} to="/checkout">Checkout</Nav.Link>
    </Nav>
    </Container>
  </Navbar>
</>
<div>
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/products" element={<Products/>}/>
        <Route path="/products/:id" element={<ProductDetails/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/checkout" element={<Checkout/>}/>
        <Route path="*" element={<NotFound/>}/>
    </Routes>
</div>
    </div>
</Router>
    );
}
