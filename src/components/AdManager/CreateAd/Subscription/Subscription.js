import React from 'react';
import SubscriptionCardForm from './SubscriptionCardForm';

const Subscription = () => {

    const basicListing = ["Run your ads with your budget", "Ad design and message is up to you", "Run multiple ad campaigns", "Get 1 post in our social media account", "Choose when to run your ads", "Get notifications for your ad campaigns"];

    return(
        <div className="subscription-form">
            <h3 className="border-bottom add-form-label">Choose your your ad campaign plan</h3>
        
            <div className="subscription-form-cards">
                <SubscriptionCardForm
                    title="Deluxe" 
                    price="50"
                    // desc="Lorem ipsum dolor sit, amet consectetur adipisicing elit"
                    listing={basicListing}
                    btnText="Update to Deluxe"
                    iconClass="fa-dice-d20"
                    />
            </div>
        </div>
    )
}

export default Subscription;
