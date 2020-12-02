import React,{ useContext, useState } from 'react';
import {Link, NavLink} from "react-router-dom";
import {Button, Modal} from 'react-bootstrap';
import { AuthContext } from '../Auth/Auth';
import app from '../../base';
import LoginForm from '../Auth/LoginForm';
import SignupForm from '../Auth/SignupForm';
import homePic from '../../assets/home.png'


const Navbar = () =>{

    const [show, setShow] = useState(false);
    const [isSignup, setIsSignup] = useState(true);
    // const [showMenu, setShowMenu] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { currentUser } = useContext(AuthContext);
    // console.log(currentUser)

    const openSignUpModal = () =>{
        // Hide navbar in mobile view
        closeNavbarWhenClicked();
        
        setIsSignup(true);
        handleShow();
    }

    const openLoginModal = () =>{
        // Hide navbar in mobile view
        closeNavbarWhenClicked();

        setIsSignup(false);
        handleShow();
    }

    const handleSignOut = () => {
        // Hide navbar in mobile view
        closeNavbarWhenClicked();
        
        // Sign out from firebase auth
        app.auth().signOut()
    }

    // Hide collapse when a nav link is clicked in mobile view
    const closeNavbarWhenClicked = () => {

        var navBar = document.getElementById("navbarNav");
        var navLink = document.getElementById("navbarBtn");
        
        navBar.classList.remove("show");
        navLink.classList.add("collapsed");
    }


    let navbarItems = (
        <ul className="navbar-nav">
            <li className="nav-item">
                <NavLink to='/contact' className="nav-link" onClick={() => closeNavbarWhenClicked()}>Contact us</NavLink>
            </li>
            <li className="nav-item">
                <a onClick={openLoginModal} className="nav-link">Login</a>
            </li>
            <li className="nav-item">
                <a onClick={openSignUpModal} className="nav-link">Sign up</a>
            </li>
        </ul>
    );

    if(currentUser){
        navbarItems = (
            <ul className="navbar-nav">
                <li className="nav-item">
                    <NavLink to='/ad-manager' className="nav-link" onClick={() => closeNavbarWhenClicked()} activeClassName='is-active'>Ad Manager</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to='/profile' className="nav-link" onClick={() => closeNavbarWhenClicked()} activeClassName='is-active'>Profile</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to='/contact' className="nav-link" onClick={() => closeNavbarWhenClicked()} activeClassName='is-active'>Contact us</NavLink>
                </li>
                <li className="nav-item">
                    <a onClick={() => handleSignOut()} className="nav-link" >Log out</a>
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
        // sticky-navbar class
        <div className="sticky-navbar"> 
            <nav className="navbar navbar-expand-lg navbar-light " >
                <NavLink to='/'  className="nav-link" onClick={() => closeNavbarWhenClicked()}>
                    <img src={homePic} className="homeBtn" alt="homePic"/>
                </NavLink>
                <button className="navbar-toggler" id="navbarBtn" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">   
                    {navbarItems}
                </div>
            </nav>

        {authType}

        </div>
    )
}


export default Navbar;