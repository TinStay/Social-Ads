import React,{ useState, useEffect } from 'react';
import { 
    AgeFromSelect, 
    AgeToSelect, 
    GenderSelect, 
    LocationSelect,
    InterestsSelect } from './SelectForms';
// import { Button, ButtonGroup, Form } from 'react-bootstrap';
import Select from 'react-select'
import makeAnimated from 'react-select/animated';

// import Auxilliary from '../../../hoc/Auxilliary';
// import axios from "axios";

const Audience = (props) => {

    

    
    // Gender
    

    

    // console.log("countries", countries)

    return(
        <div className="add-form-group">
            <h3 className="border-bottom add-form-label">Choose your audience</h3>
            <form className="audience-form">

                <div className="row">
                    <div className="audience-form-countries col-md-7">
                        <i class="fas fa-globe-europe"></i>
                        <label  for="gender">Countries: </label>
                        <LocationSelect />
                    </div>
                </div>
                
                <div className="row">
                    <div className="audience-form-gender col-md-2 ">
                        <label for="gender">Gender: </label>
                        <GenderSelect updateGender={(gender) => props.updateGender(gender)}/>
                    </div>
                    <div className="audience-form-age col-md-8">
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
                </div>
                <div className="row">
                    <div className="audience-form-countries col-md-10">
                        <label  for="gender">Interests, behaviors, demographics: </label>
                        <InterestsSelect />
                    </div>
                </div>
                {/* <div className="form-group">
                    <label for="exampleFormControlSelect2">Example multiple select</label>
                    
                </div> */}
                
                
            </form>
        </div>
    );
}

export default Audience