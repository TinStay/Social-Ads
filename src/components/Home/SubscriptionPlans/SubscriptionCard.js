import React from 'react';
// import app from "../../base";

const SubscriptionCard = props =>{

    let iconClasses=["fas ml-3 mb-2", props.iconClass]

    return(
            <div className="subscription-card text-center">
                <i className={iconClasses.join(" ")}></i>
                <h1 className="text-center border-bottom font-weight-bold pb-2">{props.title}</h1>
                <h1>${props.price} <span className="h4">/ month</span> </h1>
                {/* <p className="subscription-card-p">{props.desc}</p> */}
                <ul className="subscription-card-list text-left justify-content-center">
                    {props.listing.map( li =>{
                        return <li key={li}><i className="fas fa-check"></i> {li}</li>
                    })}
                </ul>
                <button className="btn subscription-card-button">{props.btnText}</button>
            </div>
    )
}

export default SubscriptionCard;