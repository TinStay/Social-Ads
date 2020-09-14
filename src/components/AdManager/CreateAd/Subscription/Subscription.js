import React from 'react';
import SubscriptionCard from '../../../Home/SubscriptionPlans/SubscriptionCard';

const Subscription = () => {

    const basicListing = ["Run your ads with your budget", "Ad design and message is up to you", "Run multiple ad campaigns", "Get 1 post in our social media account", "Choose when to run your ads", "Get notifications for your ad campaigns"];

    return(
        <div className="">
        <h3 className="border-bottom add-form-label">Choose your your ad campaign plan</h3>
        
            <div className="subscription-row row">
                <div className="col-md-6 col-xl-4 ">
                    <SubscriptionCard 
                    title="Basic" 
                    price="0"
                    // desc="Lorem ipsum dolor sit, amet consectetur adipisicing elit"
                    listing={basicListing}
                    btnText="Go to ad manager"
                    iconClass="fa-star"
                    />
                </div>
                <div className="col-md-6 col-xl-4 subscription-row-standout">
                    <SubscriptionCard 
                    title="Premium" 
                    price="15"
                    // desc="Lorem ipsum dolor sit, amet consectetur adipisicing elit"
                    listing={basicListing}
                    btnText="Update to Premium"
                    iconClass="fa-crown"
                    />
                </div>
                <div className="col-md-6 col-xl-4 second-card">
                    <SubscriptionCard 
                    title="Deluxe" 
                    price="50"
                    // desc="Lorem ipsum dolor sit, amet consectetur adipisicing elit"
                    listing={basicListing}
                    btnText="Update to Deluxe"
                    iconClass="fa-dice-d20"
                    />
                </div>
            </div>
        </div>
    )
}

export default Subscription;
