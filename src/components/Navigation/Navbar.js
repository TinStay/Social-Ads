import React,{ useContext } from 'react';
import {Link} from "react-router-dom";
import { AuthContext } from '../Auth/Auth';
import app from '../../base';


const Navbar = () =>{

    const { currentUser } = useContext(AuthContext);
    console.log(currentUser)

    let navbarItems = (
        <ul class="navbar-nav">
            <li class="nav-item ">
                <Link to='/' class="nav-link">Home </Link>
            </li>
            <li class="nav-item">
                <Link to='/' class="nav-link">How does it work?</Link>
            </li>
            <li class="nav-item">
                <Link to='/login' class="nav-link">Login</Link>
            </li>
            <li class="nav-item">
                <Link to='/signup' class="nav-link">Sign up</Link>
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
                    <Link to='/' class="nav-link">Profile</Link>
                </li>
                <li class="nav-item">
                    <a onClick={() => app.auth().signOut()} class="nav-link" >Log out</a>
                </li>
            </ul>
        )
    }

    return(
        <nav class="navbar navbar-expand-lg navbar-light ">
            <a class="navbar-brand">SocialAds</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                {navbarItems}
            </div>
        </nav>
    )
}


export default Navbar;