import React from 'react';

const SubscriptionFormCard = (props) => {

    let selectButtonDisabled = {
        "cursor": "context-menu",
    }

    const selectPlan = (e) => {
        e.preventDefault();

        // Pass current plan to be saved in Subscription component
        props.selectSubscriptionPlan(props.planName);
    };

    let isCardActive = "false";
    if(props.selectedPlan != ""){

    } 

    return(
        
                <div className={`tab-pane fade card-body ${props.selectedPlan != "" ? props.selectedPlan === props.planName ? "show active" : null : props.planName == "Basic" ? "show active" : null} `} id={`tab${props.planName}`} aria-labelledby={`heading${props.planName}`} data-parent={`#heading${props.planName}`}>
                        <div className="row  ">
                            <div className="col-md-6 ">                
                                <h3 className="h4">Includes: </h3>
                                <ul className="list text-left"> 
                                    {props.listing.map( li =>{
                                        return <li><i className="fas fa-check"></i> {li}</li>
                                    })}
                                </ul>
                            </div>

                            <div className="col-md-6 position-relative ">
                                <h3 className="h4">Description</h3>
                                <p className="description">{props.desc}</p>
                                <div className="col-12 text-center select-btn">
                                    <button onClick={(e) => selectPlan(e)} disabled={props.selectedPlan === props.planName ? true: false} className="btn button">{props.selectedPlan === props.planName ? "Selected" : props.btnText}</button>
                                </div>
                            </div>

                            
                        </div>
                        

                        
                       

                </div>
            /* </div> */



    )
}

export default SubscriptionFormCard;

