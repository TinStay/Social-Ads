import React from 'react';
import SubscriptionFormCard from './SubscriptionFormCard';

const Subscription = () => {

    const basicListing = ["Run your ads with your budget", "Ad design and message is up to you", "Run multiple ad campaigns", "Get 1 post in our social media account", "Choose when to run your ads", "Get notifications for your ad campaigns"];

    return(
        <div className="subscription-form">
            <h3 className="border-bottom add-form-label">Choose your your ad campaign plan</h3>
        
            <div className="subscription-form-cards">
              
                <div class="accordion" id="accordionExample">

                <SubscriptionFormCard 
                    title="Basic" 
                    price="0"
                    desc="Lorem ipsum dolor sit, amet consectetur adipisicing elit ipsum dolor sit, amet consectetur adipisicing elit \"
                    listing={basicListing}
                    btnText="Go to ad manager"
                    iconClass="fa-star"
                    />

                <SubscriptionFormCard 
                    title="Premium" 
                    price="15"
                    // desc="Lorem ipsum dolor sit, amet consectetur adipisicing elit"
                    listing={basicListing}
                    btnText="Update to Premium"
                    iconClass="fa-crown"
                    />

                <SubscriptionFormCard
                    title="Deluxe" 
                    price="50"
                    desc="Lorem ipsum dolor sit, amet consectetur adipisicing elit Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui aliquid officia dicta ullam nesciunt recusandae nemo? Optio ducimus praesentium mollitia?
                    "
                    listing={basicListing}
                    btnText="Select Deluxe"
                    iconClass="fa-dice-d20"
                    />  

            </div>
        </div>
    
    </div>
    )
}

export default Subscription;
