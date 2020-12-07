import React from 'react';

import { AuthProvider } from './components/Auth/Auth'

// Componenets
import HomePage from './components/Home/HomePage';
import Navbar from './components/Navigation/Navbar';
import Profile from './containers/User/Profile';
import LoginForm from './components/Auth/LoginForm';

// Containers
import PrivateRoute from './containers/User/PrivateRoute';
import AdManager from './containers/AdManager/AdManager';

// Router
import { BrowserRouter, Route } from 'react-router-dom'
import './App.scss';



function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={LoginForm} />
          {/* <Route exact path="/signup" component={SignupForm} /> */}
          <PrivateRoute exact path="/profile" component={Profile}/>
          <PrivateRoute exact path="/ad-manager" component={AdManager}/>
          
        </div>
        
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
