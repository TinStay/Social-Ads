import React,{ useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import CustomBoxes from './CustomBoxes';
import AdViewFb from './AdViewFb';


const FacebookPlacements = (props) => {
    const [automaticPlacement, setAutomaticPlacement] = useState(true)
    const [customPlacement, setCustomPlacement] = useState(false)

    // Ad view state
    const [primaryText, setPrimaryText] = useState("Example primary text for the ad")
    const [headline, setHeadline] = useState("Example headline")
    const [description, setDescription] = useState("Example description of your product")
    const [url, setUrl] = useState("www.examplewebsite.com")


    const changeToAutomatic = (e) =>{
        if(e.target.checked){
            
            setCustomPlacement(false)
            setAutomaticPlacement(true)
        }
    }

    const changeToCustom = (e) =>{
        if(e.target.checked){
            setCustomPlacement(true)
            setAutomaticPlacement(false)
        }
    }



    let customCheckboxes = null;
     
    if(customPlacement){
        customCheckboxes = (
            <div className="col-md-9">
               <CustomBoxes />
            </div>
        )
    }

    return(
        <div className="fb-placements">
        <h1 className=" font-color">Facebook</h1>
            <Form onSubmit={(e) => props.saveFbPlacements(e)} className="fb-palacements-form row">
           
               <div className="fb-placements-radioBtns col-md-3">
               <h3 className="fb-placements-label font-color ">Placements</h3>
                   <div className="">
                    <Form.Check
                            custom
                            block
                            label="Automatic"
                            type="radio"
                            id={`automatic-inline-radio-facebook`}
                            className="radio-fb"
                            name="automatic"
                            checked={automaticPlacement}
                            onChange={(e) => changeToAutomatic(e)}
                        />
                        <Form.Check
                            custom
                            block
                            label="Custom"
                            type="radio"
                            id={`custom-inline-radio-facebook`}
                            className="radio-fb"
                            name="custom"
                            checked={customPlacement}
                            onChange={(e) => changeToCustom(e)}
                        />
                   </div>
               </div>

               { customCheckboxes }

               <div className="container fb-ad-form">
                   <div className="row">
                        <h3 className="col-md-12 pb-2  fb-ad-form-label border-bottom font-color">Ad appearance</h3>
                        <div className="col-md-6">
                            <Form.Group>
                                <div className="fb-ad-form-field row">
                                    <div className="media-box col text-center">
                                        <p className="">Upload a picture</p>
                                        <i class="fas fa-images"></i>
                                    </div>
                                    <div className="media-box col text-center">
                                        <p className="">Upload a video</p>
                                        <i class="fas fa-file-video"></i>
                                    </div>
                                   
                                </div>
                                <div className="fb-ad-form-field">
                                    <Form.Label className="fb-ad-form-field-label">Primary text</Form.Label>
                                    <Form.Control name="primaryText" value={primaryText} onChange={(e) => setPrimaryText(e.target.value)} type="text" placeholder="Enter primary text" />
                                </div>
                                <div className="fb-ad-form-field">
                                    <Form.Label className="fb-ad-form-field-label">Headline</Form.Label>
                                    <Form.Control name="headline" value={headline} onChange={(e) => setHeadline(e.target.value)} type="text" placeholder="Enter headline" />
                                </div>
                                <div className="fb-ad-form-field">
                                    <Form.Label className="fb-ad-form-field-label">Description</Form.Label>
                                    <Form.Control name="description" value={description} onChange={(e) => setDescription(e.target.value)} type="text" placeholder="Enter a description for your ad" />
                                </div>
                                <div className="fb-ad-form-field">
                                    <Form.Label className="fb-ad-form-field-label">Website URL</Form.Label>
                                    <Form.Control name="url" value={url} onChange={(e) => setUrl(e.target.value)} type="text" placeholder="Enter your website URL" />
                                </div>
                            
                            
                            </Form.Group>
                        </div>
                        <div className="col-md-6">
                            <AdViewFb 
                            primaryText={primaryText}
                            headline={headline}
                            description={description}
                            url={url}/>
                        </div>
                   </div>
               </div>

               
                <div className="col-md-12">
                    <button type="submit" className="btn btn-primary">Save placements</button>
                </div>
            </Form>
        
        </div>
    );
}

export default FacebookPlacements;