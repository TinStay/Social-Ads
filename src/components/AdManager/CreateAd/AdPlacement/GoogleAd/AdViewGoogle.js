import React,{ useState, useEffect } from 'react';


const AdViewGoogle = (props) => {


    return(
        <div className="ggl-ad-form-view">
           
            <div className="headlines">
               <span>{props.headlineOne ? props.headlineOne : "Headline 1 |"}</span>
               <span>{props.headlineTwo}</span>
               <span>{props.headlineThree}</span>
            </div>
            <div className="url ">
                <p><span className="ad-box">Ad</span>{props.url}</p>
            </div>
            <div className="description">
                <p>{props.description}</p>
            </div>
        </div>
    );
}

export default AdViewGoogle;