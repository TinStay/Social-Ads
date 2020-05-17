import React,{ useState, useEffect } from 'react';

import { Form } from 'react-bootstrap';
// import Select from 'react-select'
// import makeAnimated from 'react-select/animated';


const FacebookPlacements = (props) => {
    const [customPlacement, setCustomPlacement] = useState(false)

    const changeToCustom = (e) =>{
        

        if(e.target.checked){
            setCustomPlacement(true)
        }else {
            setCustomPlacement(false)
        }

        console.log("customPlacement", customPlacement)
    }

    // console.log("customFb", customFb);
    
    return(
        <div className="add-form-group">
          <h2 className=" font-color">Facebook</h2>
        <div className="fb-palacements row">
            <Form className="">
               <div className="col-md-6">
                    <Form.Check
                        custom
                        block
                        label="Automatic"
                        type="radio"
                        id={`automatic-inline-radio-facebook`}
                        className="radio-big"
                        name="automatic"
                        // checked="true"
                        // onClick={(e) => changeFbInfo(e)}
                    />
                    <Form.Check
                        custom
                        block
                        label="Custom"
                        type="radio"
                        id={`custom-inline-radio-facebook`}
                        className="radio-big"
                        name="custom"
                        // checked="true"
                        checked={customPlacement}
                        onClick={(e) => changeToCustom(e)}
                    />
               </div>
            </Form>
        </div>

          {/* <div className="d-block">
            <Form.Check
                custom
                inline
                label="Facebook News Feed"
                type="checkbox"
                id={`custom-inline-checkbox-facebook`}
                className="checkbox-big"
                name="facebookAds"
                // onClick={(e) => props.changeSMPInfo(e)}
                />
            <Form.Check
                custom
                inline
                label="Facebook Marketplace"
                type="checkbox"
                id={`custom-inline-checkbox-facebook`}
                className="checkbox-big"
                name="facebookAds"
                // onClick={(e) => props.changeSMPInfo(e)}
                />
            <Form.Check
                custom
                inline
                label="Facebook Video Feeds"
                type="checkbox"
                id={`custom-inline-checkbox-facebook`}
                className="checkbox-big"
                name="facebookAds"
                // onClick={(e) => props.changeSMPInfo(e)}
                />
          </div> */}
        </div>
    );
}

export default FacebookPlacements;