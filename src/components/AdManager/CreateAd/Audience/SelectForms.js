import React,{ useEffect, useState} from 'react';
// import ReactSelectGooglePlaces from "react-select-google-places";
import PropTypes from 'prop-types'
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import CreatableSelect from 'react-select/creatable';
import { countriesData, interestsData } from '../../selectFormsData';


export const AgeFromSelect = (props) => {

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

    // let selectedOptions = [...props.selectedInterests]

    // const [ isLoading, setIsLoading] = useState(false)
    // const [ interests , setInterests] = useState([...interestsData])
    const [ value , setValue] = useState([])
    const [ inputValue , setInputValue] = useState('')

    // Update interests with redux state
    useEffect(() => {
        console.log(props.selectedInterests)
        // if(props.selectedInterests.length !== 0){
        //     const newInterests = [...props.selectedInterests]
        //     setValue(newInterests)
        // }
    }, [props.selectedInterests])

    
    const createOption = (label) => ({
        label,
        value: label.toLowerCase().replace(/\W/g, ''),
      });
    

    const handleChange = (value) => {
        setValue(value)
        props.saveInterests(value)
    };

    const handleInputChange = (inputValue) => {
        setInputValue(inputValue)
    };

    const handleKeyDown = (event) => {
    // const { inputValue, value } = this.state;
    if (!inputValue) return;

    switch (event.key) {
        case 'Enter':
        setInputValue('')
        setValue([...value, createOption(inputValue)])
        props.saveInterests([...value, createOption(inputValue)])
        
        case 'Tab':
        setInputValue('')
        setValue([...value, createOption(inputValue)])
        
        event.preventDefault();
    }
        
    };

    return (
        <CreatableSelect
        isMulti
        name="interests"
        onChange={handleChange}
        onInputChange={handleInputChange}
        onKeyDown={handleKeyDown}
        inputValue={inputValue}
        isClearable
        menuIsOpen={false}
        placeholder="Type keywords"
        value={value}
      />
    )
}





