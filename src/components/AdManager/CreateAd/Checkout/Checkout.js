import React, { useState, useEffect} from 'react';
import { Button } from "react-bootstrap";
import CheckoutBox from './CheckoutBox';
import AdViewFb from '../AdPlacement/FacebookPlacements/AdViewFb';
import AdViewGoogle from '../AdPlacement/GoogleAd/AdViewGoogle'
import FbAdViewModal from './FbAdViewModal';

// Icons
import facebookAds from '../../../../assets/facebookIcon.png';
import instagramAds from '../../../../assets/instagramIcon.png';
import googleAds from '../../../../assets/googleIcon.png';

// Redux
import { connect } from 'react-redux';
import * as actionTypes from '../../../../store/actions/actionTypes';

const Checkout = (props) => {
    // Facebook and Instagram ad view modal
    const [fbModalShow, setFbModalShow] = useState(false);

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

    let selectedPlacements = {...adInfo.facebookAd.placements};
    // Array for storing only the chosen placements
    let placementsToShow = [];
    const lastPlacement = selectedPlacements.custom[selectedPlacements.custom.length - 1];

    if(selectedPlacements.automatic){
        // Add only 1 value if placements are automatic
        placementsToShow.push("Automatic");
    } else {
        // Add all placements names
        selectedPlacements.custom.map(placement => {
            if(placement.checked){
                // Push labels to be displayed
                switch(placement.name){
                    case "newsFeed":
                        placementsToShow.push("News feed");
                        break;
                    case "marketplace":
                        placementsToShow.push("Marketplace");
                        break;
                    case "videoFeeds":
                        placementsToShow.push("Video Feeds");
                        break;
                    case "rightColumn":
                        placementsToShow.push("Right Column");
                        break;
                    case "stories":
                        placementsToShow.push("Stories");
                        break;
                }
               
            }
        })
    }

  
    // Redux state to variable
    let schedule = {...props.adInfo.budgetAndSchedule.schedule};
    let isCustom = false;
    // String to display 
    let scheduleTypeString = "Schedule not set";

    if( schedule.asapSchedule){
        scheduleTypeString = "Run as soon as possible";
    }else if(schedule.customSchedule){
        isCustom = true;
        scheduleTypeString = "From; To;";
    }


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
                                            if(location == audience.location[audience.location.length - 1]){
                                                return location.name;
                                            }else{
                                                return location.name + "; ";
                                            }
                                       
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
                                        if(interest == audience.interests[audience.interests.length - 1]){
                                            return interest.label;
                                        }else{
                                            return interest.label + ", ";
                                        }

                                       
                                    })}
                                    </p>

                                </div>
                            </div>
                           
                            
                           
                        </div>
                    </CheckoutBox>
                </div>
                <div className="col-md-6">
                    <CheckoutBox>
                    <h3 className="checkout-box-heading">Placements and design</h3>
                    <div class="row">
                        <div className="col-md-12 checkout-box-placements-container">
                            <div className="row">
                                <div className="col-3">
                                    <p className="key">Devices: </p>
                                </div>
                                <div className="col-9 gray">
                                    <p>
                                    {adInfo.devices.map(device =>{
                                        if(device == adInfo.devices[adInfo.devices.length - 1]){
                                            return device;
                                        }else{
                                            return device + ", ";
                                        }
                                    })}
                                    </p>
                                </div>
                                
                            </div>
                            <div className="row">
                                <div className="col-3">
                                    <p className="key">Website url: </p>
                                </div>
                                <div className="col-9 gray">
                                    <p>{adInfo.url}</p>
                                </div>
                                
                            </div>
                            <div className="row">
                                <div className="col-5 col-md-4">
                                    <p className="key">Placements: </p>
                                </div>
                                <div className="col-7 col-md-8 gray">
                                    <p>
                                        {placementsToShow.map(placement =>{
                                            if(placement == placementsToShow[placementsToShow.length - 1]){
                                                return <span key={placement}>{placement}</span>
                                            }else{
                                                return <span key={placement}>{placement}; </span>
                                            }
                                            })
                                        }
                                    </p>
                                    
                                </div>
                                
                            </div>
                            {props.adInfo.runOn.includes("runOnGoogle") ?
                            (<div>
                                <div> 
                                    <p className="key">Google ad view: </p>
                                </div>
                                <div className="col-12 ">
                                    <AdViewGoogle 
                                    headlineOne={props.googleAd.headlineOne ? props.googleAd.headlineOne : "Headline 1 |"}
                                    headlineTwo={props.googleAd.headlineTwo ? props.googleAd.headlineTwo : "Headline 2 |"}
                                    headlineThree={props.googleAd.headlineThree ? props.googleAd.headlineThree : "Headline 3"}
                                    description={props.googleAd.description ? props.googleAd.description : "Your description will be shown here"}
                                    url={props.adInfo.url ? props.adInfo.url : "yourwebsite.com"}
                                    />                                  
                                </div>
                            </div>)
                            : null}

                            {/* Facebook and Instagram */}
                            {props.adInfo.runOn.includes("runOnFacebook") || props.adInfo.runOn.includes("runOnInstagram") ? 
                            <div>
                                <div className="row">
                                    <div className="col-md-4">
                                        <p className="key">Facebook ad view:</p>
                                    </div>
                                    <div class="col-md-8">
                                        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#FbAdView">
                                            View
                                        </button>
                                    </div>
                                </div>
                                <FbAdViewModal
                                    show={fbModalShow}
                                    onHide={() => setFbModalShow(false)}
                                    // Ad view specific
                                    runOnPlatforms={props.adInfo.runOn}
                                    adDetails={props.adDetails}
                                    pictureOrVideoUrl={props.adInfo.facebookAd.pictureOrVideoUrl ? props.adInfo.facebookAd.pictureOrVideoUrl : null}
                                    headline={props.adDetails[0] ? props.adDetails[0].value : null}
                                    description={props.adDetails[1] ? props.adDetails[1].value : null}
                                    url={props.adInfo.url ? props.adInfo.url : null}>
                                </FbAdViewModal>
                            </div>
                            : null}
                        </div>
                        
                    </div>
                    
                    </CheckoutBox>
                </div>
                
                <div className="col-md-6">
                    <CheckoutBox>
                    <h3 className="budget-box-heading">Budget and schedule</h3>
                    <div class="row">
                        <div className="col-md-6 checkout-box-budget-container">
                            <div className="row">
                                <div className="col-3">
                                    <p className="key">Schedule: </p>
                                </div>
                                <div className="col-9 gray">
                                    <p>
                                        {scheduleTypeString}
                                    </p>
                                </div>
                                
                            </div>
                            <div className="row">
                                <div className="col-3">
                                    <p className="key">Lifetime: </p>
                                </div>
                                <div className="col-9 gray">
                                    <p></p>
                                </div>
                                
                            </div>
                            <div className="row">
                                <div className="col-5 col-md-4">
                                    <p className="key">Schedule: </p>
                                </div>
                                <div className="col-7 col-md-8 gray">
                                    <p>
                                       
                                    </p>
                                    
                                </div>
                                
                            </div>
                          
                            
                            
                        </div>
                       
                    </div>
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
        adDetails: state.adInfo.facebookAd.adDetails,
        googleAd: state.adInfo.googleAd
    }
}

const mapDispatchToProps = dispatch => {
    return{
        // saveSubscriptionPlan: (plan) => dispatch({type: actionTypes.SAVE_SUBSCRIPTION_PLAN, plan: plan})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
