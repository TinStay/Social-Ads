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
        }else {
            setCustomPlacement(false)
            setAutomaticPlacement(true)
        } 
    }

    // console.log("customFb", customFb);
    // console.log("customPlacement", customPlacement)

    let customPlacements = null;
     
    if(customPlacement){
        customPlacements = (
            <div className="col-md-9">
               <CustomBoxes />
            </div>
        )
    }

    return(
        <div className="fb-palacements">
        <h2 className=" font-color">Facebook</h2>
            <Form className="fb-palacements-form row">
               <div className="fb-palacements-radioBtns col-md-3">
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

               { customPlacements }

            </Form>
        
        </div>
    );
}

export default FacebookPlacements;