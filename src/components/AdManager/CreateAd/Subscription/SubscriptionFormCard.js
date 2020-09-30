import React from 'react';

const SubscriptionFormCard = (props) => {


    let iconClasses=["fas mr-3 mb-2", props.iconClass]


    return(



                <div  className={`tab-pane fade row ${props.showCard === props.title ? "show active" : null}`} id={`tab${props.title}`} aria-labelledby={`heading${props.title}`} data-parent={`#heading${props.title}`}>
                        <div className="col-md-6 ">                
                            <h3 className="h4">Includes: </h3>
                            <ul className="list text-left"> 
                                {props.listing.map( li =>{
                                    return <li><i className="fas fa-check"></i> {li}</li>
                                })}
                            </ul>
                        </div>
                        <div className="col-md-6">
                            <h3 className="h4">Description</h3>
                            <p className="description">{props.desc}</p>
                            <div className="text-center">
                                
                                <button className="btn button">{props.btnText}</button>
                            </div>
                        </div>
                </div>
            /* </div> */



    )
}

export default SubscriptionFormCard;


