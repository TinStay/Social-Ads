import React,{ useState, useEffect } from 'react';
import { Button, ButtonGroup, Form } from 'react-bootstrap';
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import { countriesData } from '../CountriesData';

// import  Select  from 'react-bootstrap-select';
// import Auxilliary from '../../../hoc/Auxilliary';
import axios from "axios";

axios.get("https://graph.facebook.com/API_VERSION/search?type=adgeolocation&location_types=['country']&fields=key,name&limit=1000")
.then(response =>{
    console.log(response.data)
}).catch( err => console.log(err))

const Audience = (props) => {

    // Age
    let ageFrom = [];
    for(let i = 13; i <= 65; i++){
        ageFrom.push({ 
            value: `${i}`,
            label: `${i}`
        });
    }

    let ageTo = [];
    for(let i = 13; i <= 65; i++){
        ageTo.push({ 
            value: `${i}`,
            label: `${i}`
        });
    }
    ageTo[0] = {value: '13+', label: "13+"}
    ageTo[ageTo.length - 1] = {value: '65+', label: "65+"}

    // Gender
    let genderOptions = [
        {label: "All", value: 'All'},
        {label: "Men", value: 'men'},
        {label: "Women", value: 'women'},
    ]  

    // Counteries and states
    const countries = countriesData.map( country => {
        return {
            ...country,
            label: country.value + country.code
        }
    })

    const animatedComponents = makeAnimated();

    console.log("countries", countries)

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
                                <Select className="audience-form-select" options={ageFrom} onChange={(option) => props.updateAgeFrom(option)}/>
                            </div>
                            <div className="mr-4">
                                <p>To</p>
                                <Select className="audience-form-select" options={ageTo} onChange={(option) => props.updateAgeTo(option)}/>
                            </div>
                        </div>
                        
                    </div>
                    <div className="audience-form-gender ">
                        <label  for="gender">Gender: </label>
                        <Select className="audience-form-select " options={genderOptions} />
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