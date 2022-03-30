import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import Pages from './components/Pages';
import Navigation from './components/Navbar';
import { Outlet } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  
  return(
    
    <div className="App">
      <Navigation/>
      <Outlet />
    </div>
  )
}

export default App;
