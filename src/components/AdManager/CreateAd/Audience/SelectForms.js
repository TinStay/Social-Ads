import React from 'react';
import Select from 'react-select'
import makeAnimated from 'react-select/animated';

    // AgeFrom
export const AgeFromSelect = (props) => {
    
    let ageFrom = [];
    for(let i = 13; i <= 65; i++){
        ageFrom.push({ 
            value: `${i}`,
            label: `${i}`
        });
    }

    return(
        <Select className="audience-form-select" options={ageFrom} onChange={(option) => props.updateAgeFrom(option)}/>
    )
}

    // AgeTo
export const AgeToSelect = (props) => {

    let ageTo = [];
    for(let i = 13; i <= 65; i++){
        ageTo.push({ 
            value: `${i}`,
            label: `${i}`
        });
    }
    ageTo[0] = {value: '13+', label: "13+"}
    ageTo[ageTo.length - 1] = {value: '65+', label: "65+"}


    return(
       <Select className="audience-form-select" options={ageTo} onChange={(option) => props.updateAgeTo(option)}/>
    )
}

// Gender

export const GenderSelect = (props) => {
    let genderOptions = [
        {label: "All", value: 'All'},
        {label: "Men", value: 'men'},
        {label: "Women", value: 'women'},
    ]  

    return (
        <Select className="audience-form-select " options={genderOptions} onChange={(gender) => props.updateGender(gender)}/>
    )
}