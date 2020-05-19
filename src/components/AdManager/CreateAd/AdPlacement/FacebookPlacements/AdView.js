import React,{ useState, useEffect } from 'react';
import pagePhoto from '../../../../../assets/pagePhoto.jpg'
import jsAd from '../../../../../assets/jsAd.jpg'

const AdView = (props) => {


    return(
        <div className="fb-ad-form-view">
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
                    <p className="url">https://tinstay.herokuapp.com/</p>
                    <h1 className="headline">JavaScript course for beginners</h1>
                    <p className="desc">Learn the basics of web development</p>
                </div>
                <div className="col-md-4 ">
                    <button disabled className="btn  btn-outline-secondary">LEARN MORE</button>
                </div>
            </div>
        
            
        </div>
    );
}

export default AdView;