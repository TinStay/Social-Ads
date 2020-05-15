import React from 'react';
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import CreatableSelect from 'react-select/creatable';
import { countriesData } from '../../CountriesData';


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
        <Select className="audience-form-select-age" options={ageFrom} onChange={(option) => props.updateAgeFrom(option)}/>
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
       <Select className="audience-form-select-age" options={ageTo} onChange={(option) => props.updateAgeTo(option)}/>
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

// Location
export const LocationSelect = (props) => {
   
    const countries = countriesData.map( country => {
        return {
            ...country,
            label: country.value
        }
    })

    const animatedComponents = makeAnimated();
    return (
        <Select
        closeMenuOnSelect={false}
        components={animatedComponents}
        // defaultValue={[countries[0], countries[1]]}
        isMulti
        options={countries}
        />
    )
}

// Interests, behaviors, demographics
export const InterestsSelect = (props) => {
   
    const handleChange = (newValue, actionMeta) => {
        console.group('Value Changed');
        console.log(newValue);
        console.log(`action: ${actionMeta.action}`);
        console.groupEnd();
    };

    let interests = [
        {label: "Snowboarding", value: 'Snowboarding'},
        {label: "Skiing", value: 'Skiing'},
        {label: "Football", value: 'Football'},
    ] 

    return (
        <CreatableSelect
        isMulti
        onChange={handleChange}
        options={interests}
      />
    )
}


