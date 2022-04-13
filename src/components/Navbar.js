import React, { useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Home from './Home';
import Cart from './Cart';
import Checkout from './Checkout';
import Products from './Products';
import ProductDetails from './ProductDetails'
import NotFound from './NotFound';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const pages = [
  {
    label: 'Products',
    target: '/products'
  },
  {
    label: 'Cart',
    target: '/cart'
  },
  {
    label: 'Checkout',
    target: '/checkout'
  }
];

export default function Navigation() {
  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
            >
              JN-STOREFRONT
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              { pages.map((page) => (
                  <Button
                    href={page.target}
                    sx={{ my: 2, color: "white", display: 'flex' }}
                    name={page.label}
                  >
                    {page.label}
                  </Button>
              ))}
          </Box>

          </Toolbar>
        </Container>
      </AppBar>

      <div>
        <Router>
          <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/products" element={<Products/>}/>
              <Route path="/products/:id" element={<ProductDetails/>}/>
              <Route path="/cart" element={<Cart/>}/>
              <Route path="/checkout" element={<Checkout/>}/>
              <Route path="*" element={<NotFound/>}/>
          </Routes>
        </Router>
      </div>
    </>
    
//     <Router>
//     <div className="Navigation">
// <>
//   <Navbar bg="dark" variant="dark">
//     <Container>
//     <Navbar.Brand as={Link} to="/">Home</Navbar.Brand>
//     <Nav className="me-auto">
//       <Nav.Link as={Link} to="/products">Products</Nav.Link>
//       <Nav.Link as={Link} to="/cart">Cart</Nav.Link>
//       <Nav.Link as={Link} to="/checkout">Checkout</Nav.Link>
//     </Nav>
//     </Container>
//   </Navbar>
// </>
// <div>
//     <Routes>
//         <Route path="/" element={<Home/>}/>
//         <Route path="/products" element={<Products/>}/>
//         <Route path="/products/:id" element={<ProductDetails/>}/>
//         <Route path="/cart" element={<Cart/>}/>
//         <Route path="/checkout" element={<Checkout/>}/>
//         <Route path="*" element={<NotFound/>}/>
//     </Routes>
// </div>
//     </div>
// </Router>
    );
}
