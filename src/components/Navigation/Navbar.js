import React,{ useContext } from 'react';
import {Link} from "react-router-dom";
import { AuthContext } from '../Auth/Auth';


const Navbar = () =>{

    const { currentUser } = useContext(AuthContext);
    console.log(currentUser)

    let navbarItems = (
        <ul class="navbar-nav">
            <li class="nav-item active">
                <Link to='/' class="nav-link">Home <span class="sr-only">(current)</span></Link>
            </li>
            <li class="nav-item">
                <Link to='/' class="nav-link" href="#">How does it work?</Link>
            </li>
            <li class="nav-item">
                <Link to='/login' class="nav-link" href="#">Login</Link>
            </li>
            <li class="nav-item">
                <Link to='/signup' class="nav-link" href="#">Sign up</Link>
            </li>
        </ul>
    );

    if(currentUser){
        navbarItems = (
            <ul class="navbar-nav">
                <li class="nav-item active">
                    <Link to='/' class="nav-link">Home <span class="sr-only">(current)</span></Link>
                </li>
                <li class="nav-item">
                    <Link to='/' class="nav-link" href="#">How does it work?</Link>
                </li>
                <li class="nav-item">
                    <Link to='/' class="nav-link" href="#">Profile</Link>
                </li>
                <li class="nav-item">
                    <Link to='/signup' class="nav-link" href="#">Log out</Link>
                </li>
            </ul>
        )
    }

    return(
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">Navbar</a>
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