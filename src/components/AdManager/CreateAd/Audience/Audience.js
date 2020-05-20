import React,{ useState, useEffect } from 'react';
import { 
    AgeFromSelect, 
    AgeToSelect, 
    GenderSelect, 
    LocationSelect,
    InterestsSelect,} from './SelectForms';

const Audience = (props) => {


    return(
        <div className="add-form-group">
            <h3 className="border-bottom add-form-label">Choose your audience</h3>
            <form className="audience-form">

                <div className="row">
                    <div className="audience-form-countries col-md-7">
                        <i class="fas fa-globe-europe"></i>
                        <label  for="gender">Countries: </label>
                        <LocationSelect saveOptionForm={(options, form) => props.saveOptionForm(options, form)}/>
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
                        <label  for="gender">Interests, keywords, demographics: </label>
                        <InterestsSelect saveOptionForm={(options, form) => props.saveOptionForm(options, form)}/>
                    </div>
                </div>
                
                
                
            </form>
        </div>
    );
}

export default Audience