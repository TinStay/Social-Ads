import React,{ useState } from 'react';
import Auxilliary from '../../../../hoc/Auxilliary';
import { Form } from 'react-bootstrap';

import facebookAds from '../../../../assets/facebookAds.png';
import instagramAds from '../../../../assets/instagramAds.png';
import googleAds from '../../../../assets/adsGoogle.png';
import twitterAds from '../../../../assets/twitterAds.png';


const SocialPlatforms = (props) => {

    return(
        <div className="add-form-group">
            <h3 className="border-bottom add-form-label">Select social media platforms</h3>
            <div className="social-media-selection d-md-flex justify-content-between">
                <div className="social-media-box">
                    <Form.Check
                        custom
                        inline
                        label=""
                        type="checkbox"
                        id={`custom-inline-checkbox-facebook`}
                        className="checkbox-big"
                        name="runOnFacebook"
                        defaultChecked={props.platforms.includes('runOnFacebook') ? true : false}
                        onClick={(e) => props.changeSMPInfo(e)}
                    />
                    <img className="img-slim" src={facebookAds} alt="Facebook ads"/>
                </div>
                <div className="social-media-box">
                    <Form.Check
                        custom
                        inline
                        label=""
                        type="checkbox"
                        id={`custom-inline-checkbox-insta`}
                        className="checkbox-big"
                        name="runOnInstagram"
                        defaultChecked={props.platforms.includes('runOnInstagram') ? true : false}
                        onClick={(e) => props.changeSMPInfo(e)}
                    />
                    <img className="img-slim" src={instagramAds} alt="Instagram Ads"/>
                </div>
                <div className="social-media-box">
                    <Form.Check
                        custom
                        inline
                        label=""
                        type="checkbox"
                        id={`custom-inline-checkbox-google`}
                        className="checkbox-big"
                        name="runOnGoogle"
                        defaultChecked={props.platforms.includes('runOnGoogle') ? true : false}
                        onClick={(e) => props.changeSMPInfo(e)}
                    />
                    <img className="img-box" src={googleAds} alt="Google Ads"/>
                </div>
                {/* <div className="social-media-box">
                    <Form.Check
                        custom
                        inline
                        label=""
                        type="checkbox"
                        id={`custom-inline-checkbox-twitter`}
                        className="checkbox-big"
                        name="runOnTwitter"
                        onClick={(e) => props.changeSMPInfo(e)}
                    />
                    <img className="img-box"src={twitterAds} alt="Twitter Ads"/>
                </div> */}
            </div>
        </div>
    );
}

export default SocialPlatforms;