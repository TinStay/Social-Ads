import React,{ useState } from 'react';
import Auxilliary from '../../../../hoc/Auxilliary';
import { Form } from 'react-bootstrap';

import facebookAds from '../../../../assets/facebookAds.png'
import instagramAds from '../../../../assets/instagramAds.png'
import googleAds from '../../../../assets/adsGoogle.png'
import twitterAds from '../../../../assets/twitterAds.png'

const SocialPlatforms = (props) => {
    const [runOnFacebook, setRunOnFacebook] = useState(false)
    const [runOnInstagram, setRunOnInstagram] = useState(false)
    const [runOnGoogle, setRunOnGoogle] = useState(false)

    // const changeSMPInfo = (e) => {
        
    //     if(e.target.checked){ 
    //     switch(e.target.name){
    //         case "runOnFacebook":
    //             setRunOnFacebook(true)
    //         case "runOnInstagram":
    //             setRunOnInstagram(true)
    //         case "runOnGoogle":
    //             setRunOnGoogle(true)
    //     }
    // }

        

    //     // props.changeSMPInfo(e)
    // }

    // if(runOnFacebook && runOnInstagram && runOnGoogle === false){
    //     console.log("You need to select at least 1 social media platform")
    // }

    

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
                        chacked={runOnFacebook}
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
                        chacked={runOnInstagram}
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
                        chacked={runOnGoogle}
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