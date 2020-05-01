import React,{ useContext, useState } from 'react';
import {Link} from "react-router-dom";
import {Button, Modal} from 'react-bootstrap';
import { AuthContext } from '../Auth/Auth';
import app from '../../base';
import LoginForm from '../Auth/LoginForm';
import SignupForm from '../Auth/SignupForm';


const Navbar = () =>{

    const [show, setShow] = useState(false);
    const [isSignup, setIsSignup] = useState(true);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { currentUser } = useContext(AuthContext);
    // console.log(currentUser)

    const openSignUpModal = () =>{
        setIsSignup(true);
        handleShow();
    }

    const openLoginModal = () =>{
        setIsSignup(false);
        handleShow();
    }

    let navbarItems = (
        <ul class="navbar-nav">
            <li class="nav-item ">
                <Link to='/' class="nav-link">Home </Link>
            </li>
            <li class="nav-item">
                <Link to='/' class="nav-link">How does it work?</Link>
            </li>
            <li class="nav-item">
                <a onClick={openLoginModal} class="nav-link">Login</a>
            </li>
            <li class="nav-item">
                <a onClick={openSignUpModal} class="nav-link">Sign up</a>
            </li>
        </ul>
    );

    if(currentUser){
        navbarItems = (
            <ul class="navbar-nav">
                <li class="nav-item ">
                    <Link to='/' class="nav-link">Home</Link>
                </li>
                <li class="nav-item">
                    <Link to='/' class="nav-link">How does it work?</Link>
                </li>
                <li class="nav-item">
                    <Link to='/profile' class="nav-link">Profile</Link>
                </li>
                <li class="nav-item">
                    <a onClick={() => app.auth().signOut()} class="nav-link" >Log out</a>
                </li>
            </ul>
        )
    }

    const changeToSignup = e =>{
        e.preventDefault();

        setIsSignup(true);
    }

    const changeToLogin = e =>{
        e.preventDefault();

        setIsSignup(false);
    }

    let authType = <LoginForm show={show} handleClose={handleClose} changeToSignup={changeToSignup}/>;

    if(isSignup){
        authType = <SignupForm show={show} handleClose={handleClose} changeToLogin={changeToLogin}/>;
    }

    return(
        <div className="sticky-navbar">
            <nav class="navbar navbar-expand-lg navbar-light ">
            <a class="navbar-brand">SocialAds</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                {navbarItems}
            </div>
        </nav>

        {authType}

        </div>
    )
}


export default Navbar;