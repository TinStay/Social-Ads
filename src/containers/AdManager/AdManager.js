import React, {  PureComponent } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../../components/Auth/Auth";
import { Form } from 'react-bootstrap';
import facebookAds from '../../assets/facebookAds.png'
import instagramAds from '../../assets/instagramAds.png'
import googleAds from '../../assets/adsGoogle.png'
import twitterAds from '../../assets/twitterAds.png'

class AdManager extends PureComponent{
//   const {currentUser} = this.context;
//   static contextType = AuthContext;

    state = {
        ads: {},
        showForm: false
    }

    showForm = () => {
        this.setState({ showForm: true})
    }


  render(){
      let adSection = (
          <div className="row manager-ad-form-row text-center">
            <div className="col-md-6 first ">
                <h2 className="">You have no running ads at the moment</h2>
                <button onClick={this.showForm} className="btn btn-add text-align-center d-flex"><i class="far fa-plus-square"></i> Create a campaign</button>
            </div>
            
            <div className="col-md-6 second">
                <h3>Check out a tutorial how to run ads</h3>
                <button className="btn btn-watch-tutorial d-flex"><i class="fas fa-video"></i>Watch tutorial</button>
            </div>
          </div>
      ); 

      
    if(this.state.showForm){
        adSection =(
            <div className=" manager-ad-form-row">
                {/* <div className="d-block mb-5">
                    <h1 className="text-center purple border-bottom pb-2 mb-4">Start an ad campaign</h1>
                </div> */}
                <div className="ad-container">
                    <Form className="first-form">

                        <Form.Group className="first-form-group text-center" controlId="formGroupEmail">
                            <h3 className="first-form-label">Choose a name for your campaign</h3>
                            <Form.Control className="first-form-input-name " type="text" size="lg" placeholder="Enter name" />
                        </Form.Group>

                        <h3 className="border-bottom first-form-label">Choose social media platforms</h3>
                        <div className="social-media-selection d-md-flex justify-content-between">
                            <div className="social-media-box">
                                <Form.Check
                                    custom
                                    inline
                                    label=""
                                    type="checkbox"
                                    id={`custom-inline-checkbox-facebook`}
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
                                />
                                 <img className="img-box" src={googleAds} alt="Google Ads"/>
                            </div>
                            <div className="social-media-box">
                                <Form.Check
                                    custom
                                    inline
                                    label=""
                                    type="checkbox"
                                    id={`custom-inline-checkbox-twitter`}
                                />
                                <img className="img-box"src={twitterAds} alt="Twitter Ads"/>
                            </div>
                            
                        </div>

                        <div className="d-flex justify-content-end">
                            {/* <button className="btn btn-cancel">Cancel</button> */}
                            <button className="btn btn-next">Next</button>
                        </div>
                    </Form>

                </div>
            </div>
        )
    }

    return (
        <div className="manager">
            <div className="manager-jumbotron d-md-flex justify-content-between">
                <h1 className="manager-jumbotron-title purple ">Ad Dashboard</h1>
                
            </div>
            <div className="manager-ad-form">
                {adSection}
            </div>
        </div>
       );
  }
};


export default AdManager;