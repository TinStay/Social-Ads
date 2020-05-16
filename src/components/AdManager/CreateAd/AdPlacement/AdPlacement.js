import React,{ useState, useEffect } from 'react';
import { 
    DevicesSelect} from './PlacementSelectForm';
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
                        <label  for="devices">Devices, OS: </label>
                        <DevicesSelect />
                    </div>
                </div>
                
                {/* <div className="row">
                    <div className="placement-form-gender col-md-2 ">
                        <label for="gender">Gender: </label>
                        <GenderSelect updateGender={(gender) => props.updateGender(gender)}/>
                    </div>
                    <div className="placement-form-age col-md-8">
                        <label for="age">Age:</label>
                        <div className="d-md-flex">
                            <div className="mr-4 d-md-flex">
                                <p>From</p>
                                <AgeFromSelect updateAgeFrom={(option) => props.updateAgeFrom(option)}/>
                            </div>
                            <div className="mr-4 d-md-flex">
                                <p>To</p>
                                <AgeToSelect updateAgeTo={(option) => props.updateAgeTo(option)}/>
                            </div>
                        </div>
                    </div>
                </div> */}

                {/* <div className="row">
                    <div className="placement-form-countries col-md-10">
                        <label  for="gender">Interests, behaviors, demographics: </label>
                        <InterestsSelect />
                    </div>
                </div> */}

                {/* <div className="row">
                    <div className="placement-form-devices col-md-7">
                        <i class="fas fa-globe-europe"></i>
                        <label  for="devices">Devices, OS : </label>
                        <DevicesSelect />
                    </div>
                </div> */}
                
                
            </form>
        </div>
    );
}

export default AdPlacement;