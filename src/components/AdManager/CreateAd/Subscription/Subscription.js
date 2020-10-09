import React, { useState, useEffect} from 'react';
import SubscriptionFormCard from './SubscriptionFormCard';
import { Button } from "react-bootstrap";

// Redux
import { connect } from 'react-redux';
import * as actionTypes from '../../../../store/actions/actionTypes';
import { propTypes } from 'react-bootstrap/esm/Image';

const Subscription = (props) => {

    // Plan Listings
    const basicListing = ["Run your ads with your budget", "Ad design and message is up to you", "Run multiple ad campaigns", "Get 1 post in our social media account", "Choose when to run your ads", "Get notifications for your ad campaigns"];

    // Currently displayed to the user plan
    const [showCard, setShowCard]  = useState("Basic");

    // Currently selected plan
    const [selectedPlan, setSelectedPlan] = useState("");

    useEffect(() => {
        if(props.state.subscriptionPlan != ""){
            setShowCard(props.state.subscriptionPlan);
            setSelectedPlan(props.state.subscriptionPlan);
        }
    },[props.state.subscriptionPlan]);

    // Save to state and to redux state
    const selectPlan = (planName) => {
        setSelectedPlan(planName);
        props.saveSubscriptionPlan(planName);    
    }

    let cardLinkBasicClass = `nav-link card-link ${showCard == "Basic" ? "active" : null}`;
    let cardLinkPremiumClass = `nav-link card-link ${showCard == "Premium" ? "active" : null}`;
    let cardLinkDeluxeClass = `nav-link card-link ${showCard == "Deluxe" ? "active" : null}`;

    console.log(cardLinkBasicClass.includes("active"), cardLinkPremiumClass.includes("active"),  cardLinkDeluxeClass.includes("active"));

    return(
        <div className="subscription-form">
            <h3 className="border-bottom add-form-label">Choose your your ad campaign plan</h3>

            <div class="subscription-form-heading-plans col-md-10 offset-md-1 text-center">
                <p>Our subscriptions plans include a lot of helpful services and advices about 
                    running online adds. Obcaecati magnam eius perferendis vel</p>
            </div>

            <div className="subscription-form-cards ">
              
                <ul className="nav nav-tabs d-flex justify-content-between border-bottom-0" id="myTab" role="tablist">
                        <li className="nav-tab card-tab">
                            <a className={cardLinkBasicClass} id={`headingBasic`} data-toggle="tab" href="#tabBasic" role="tab" aria-controls="tabBasic" aria-selected="true">
                                <div className="d-flex card-heading justify-content-center" >
                                    <i className="fas mr-3 mb-2 fa-star"></i>
                                    <h1 className=" font-weight-bold">Basic</h1>
                                </div>
                            </a>
                        </li>
                        <li className="nav-tab card-tab">
                            <a className={cardLinkPremiumClass} id={`headingPremium`} data-toggle="tab" href="#tabPremium" role="tab" aria-controls="tabPremium" aria-selected="true">
                                <div className="d-flex card-heading justify-content-center " >
                                    <i className="fas mr-3 mb-2 fa-crown"></i>
                                    <h1 className=" font-weight-bold">Premium</h1>
                                </div>
                            </a>
                        </li>
                        <li className="nav-tab card-tab">
                            <a className={cardLinkDeluxeClass} id={`headingDeluxe`} data-toggle="tab" href="#tabDeluxe" role="tab" aria-controls="tabDeluxe" aria-selected="true">
                                <div className="d-flex card-heading justify-content-center " >
                                    <i className="fas mr-3 mb-2 fa-dice-d20"></i>
                                    <h1 className=" font-weight-bold">Deluxe</h1>
                                </div>
                            </a>                   
                        </li>
                </ul>

                <div className="tab-content subscription-form-cards-body-container " id="myTabContent">
                    <SubscriptionFormCard 
                        planName="Basic" 
                        price="0"
                        desc="Lorem ipsum dolor sit, amet consectetur adipisicing elit ipsum dolor sit, amet consectetur adipisicing elit \"
                        listing={basicListing}
                        btnText="Go to ad manager"
                        iconClass="fa-star"
                        selectSubscriptionPlan = {(planName) => selectPlan(planName)}
                        selectedPlan={selectedPlan}
                        />

                    <SubscriptionFormCard 
                        planName="Premium" 
                        price="15"
                        // desc="Lorem ipsum dolor sit, amet consectetur adipisicing elit"
                        listing={basicListing}
                        btnText="Update to Premium"
                        iconClass="fa-crown"
                        selectSubscriptionPlan = {(planName) => selectPlan(planName)}
                        selectedPlan={selectedPlan}
                        />

                    <SubscriptionFormCard
                        planName="Deluxe" 
                        price="50"
                        desc="Lorem ipsum dolor sit, amet consectetur adipisicing elit Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui aliquid officia dicta ullam nesciunt recusandae nemo? Optio ducimus praesentium mollitia?
                        "
                        listing={basicListing}
                        btnText="Select Deluxe"
                        iconClass="fa-dice-d20"
                        selectSubscriptionPlan = {(planName) => selectPlan(planName)}
                        selectedPlan={selectedPlan}
                        />  

                </div>

                
                <div class="only-run-section ">
                    <p class="or-divider w-100 border-bottom text-center">
                        OR
                    </p>
                    <div class="only-run-section-heading col-md-10 offset-md-1 text-center">
                        <p>Our subscriptions plans include a lot of helpful services and advices about 
                            running online adds. Obcaecati magnam eius perferendis vel</p>
                    </div>
                </div>

                <div className="d-flex justify-content-end">
                    <button onClick={() => props.handleBack()} className="btn btn-cancel" type="submit">
                        Back
                    </button>
                    <Button variant="contained" className="btn btn-next">
                        Go to checkout
                    </Button>
                </div>

                

            {/* </div> */}
        </div>
    
    </div>
    )
}

const mapStateToProps = state => {
    return{
        adInfo: state.adInfo,
        state: state
    }
}

const mapDispatchToProps = dispatch => {
    return{
        saveSubscriptionPlan: (plan) => dispatch({type: actionTypes.SAVE_SUBSCRIPTION_PLAN, plan: plan})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Subscription);
