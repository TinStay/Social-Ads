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

    let adInfo = props.adInfo;
    let audience = props.audience;
    
    return(
        <div>
            <h3 className="border-bottom add-form-label">Checkout</h3>
            <div className="row">
                {/* General Info */}
                <div className="col-md-6">
                    <CheckoutBox>
                        <h3 className="checkout-box-heading">General info</h3>
                        <div className="checkout-box-info-container">
                            <div className="row">
                                <div className="col-3">
                                    <p className="key">Campaign name: </p>
                                </div>
                                <div className="col-9 ">
                                    <p>{adInfo.name}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-3">
                                    <p className="key">Social platforms: </p>
                                </div>
                                <div className="col-9">
                                    <p>{runOnPlatformsIcons.map(icon => {
                                        return <img className="smpIcon" src={icon} alt="social media icon"/>
                                    })}
                                    </p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-3">
                                    <p className="key">Marketing goal: </p>
                                </div>
                                <div className="col-9">
                                    <p>{adInfo.marketingGoal}</p>
                                </div>
                            </div>
                           
                            
                           
                        </div>
                    </CheckoutBox>
                </div>
                {/* Audience */}
                <div class="col-md-6">
                    <CheckoutBox>
                        <h3 className="checkout-box-heading">Audience</h3>
                        <div className="checkout-box-audience-container">
                            <div className="row">
                                <div className="col-3">
                                    <p className="key">Locations: </p>
                                </div>
                                <div className="col-9 ">
                                    <p>
                                        {audience.location.map(location =>{
                                        return location.name + "; ";
                                        })}
                                    </p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-3">
                                    <p className="key">Gender: </p>
                                </div>
                                <div className="col-9">
                                    <p>{audience.gender != null ? audience.gender.label : "All"}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-3">
                                    <p className="key">Age from: </p>
                                </div>
                                <div className="col-9">
                                    <p>{audience.ageFrom}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-3">
                                    <p className="key">Age to: </p>
                                </div>
                                <div className="col-9">
                                    <p>{audience.ageTo}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-3">
                                    <p className="key">Interests: </p>
                                </div>
                                <div className="col-9">
                                    <p>
                                    {audience.interests.map(interest =>{
                                        return interest.label + ", ";
                                    })}
                                    </p>
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
        audience: state.audience,
    }
}

const mapDispatchToProps = dispatch => {
    return{
        // saveSubscriptionPlan: (plan) => dispatch({type: actionTypes.SAVE_SUBSCRIPTION_PLAN, plan: plan})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
