import React,{ useState, useEffect } from 'react';
import { 
    DevicesSelect} from './PlacementSelectForms';
import FacebookPlacements from './FacebookPlacements/FacebookPlacements';
// import Select from 'react-select'
// import makeAnimated from 'react-select/animated';


const AdPlacement = (props) => {

    
    return(
        <div className="add-form-group">
            <h3 className="border-bottom add-form-label">Choose where your ads will appear</h3>
            <form className="placement-form">

            <div className="row">
                <div className="audience-form-devices col-md-7">
                    {/* <i class="fas fa-globe-europe"></i> */}
                    <label for="devices">Devices, OS: </label>
                    <DevicesSelect />
                </div>
            </div>

            <div className="add-form-row">
                {/* {props.isFacebookChecked ? <FacebookPlacements /> : null} */}
                <FacebookPlacements />
            </div>
                
                
                
            </form>
        </div>
    );
}

export default AdPlacement;