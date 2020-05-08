import React from 'react';
import phone from '../../assets/phone.jpg'
import facebookIcon from '../../assets/facebookIcon.png'
import instagramIcon from '../../assets/instagramIcon.png'
import googleIcon from '../../assets/googleIcon.png'
import twitterIcon from '../../assets/twitterIcon.png'
import iconsPic from '../../assets/iconsPic.png'

const InfoSection = props =>{


    return(
        <div className="info-section">
            
           <div className="row info-section-row ">
               <div className="col-xl-6 offset-xl-3 order-xl-2 text-center">
                  
                   <h2 className="info-text-container-heading">Choose social platforms</h2>
                        <p  className="info-text-container-paragraph ">Running social ads on more than one social media platform is the key to a successful ad campaign. You can choose in which platforms below you want your ads to appear.</p>
                        <ul className="info-text-container-icons ">
                            <li><img src={facebookIcon} alt="facebookIcon"/> </li>
                            <li><img src={instagramIcon} alt="instagramIcon"/> </li>
                            <li><img src={googleIcon} alt="googleIcon"/></li>
                            <li><img src={twitterIcon} alt="twitterIcon"/></li>
                        </ul>
                </div>
                
           </div>

           <div className="row info-section-row">
               <div className="col-xl-6 text-center">
                   <div className="info-text-container">
                   <div className="info-text-container">
                        <h2 className="info-text-container-heading">Fill a form and run your ads</h2>
                        <p  className="info-text-container-paragraph">Social Ads allows you to choose your target audience, your budget, in which country you want your advertisement to be run and many more.</p>

                   </div>
                   <button className="btn btn-lg info-text-container-button-border">Check out how its done</button>
                       
                   </div>
            </div>
           </div>
           <div className="row info-section-row">
                <div className="col-xl-1 text-center ml-xl-4 mb-4">
                    <img src={iconsPic} className="social-pic" alt="iconsPic"/>
               </div>
               <div className="col-xl-8  offset-xl-1 text-center">
                   <div className="info-text-container">
                        <h2 className="info-text-container-heading">Keep track of your running ads</h2>
                        <p className="info-text-container-paragraph col-lg-8">With the online Ad Manager you can create, run and track your social media advertising. 
                        We believe we have a reliable, convenient and robust tracking system which main aim is to simplify the proccess of running online ads.</p>
                        <button className="btn btn-lg info-text-container-button">Go to Ad Manager</button>
                   </div>
                </div>
                
           </div>
        </div>
    )
}

export default InfoSection;