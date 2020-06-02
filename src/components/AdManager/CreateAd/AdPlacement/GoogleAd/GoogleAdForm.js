import React,{ useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import AdViewGoogle from './AdViewGoogle';



const GooglelAdForm = (props) => {

    const [headlineOne, setHeadlineOne] = useState("Headline 1 ");
    const [headlineTwo, setHeadlineTwo] = useState("Headline 2 ");
    const [headlineThree, setHeadlineThree] = useState("Headline 3 ");
    const [description, setDescription] = useState("Write a description for your ad here");
    const [url, setUrl] = useState(props.url);


    // useEffect(() => {
    //     setUrl(props.url)
    // }, [])

    let gglPlacements = {
        headlineOne: headlineOne,
        headlineTwo: headlineTwo,
        headlineThree: headlineThree,
        description: description,
        url: url
    }




    return(
        <div className="ggl-ad">
            <h1 className="ggl-ad-label font-color">Google</h1>
            <Form onSubmit={e => props.saveGooglePlacements(e, gglPlacements)} className="ggl-ad-form row">
               <div className="container ggl-ad-fields">
                   <div className="row">
                        <div className="col-md-6">
                            <Form.Group>
                                
                                <div className="ggl-ad-form-field">
                                    <Form.Label className="ggl-ad-form-field-label">Headline 1</Form.Label>
                                    <Form.Control value={headlineOne} onChange={(e) => setHeadlineOne(e.target.value)} type="text" placeholder="Enter headline 1" />
                                </div>
                                <div className="ggl-ad-form-field">
                                    <Form.Label className="ggl-ad-form-field-label">Headline 2</Form.Label>
                                    <Form.Control value={headlineTwo} onChange={(e) => setHeadlineTwo(e.target.value)} type="text" placeholder="Enter headline 2" />
                                </div>
                                <div className="ggl-ad-form-field">
                                    <Form.Label className="ggl-ad-form-field-label">Headline 3</Form.Label>
                                    <Form.Control value={headlineThree} onChange={(e) => setHeadlineThree(e.target.value)} type="text" placeholder="Enter headline 3" />
                                </div>
                                <div className="ggl-ad-form-field">
                                    <Form.Label className="ggl-ad-form-field-label">Description</Form.Label>
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
                            headlineOne={headlineOne}
                            headlineTwo={headlineTwo}
                            headlineThree={headlineThree}
                            description={description}
                            url={url}
                            />
                        </div>
                   </div>
                   
               </div>

               
               <div className="col-md-12">
                    <button type="submit" className="btn btn-primary">Save ad</button>
                </div> 
            </Form>
        
        </div>
    );
}

export default GooglelAdForm;