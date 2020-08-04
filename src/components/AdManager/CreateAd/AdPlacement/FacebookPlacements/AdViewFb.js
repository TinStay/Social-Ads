import React,{ useState, useEffect } from 'react';
import {Tabs, Tab} from 'react-bootstrap'
import pagePhoto from '../../../../../assets/pagePhoto.jpg'
import jsAd from '../../../../../assets/jsAd.jpg'
import saveIconInstagram from '../../../../../assets/saveIconInstagram.png'
import instagramIcons from '../../../../../assets/instagramIcons.png'

const AdViewFb = (props) => {
    const [key, setKey] = useState('facebook');

    useEffect(() => {
        if(props.runOnPlatforms.includes("runOnInstagram") && !props.runOnPlatforms.includes("runOnFacebook")){
            setKey("instagram")
        }
    }, [])

    let buttonLabel = {value: "Learn more"}

    if(props.adDetails[props.adDetails.length-1] != null){
        buttonLabel = props.adDetails[props.adDetails.length-1]
    }

    console.log(buttonLabel)

    return(
        <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)} 
            >
            {props.runOnPlatforms.includes("runOnFacebook") ? 
                <Tab eventKey="facebook" title="Facebook view">
                    <div className="fb-ad-form-view-facebook">
                        <div className="row head">
                            <div className="col-md-12 d-flex">
                                <img src={pagePhoto} alt="pagePhoto"/>
                                <div>
                                    <h1>Discover new people</h1>
                                    <p>Sponsored - <span><i class="fas fa-globe-europe"></i></span></p>
                                    
                                </div>
                            </div>
                            <div className="col-md-12 description">
                                {props.description}
                            </div>
                        </div>
                        <div className="ad-image">
                            <img src={props.pictureOrVideo ? props.pictureOrVideo : jsAd} alt="Ad picture"/>
                        </div>
                        <div className=" row ad-description pt-2">
                            <div className="col-md-8 ">
                                <p className="url">{props.url}</p>
                                <h1 className="headline">{props.headline}</h1>
                                {/* <p className="desc">{props.description}</p> */}
                            </div>
                            <div className="col-md-4 ">
                                <button disabled className="btn btn-outline-secondary">{buttonLabel.value}</button>
                            </div>
                        </div>
                    
                    
                    </div>
                </Tab> : null}
            {props.runOnPlatforms.includes("runOnInstagram") ? 
                <Tab eventKey="instagram" title="Instagram view">
                    <div className="fb-ad-form-view-instagram">
                        <div className="row head">
                            <div className="col-11 d-flex">
                                <img src={pagePhoto} alt="pagePhoto"/>
                                <div>
                                    <h1>Discover daily</h1>
                                    <p>Sponsored</p>
                                    
                                </div>
                            </div>
                            <div class="col-1">
                                <span className="three-dots">&#8230;</span>
                            </div>
                        </div>
                        <div className="ad-image">
                            <img src={props.pictureOrVideo ? props.pictureOrVideo : jsAd} alt="Ad picture"/>
                        </div>
                        <div className="row ad-description">
                            <div class="blue-field row justify-content-between m-0">
                                <p className="blue-field-title">{buttonLabel.value}</p>
                                <span className="blue-field-arrow">&#x203A;</span>
                            </div>
                        </div>
                        <div className="d-flex ad-icons">
                            <div class="like-comment-share-icons d-flex justify-content-between">
                                <img src={instagramIcons} className="icon" alt="likeIconInstagram" />
                                {/* <img src={commentIconInstagram} className="commentIcon" alt="commentIconInstagram" />
                                <img src={likeIconInstagram} className="icon" alt="likeIconInstagram" /> */}
                            </div>
                            <img src={saveIconInstagram} className="saveIcon" alt="saveIconInstagram" />
                        </div>
                        <div class="views-section">
                            <p>125,406 views</p>
                        </div>
                        <div class="description-section ">
                            <p className="description"><span className="account-name">discoverdaily </span>{props.description}</p>
                        </div>
                    
                    </div>
                </Tab>
            : null}
           
        </Tabs>


        
    );
}

export default AdViewFb;