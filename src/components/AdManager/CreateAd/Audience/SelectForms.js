import React from 'react';
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import CreatableSelect from 'react-select/creatable';
import { countriesData, interestsData } from '../../selectFormsData';

    // AgeFrom
export const AgeFromSelect = (props) => {
    const selectedAge = props.ageValue
    // console.log(selectedAge)

    const customStyles = {
        control: () => ({
          // none of react-select's styles are passed to <Control />
          border: '1px solid red',
        }),
      }
    
    let ageFrom = [];
    for(let i = 13; i <= 65; i++){
        ageFrom.push({ 
            value: `${i}`,
            label: `${i}`
        });
    }

    return(
        <Select defaultValue={ageFrom[`${props.ageValue-13}`]} className="audience-form-select-age" options={ageFrom} onChange={(option) => props.updateAgeFrom(option)}/>
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
       <Select defaultValue={ageTo[`${props.ageValue-13}`]} className="audience-form-select-age" options={ageTo} onChange={(option) => props.updateAgeTo(option)}/>
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
        <Select className="audience-form-select " options={genderOptions} defaultValue={genderOptions[0]} onChange={(gender) => props.updateGender(gender)}/>
    )
}

// Location
export function LocationSelect(props){
   
    const countries = countriesData.map( country => {
        return {
            ...country,
            label: country.value
        }
    })

    // console.log(countries)

    const animatedComponents = makeAnimated();
    return (
        <Select
        closeMenuOnSelect={false}
        name="location"
        onChange={(options, form) => props.saveOptionForm(options, form)}
        components={animatedComponents}
        // defaultValue={props.audience.location}
        isMulti
        options={countries}
        />
    )
}





// Interests, behaviors, demographics
export const InterestsSelect = (props) => {

    // let interests = [
    //     {label: "Snowboarding", value: 'Snowboarding'},
    //     {label: "Skiing", value: 'Skiing'},
    //     {label: "Football", value: 'Football'},
    // ] 

    // let defaultValuesArray = [...props.selectedInterests]

    let selectedOptions = [...props.selectedInterests]
    let defaultValuesArray;

    // for(let j = 0; j < selectedOptions.length; j++){
    //     defaultValuesArray = interestsData.filter(interest => {

    //         return interest.label === selectedOptions[j]
    //     }) 
    // }

    // for(let i = 0; i < selectedOptions.length; i++){
    //     defaultValuesArray = interestsData.filter(interest => {
    //         if (Object.values(interest).indexOf(selectedOptions[i]) > -1) {
    //             return interest
    //          }
    //     }) 
    // }

    console.log(defaultValuesArray)
    

    

    return (
        <CreatableSelect
        isMulti
        name="interests"
        onChange={(options, form) => props.saveOptionForm(options, form)}
        placeholder="Type keywords"
        defaultValue={defaultValuesArray}
        options={interestsData}
      />
    )
}





