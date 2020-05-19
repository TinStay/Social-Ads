import React,{ useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import CustomBoxes from './CustomBoxes';
// import Select from 'react-select'
// import makeAnimated from 'react-select/animated';


const FacebookPlacements = (props) => {
    const [automaticPlacement, setAutomaticPlacement] = useState(true)
    const [customPlacement, setCustomPlacement] = useState(false)


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
                    <Form.Check
                        custom
                        block
                        label="Automatic"
                        type="radio"
                        id={`automatic-inline-radio-facebook`}
                        className="radio-big"
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
                        className="radio-big"
                        name="custom"
                        checked={customPlacement}
                        onChange={(e) => changeToCustom(e)}
                    />
               </div>

               { customCheckboxes }

               <div className="container ad-container">
                   <div className="row">
                        <h3 className="col-md-12 pb-2  ad-container-label border-bottom font-color">Ad appearance</h3>
                        <div className="col-md-6">
                        <Form.Group>
                            <Form.Label>Primary text</Form.Label>
                            <Form.Control type="text" placeholder="Enter primary text" />
                            <Form.Label>Headline</Form.Label>
                            <Form.Control type="text" placeholder="Enter headline" />
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" placeholder="Enter a description for your ad" />
                        </Form.Group>
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