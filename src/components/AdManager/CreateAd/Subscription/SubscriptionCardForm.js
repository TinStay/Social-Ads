import React from 'react';

const SubscriptionCardForm = (props) => {


    let iconClasses=["fas ml-3 mb-2", props.iconClass]

    return(
        <div className="subscription-form-card row">
            <div className="col-md-6">
                <div className="d-flex border-bottom">
                    <i className={iconClasses.join(" ")}></i>
                    <h1 className=" font-weight-bold pb-2">{props.title}</h1>
                </div>
                <div class="row">
                    <h1>${props.price} <span className="h4">/ month</span> </h1>
                    <button className="btn button">{props.btnText}</button>
                </div>
                
            </div>
            <div class="col-md-6">
                <p>Includes: </p>
                <ul className="list text-left">
                    {props.listing.map( li =>{
                        return <li><i class="fas fa-check"></i> {li}</li>
                    })}
                </ul>
            </div>

            {/* <p className="p">{props.desc}</p> */}
        </div>
    )
}

export default SubscriptionCardForm;
