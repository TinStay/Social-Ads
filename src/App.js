import React from 'react';
import { AuthProvider } from './components/Auth/Auth'

// Componenets
import SignupForm from  './components/Auth/SignupForm';
import LoginForm from  './components/Auth/LoginForm';
import HomePage from './components/Home/index';

// Containers
import PrivateRoute from './containers/User/PrivateRoute';

// Router
import { BrowserRouter, Route } from 'react-router-dom'
import './App.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="">
          {/* <Route exact path="/" component={HomePage} /> */}
          <PrivateRoute exact path="/" component={HomePage} />
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/signup" component={SignupForm} />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
