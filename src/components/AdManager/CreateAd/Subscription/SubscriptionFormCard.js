import React from 'react';

const SubscriptionFormCard = (props) => {


    let iconClasses=["fas mr-3 mb-2", props.iconClass]

    let id = `collapse${props.title}`;

    return(

            <div className="subscription-form-card row ">
                <div className="card-header col-12 d-flex justify-content-between" id={`heading${props.title}`}  data-toggle="collapse" 
                href={`#collapse${props.title}`} role="button" aria-expanded="false" aria-controls={`collapse${props.title}`}>
                    <div className="d-flex">
                        <i className={iconClasses.join(" ")}></i>
                        <h1 className=" font-weight-bold pb-2">{props.title}</h1>
                    </div>
                    <div>
                        <h1>${props.price} <span className="h4">/ month</span> </h1>
                    </div>
                        
                    {/* <h1 className=" font-weight-bold pb-2">{props.title}</h1>
                    <div className="btn btn-block text-left" type="button" data-toggle="collapse" data-target="#collapse{prop.title}" aria-expanded="true" aria-controls={id}>
                        <i className={iconClasses.join(" ")}></i>
                        {props.title}
                    </div> */}
                </div>


                <div  className={`collapse row ${props.title == "Premium" ? "show" : null}`} id={`collapse${props.title}`} aria-labelledby={`heading${props.title}`} data-parent={`#heading${props.title}`}>
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
            </div>



    )
}

export default SubscriptionFormCard;


{/* <div className="subscription-form-card row">
<div className="col-12 collapse-bar d-flex justify-content-between show" data-toggle="collapse" href="#collapseBasicSubscription" role="button" aria-expanded="false" aria-controls="collapseExample">
    <div className="d-flex">
        <i className={iconClasses.join(" ")}></i>
        <h1 className=" font-weight-bold pb-2">{props.title}</h1>
    </div>
    <div>
        <h1>${props.price} <span className="h4">/ month</span> </h1>
    </div>
    
</div>
<div className="collapse row border-top"  id="collapseBasicSubscription">
    <div className="col-md-6 ">                
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
            
            <button className="btn button">{props.btnText}</button>
        </div>
    </div>
</div>



</div> */}

