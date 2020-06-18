import React, { Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Signin from './components/Signin';
import Login from './components/Login';
import Logout from './components/Logout';
import Profile from './components/Profile';



function App() {
  return (
    <Router>
      <Navbar/>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/signin" component={Signin}/> 
      <Route exact path="/logout" component={Logout}/> 
      <Route exact path="/profile" component={Profile}/> 
    </Router>
  );
}

export default App;
