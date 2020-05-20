import React,{ useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import AdViewGoogle from './AdViewGoogle';



const gglAdForm = (props) => {

    return(
        <div className="ggl-ad">
        <h1 className="ggl-ad-label font-color">Google</h1>
            <Form onSubmit={() => {}} className="ggl-ad-form row">
               <div className="container ggl-ad-fields">
                   <div className="row">
                        <div className="col-md-6">
                            <Form.Group>
                                
                                <div className="ggl-ad-form-field">
                                    <Form.Label className="ggl-ad-form-field-label">Healine 1</Form.Label>
                                    <Form.Control value='' onChange={() => {}} type="text" placeholder="Enter primary text" />
                                </div>
                                <div className="ggl-ad-form-field">
                                    <Form.Label className="ggl-ad-form-field-label">Healine 2</Form.Label>
                                    <Form.Control value='' onChange={() => {}} type="text" placeholder="Enter headline" />
                                </div>
                                <div className="ggl-ad-form-field">
                                    <Form.Label className="ggl-ad-form-field-label">Healine 3</Form.Label>
                                    <Form.Control value='' onChange={() => {}} type="text" placeholder="Enter a description for your ad" />
                                </div>
                                <div className="ggl-ad-form-field">
                                    <Form.Label className="ggl-ad-form-field-label">Website URL</Form.Label>
                                    <Form.Control value='' onChange={() => {}} type="text" placeholder="Enter your website URL" />
                                </div>
                            
                            
                            </Form.Group>
                        </div>
                        <div className="col-md-6">
                            <AdViewGoogle/>
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

export default gglAdForm;