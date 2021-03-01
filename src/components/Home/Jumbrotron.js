import React, { useState } from 'react';
import app from "../../base";
import SignupForm from '../Auth/SignupForm'
import LoginForm from '../Auth/LoginForm'

const Jumbotron = props =>{
    const [showSignupForm, setShowSignupForm] = useState(false);
    const [showLoginForm, setShowLoginForm] = useState(false);

    const changeToLogin = (e) => {
        e.preventDefault()
        setShowSignupForm(false)
        setShowLoginForm(true)
    }
    
    const changeToSignup = (e) => {
        e.preventDefault()
        setShowSignupForm(true)
        setShowLoginForm(false)
    }

    return(
        <div className="jumbotron container text-center">
            <h1>Welcome to AdWeDo</h1>
            <p className="">We run Facebook, Instagram and Google ads for you. Sign up, choose your audience and run your ads.</p>
            <button onClick={() => setShowSignupForm(true)}  className="btn btn-signup ">Sign Up</button>
            <SignupForm show={showSignupForm} handleClose={(e) => setShowSignupForm(false)} changeToLogin={changeToLogin}/>
            <LoginForm show={showLoginForm} handleClose={(e) => setShowLoginForm(false)} changeToSignup={changeToSignup}/>
        </div>
    )
}

export default Jumbotron;