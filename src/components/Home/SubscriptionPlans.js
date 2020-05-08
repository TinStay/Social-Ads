import React from 'react';
// import app from "../../base";

const SubscriptionPlans = props =>{


    return(
        <div className="subscription-section ">
            <div className="subscription-jumbotron text-center">
                <h1>Subscribe and get monthly offers</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet.</p>
            </div>
            <div className="subscription-row ">
                <div className=" subscription-card">
                    <h1 className="text-center mb-3 border-bottom">1 Month</h1>
                    <p>This is the basic subscription plan and you will get the following services: </p>
                    <ul className="subscription-card-list">
                        <li>Running unlimited number of ads depending on your budget</li>
                        <li>1 post in our Discover new social media accounts</li>
                        <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, nam?</li>
                        <li>Lorem ipsum dolor sit amet consectetur.</li>
                        <li>Lorem ipsum dolor sit amet.</li>
                    </ul>
                    <button className="btn btn-primary subscription-card-button">Get this plan</button>
                </div>
                <div className=" subscription-card">
                    <h1>3 Months</h1>
                    <p>This is the basic subscription plan and you will get the following services: </p>
                    <ul>
                        <li>Running unlimited number of ads depending on your budget</li>
                        <li>1 post in our Discover new social media accounts</li>
                        <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, nam?</li>
                        <li>Lorem ipsum dolor sit amet consectetur.</li>
                        <li>Lorem ipsum dolor sit amet.</li>
                    </ul>
                    <button className="btn btn-primary">Get this plan</button>
                </div>
                <div className=" subscription-card">
                    <h1>6 Months</h1>
                    <p>This is the basic subscription plan and you will get the following services: </p>
                    <ul>
                        <li>Running unlimited number of ads depending on your budget</li>
                        <li>1 post in our Discover new social media accounts</li>
                        <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, nam?</li>
                        <li>Lorem ipsum dolor sit amet consectetur.</li>
                        <li>Lorem ipsum dolor sit amet.</li>
                    </ul>
                    <button className="btn btn-primary">Get this plan</button>
                </div>
            </div>
        </div>
    )
}

export default SubscriptionPlans;