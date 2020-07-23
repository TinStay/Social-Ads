import React,{ useState, useEffect } from 'react';
import {Tabs, Tab} from 'react-bootstrap'
import pagePhoto from '../../../../../assets/pagePhoto.jpg'
import jsAd from '../../../../../assets/jsAd.jpg'

const AdViewFb = (props) => {
    const [key, setKey] = useState('facebook');

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
                            <div className="col-md-12 primary-text">
                                {props.primaryText}
                            </div>
                        </div>
                        <div className="ad-image">
                            <img src={jsAd} alt="Ad picture"/>
                        </div>
                        <div className=" row ad-description pt-2">
                            <div className="col-md-8 ">
                                <p className="url">{props.url}</p>
                                <h1 className="headline">{props.headline}</h1>
                                <p className="desc">{props.description}</p>
                            </div>
                            <div className="col-md-4 ">
                                <button disabled className="btn  btn-outline-secondary">LEARN MORE</button>
                            </div>
                        </div>
                    
                    
                    </div>
                </Tab> : null}
            {props.runOnPlatforms.includes("runOnInstagram") ? 
                <Tab eventKey="instagram" title="Instagram view">
                    <div className="fb-ad-form-view-instagram">
                        <div className="row head">
                            <div className="col-md-11 d-flex">
                                <img src={pagePhoto} alt="pagePhoto"/>
                                <div>
                                    <h1>Discover new people</h1>
                                    <p>Sponsored</p>
                                    
                                </div>
                            </div>
                            <div class="col-md-1">
                                <span className="three-dots">&#8230;</span>
                            </div>
                        </div>
                        <div className="ad-image">
                            <img src={jsAd} alt="Ad picture"/>
                        </div>
                        <div className=" row ad-description ">
                            <div class="blue-field row justify-content-between m-0">
                                <p className="blue-field-title">Shop now</p>
                                <span className="blue-field-arrow">&#x203A;</span>
                            </div>
                        </div>
                    
                    
                    </div>
                </Tab>
            : null}
           
        </Tabs>


        
    );
}

export default AdViewFb;