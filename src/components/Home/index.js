import React from 'react';
import app from "../../base";

const HomePage = props =>{


    return(
        <div className="container">
            <h1>Welcome to SocialAds</h1>
           <p>We run and Facebook, Instagram and Google ads for you. Sign up and choose your audience.</p>
            <button onClick={() => app.auth().signOut()} className="btn btn-danger">Sign Up</button>
        </div>
    )
}

export default HomePage;