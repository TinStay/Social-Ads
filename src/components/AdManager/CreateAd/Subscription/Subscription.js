import React, { useState} from 'react';
import SubscriptionFormCard from './SubscriptionFormCard';

const Subscription = () => {

    const basicListing = ["Run your ads with your budget", "Ad design and message is up to you", "Run multiple ad campaigns", "Get 1 post in our social media account", "Choose when to run your ads", "Get notifications for your ad campaigns"];

    const [showCard, setShowCard]  = useState("Basic");


    let [selectedPlan, setSelectedPlan] = useState("");

    return(
        <div className="subscription-form">
            <h3 className="border-bottom add-form-label">Choose your your ad campaign plan</h3>
        
            <div className="subscription-form-cards ">
              
                <ul className="nav nav-tabs d-flex justify-content-between border-bottom-0" id="myTab" role="tablist">
                        <li className="nav-tab card-tab">
                            <a className=" nav-link card-link active " id={`headingBasic`} data-toggle="tab" href="#tabBasic" role="tab" aria-controls="tabBasic" aria-selected="true">
                                <div className="d-flex card-heading justify-content-center"   >
                                    <i className="fas mr-3 mb-2 fa-star"></i>
                                    <h1 className=" font-weight-bold">Basic</h1>
                                </div>
                            </a>
                        </li>
                        <li className="nav-tab card-tab">
                            <a className="nav-link card-link " id={`headingPremium`} data-toggle="tab" href="#tabPremium" role="tab" aria-controls="tabPremium" aria-selected="true">
                                <div className="d-flex card-heading justify-content-center "  >
                                    <i className="fas mr-3 mb-2 fa-crown"></i>
                                    <h1 className=" font-weight-bold">Premium</h1>
                                </div>
                            </a>
                        </li>
                        <li className="nav-tab card-tab">
                            <a className="nav-link card-link " id={`headingDeluxe`} data-toggle="tab" href="#tabDeluxe" role="tab" aria-controls="tabDeluxe" aria-selected="true">
                                <div className="d-flex card-heading justify-content-center "  >
                                    <i className="fas mr-3 mb-2 fa-dice-d20"></i>
                                    <h1 className=" font-weight-bold">Deluxe</h1>
                                </div>
                            </a>                   
                        </li>
                </ul>

                <div className="tab-content subscription-form-cards-body-container " id="myTabContent">
                    <SubscriptionFormCard 
                        showCard={showCard}
                        planName="Basic" 
                        price="0"
                        desc="Lorem ipsum dolor sit, amet consectetur adipisicing elit ipsum dolor sit, amet consectetur adipisicing elit \"
                        listing={basicListing}
                        btnText="Go to ad manager"
                        iconClass="fa-star"
                        selectSubscriptionPlan = {(planName) => setSelectedPlan(planName)}
                        selectedPlan={selectedPlan}
                        />

                    <SubscriptionFormCard 
                        showCard={showCard}
                        planName="Premium" 
                        price="15"
                        // desc="Lorem ipsum dolor sit, amet consectetur adipisicing elit"
                        listing={basicListing}
                        btnText="Update to Premium"
                        iconClass="fa-crown"
                        selectSubscriptionPlan = {(planName) => setSelectedPlan(planName)}
                        selectedPlan={selectedPlan}
                        />

                    <SubscriptionFormCard
                        showCard={showCard}
                        planName="Deluxe" 
                        price="50"
                        desc="Lorem ipsum dolor sit, amet consectetur adipisicing elit Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui aliquid officia dicta ullam nesciunt recusandae nemo? Optio ducimus praesentium mollitia?
                        "
                        listing={basicListing}
                        btnText="Select Deluxe"
                        iconClass="fa-dice-d20"
                        selectSubscriptionPlan = {(planName) => setSelectedPlan(planName)}
                        selectedPlan={selectedPlan}
                        />  

                </div>

                

            {/* </div> */}
        </div>
    
    </div>
    )
}

export default Subscription;
