import React from 'react';
import app from "../../base";

const HomePage = props =>{


    return(
        <div className="container">
            <h1>Login</h1>
           <p>Lorem, ipsum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium dignissimos quaerat, 
            minus, quam a ratione soluta odit placeat quasi velit aliquam repellat sequi iste sapiente veritatis id excepturi laboriosam? Quasi.</p>
            <button onClick={() => app.auth().signOut()} className="btn btn-danger">Sign out</button>
        </div>
    )
}

export default HomePage;