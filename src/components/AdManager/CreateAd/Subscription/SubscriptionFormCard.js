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

    let activeCardClasses = null ;
    if(props.shownCard == props.planName){
        activeCardClasses = "show active";
    } 
    else if(props.selectedPlan == "onlyRunAds"  && props.shownCard == props.planName){
        activeCardClasses = "show active";
    } 
    // else if (props.planName == "Basic"){
    //     activeCardClasses = "show active";
    // }

    return(
        
                <div className={`tab-pane fade card-body ${activeCardClasses} `} id={`tab${props.planName}`} aria-labelledby={`heading${props.planName}`} data-parent={`#heading${props.planName}`}>
                        <div className="row  ">
                            <div className="col-md-6 ">                
                                <h3 className="h4">Includes: </h3>
                                <ul className="list text-left"> 
                                    {props.listing.map( li =>{
                                        return <li key={li}><i className="fas fa-check"></i> {li}</li>
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


