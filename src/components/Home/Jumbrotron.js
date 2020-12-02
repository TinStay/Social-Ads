import React from 'react';
import app from "../../base";

const Jumbotron = props =>{


    return(
        <div className="jumbotron container text-center">
            <h1>Welcome to AdWeDo</h1>
            <p>We run and Facebook, Instagram and Google ads for you. Sign up and choose your audience. Lorem ipsum dolor, sit amet consectetur adipisicing elit koasjda.</p>
            <button onClick={() => app.auth().signOut()} className="btn btn-signup">Sign Up</button>
        </div>
    )
}

export default Jumbotron;