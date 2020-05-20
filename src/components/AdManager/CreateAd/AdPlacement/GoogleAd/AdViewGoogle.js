import React,{ useState, useEffect } from 'react';


const AdViewGoogle = (props) => {


    return(
        <div className="ggl-ad-form-view">
           
            <div className=" headlines">
               <span>headline 1 | </span>
               <span>headline 2 | </span>
               <span>headline 3</span>
            </div>
            <div className="url ">
                <p><span className="ad-box">Ad</span>tinstay.herokuapp.com</p>
            </div>
            <div className=" description ">
                <p>Description for your product or website</p>
            </div>
        </div>
    );
}

export default AdViewGoogle;