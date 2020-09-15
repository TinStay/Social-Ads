import React from 'react';

const SubscriptionCardForm = (props) => {


    let iconClasses=["fas mr-3 mb-2", props.iconClass]

    return(
        <div className="subscription-form-card row">
            <div className="col-12 d-flex border-bottom">
                <i className={iconClasses.join(" ")}></i>
                <h1 className=" font-weight-bold pb-2">{props.title}</h1>
            </div>
            <div className="col-md-6">                
                <h3 className="h4">Includes: </h3>
                <ul className="list text-left"> 
                    {props.listing.map( li =>{
                        return <li><i class="fas fa-check"></i> {li}</li>
                    })}
                </ul>
            </div>
            <div class="col-md-6">
                <h3 className="h4">Description</h3>
                <p className="description">{props.desc}</p>
                <div class="text-center">
                    <h1>${props.price} <span className="h4">/ month</span> </h1>
                    <button className="btn button">{props.btnText}</button>
                </div>
            </div>

            
        </div>
    )
}

export default SubscriptionCardForm;
