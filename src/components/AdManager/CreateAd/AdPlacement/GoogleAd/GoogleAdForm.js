import React,{ useState, useEffect } from 'react';
import { Form, Alert } from 'react-bootstrap';
import AdViewGoogle from './AdViewGoogle';



const GooglelAdForm = (props) => {


    const [headlineOne, setHeadlineOne] = useState("");
    const [headlineTwo, setHeadlineTwo] = useState("");
    const [headlineThree, setHeadlineThree] = useState("");
    const [description, setDescription] = useState("");
    const [url, setUrl] = useState("");


    useEffect(() => {

        // Set 2 way binding from redux state
        const details = {...props.selectedDetails}
        if(details != {}){
            setHeadlineOne(details.headlineOne)
            setHeadlineTwo(details.headlineTwo)
            setHeadlineThree(details.headlineThree)
            setDescription(details.headlineTwo)
        }

    }, [])

    let gglPlacements = {
        headlineOne: headlineOne,
        headlineTwo: headlineTwo,
        headlineThree: headlineThree,
        description: description,
    }


    // Alerts

    let headlineOneAlert = null
    if(props.headlineOneError != "" && props.showErrors){
        headlineOneAlert = (
            <Alert className="alert-danger" variant='danger'>
                {props.headlineOneError}
            </Alert>
        )
    }
    let headlineTwoAlert = null
    if(props.headlineTwoError != "" && props.showErrors){
        headlineTwoAlert = (
            <Alert className="alert-danger" variant='danger'>
                {props.headlineTwoError}
            </Alert>
        )
    }
    let headlineThreeAlert = null
    if(props.headlineThreeError != "" && props.showErrors){
        headlineThreeAlert = (
            <Alert className="alert-danger" variant='danger'>
                {props.headlineThreeError}
            </Alert>
        )
    }
    let descriptionAlert = null
    if(props.descriptionError != "" && props.showErrors){
        descriptionAlert = (
            <Alert className="alert-danger" variant='danger'>
                {props.descriptionError}
            </Alert>
        )
    }

    return(
        <div className="ggl-ad">
            <h1 className="ggl-ad-label font-color">Google</h1>
            <Form onSubmit={e => props.saveGooglePlacements(e, gglPlacements)} onChange={e => props.changeGglForm(e)} className="ggl-ad-form row">
               <div className="container ggl-ad-fields">
                   <div className="row">
                        <div className="col-md-6">
                            <Form.Group>
                                
                                <div className="ggl-ad-form-field">
                                    <Form.Label className="ggl-ad-form-field-label">Headline 1</Form.Label>
                                    {headlineOneAlert}
                                    <Form.Control value={headlineOne} onChange={(e) => setHeadlineOne(e.target.value)} type="text" placeholder="Enter headline 1" />
                                </div>
                                <div className="ggl-ad-form-field">
                                    <Form.Label className="ggl-ad-form-field-label">Headline 2</Form.Label>
                                    {headlineTwoAlert}
                                    <Form.Control value={headlineTwo} onChange={(e) => setHeadlineTwo(e.target.value)} type="text" placeholder="Enter headline 2" />
                                </div>
                                <div className="ggl-ad-form-field">
                                    <Form.Label className="ggl-ad-form-field-label">Headline 3</Form.Label>
                                    {headlineThreeAlert}
                                    <Form.Control value={headlineThree} onChange={(e) => setHeadlineThree(e.target.value)} type="text" placeholder="Enter headline 3" />
                                </div>
                                <div className="ggl-ad-form-field">
                                    <Form.Label className="ggl-ad-form-field-label">Description</Form.Label>
                                    {descriptionAlert}
                                    <Form.Control value={description} onChange={(e) => setDescription(e.target.value)} type="text" placeholder="Enter a description for your ad" />
                                </div>
                                {/* <div className="ggl-ad-form-field">
                                    <Form.Label className="ggl-ad-form-field-label">Website URL</Form.Label>
                                    <Form.Control value='' onChange={() => {}} type="text" placeholder="Enter your website URL" />
                                </div> */}
                            
                            
                            </Form.Group>
                        </div>
                        <div className="col-md-6 mt-5">
                            <h5 className="view-label border-bottom pb-2">Google ad view</h5> 
                            <AdViewGoogle 
                            headlineOne={headlineOne ? headlineOne : "Headline 1 |"}
                            headlineTwo={headlineTwo ? headlineTwo : "Headline 2 |"}
                            headlineThree={headlineThree ? headlineThree : "Headline 3"}
                            description={description ? description : "Your description will be shown here"}
                            url={props.url ? props.url : "http://example.com"}
                            />
                        </div>
                   </div>
                   
               </div>

               
               <div className="col-md-12">
                    <button type="submit" className="btn btn-primary">Confirm details</button>
                </div> 
            </Form>
        
        </div>
    );
}

export default GooglelAdForm;