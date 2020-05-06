import React from 'react';
import phone from '../../assets/phone.jpg'

const InfoSection = props =>{


    return(
        <div className="info-section">
            
           <div className="row info-section-row">
               <div className="col-xl-6 offset-xl-3 text-center">
                   <div className="info-text-container">
                        <h2 className="info-text-container-heading">Fill a form and run your ads</h2>
                        <p  className="info-text-container-paragraph">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam, quaerat? Cupiditate enim ullam quae ipsam eum rerum maiores quidem eos.</p>
                        <button className="btn btn-lg info-text-container-button">Learn more</button>
                   </div>
            </div>
           </div>
           <div className="row info-section-row">
               <div className="col-xl-6  text-center">
                   <div className="info-text-container">
                        <h2 className="info-text-container-heading">Choose a social platform</h2>
                        <p  className="info-text-container-paragraph">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam, quaerat? Cupiditate enim ullam quae ipsam eum rerum maiores quidem eos.</p>
                        <button className="btn btn-lg info-text-container-button">Learn more</button>
                   </div>
            </div>
           </div>
           <div className="row info-section-row">
               <div className="col-xl-6 offset-xl-3 text-center">
                   <div className="info-text-container">
                        <h2 className="info-text-container-heading">Keep track of your running ads</h2>
                        <p  className="info-text-container-paragraph">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam, quaerat? Cupiditate enim ullam quae ipsam eum rerum maiores quidem eos.</p>
                        <button className="btn btn-lg info-text-container-button">Learn more</button>
                   </div>
            </div>
           </div>
        </div>
    )
}

export default InfoSection;