import React,{ useState, useEffect } from 'react';
import { AgeFromSelect, AgeToSelect, GenderSelect } from './SelectForms';
// import { Button, ButtonGroup, Form } from 'react-bootstrap';
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import { countriesData } from '../../CountriesData';

// import Auxilliary from '../../../hoc/Auxilliary';
// import axios from "axios";

const Audience = (props) => {

    

    
    // Gender
    

    // Counteries and states
    const countries = countriesData.map( country => {
        return {
            ...country,
            label: country.value + country.code
        }
    })

    const animatedComponents = makeAnimated();

    // console.log("countries", countries)

    return(
        <div className="add-form-group">
        <h3 className="border-bottom add-form-label">Choose your audience</h3>
        <form className="audience-form">
            
            <div className="row">
                <div className="col-md-4">
                    <div className="audience-form-age ">
                        <label for="age">Age:</label>
                        <div className="d-flex">
                            <div className="mr-4 ">
                                <p>From</p>
                                <AgeFromSelect updateAgeFrom={(option) => props.updateAgeFrom(option)}/>
                            </div>
                            <div className="mr-4">
                                <p>To</p>
                                <AgeToSelect updateAgeTo={(option) => props.updateAgeTo(option)}/>
                            </div>
                        </div>
                        
                    </div>
                    <div className="audience-form-gender ">
                        <label  for="gender">Gender: </label>
                        <GenderSelect updateGender={(gender) => props.updateGender(gender)}/>
                    </div>
                </div>
                <div className="audience-form-countries col-md-8">
                <i class="fas fa-globe-europe"></i>
                    <label  for="gender">Countries: </label>
                    <Select
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    // defaultValue={[countries[0], countries[1]]}
                    isMulti
                    options={countries}
                    />
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