import React, { useState, useEffect} from 'react';
import { Button } from "react-bootstrap";
import CheckoutBox from './CheckoutBox';

// Icons
import facebookAds from '../../../../assets/facebookIcon.png';
import instagramAds from '../../../../assets/instagramIcon.png';
import googleAds from '../../../../assets/googleIcon.png';

// Redux
import { connect } from 'react-redux';
import * as actionTypes from '../../../../store/actions/actionTypes';

const Checkout = (props) => {
    const runOnPlatform = [...props.adInfo.runOn];

    // Array with images
    let runOnPlatformsIcons = [];

    if(runOnPlatform.includes("runOnFacebook")){
        runOnPlatformsIcons.push(facebookAds);
    }

    if(runOnPlatform.includes("runOnInstagram")){
        runOnPlatformsIcons.push(instagramAds);
    }

    if(runOnPlatform.includes("runOnGoogle")){
        runOnPlatformsIcons.push(googleAds);
    }

    console.log(runOnPlatformsIcons);
    
    return(
        <div>
            <h3 className="border-bottom add-form-label">Checkout</h3>
            <div className="row">
                <div className="col-md-6">
                    <CheckoutBox>
                        <h3 className="checkout-box-heading">General info</h3>
                        <div className="checkout-box-info-container">
                            <div className="row">
                                <div className="col-4">
                                    <p>Ad campaign: </p>
                                </div>
                                <div className="col-8">
                                    <p>{props.adInfo.name}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-4">
                                    <p>Social platforms: </p>
                                </div>
                                <div className="col-8">
                                    <p>{runOnPlatformsIcons.map(icon => {
                                        return <img className="smpIcon" src={icon} alt="social media icon"/>
                                    })}
                                    </p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-4">
                                    <p>Marketing goal: </p>
                                </div>
                                <div className="col-8">
                                    <p>{props.adInfo.marketingGoal}</p>
                                </div>
                            </div>
                           
                            
                           
                        </div>
                    </CheckoutBox>
                </div>
                <div class="col-md-6">
                    <CheckoutBox>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis incidunt molestias optio iure nesciunt, sit accusamus rem dolores ipsum minima!</p>
                    </CheckoutBox>
                </div>
                <div class="col-md-6">
                    <CheckoutBox>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis incidunt molestias optio iure nesciunt, sit accusamus rem dolores ipsum minima!</p>
                    </CheckoutBox>
                </div>
                <div class="col-md-6">
                    <CheckoutBox>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis incidunt molestias optio iure nesciunt, sit accusamus rem dolores ipsum minima!</p>
                    </CheckoutBox>
                </div>
            </div>

            <div className="d-flex justify-content-end">
                <button onClick={() => props.handleBack()} className="btn btn-cancel" type="submit">
                    Back
                </button>
                <Button variant="contained" className="btn btn-next">
                    Continue
                </Button>
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
        // saveSubscriptionPlan: (plan) => dispatch({type: actionTypes.SAVE_SUBSCRIPTION_PLAN, plan: plan})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
