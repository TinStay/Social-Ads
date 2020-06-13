import React,{ useState} from 'react';
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import CreatableSelect from 'react-select/creatable';
import { countriesData, interestsData } from '../../selectFormsData';

    // AgeFrom
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
            values: `${i}`,
            label: `${i}`
        });
    }

    return(
        <Select defaultValues={ageFrom[`${props.ageValues-13}`]} className="audience-form-select-age" options={ageFrom} onChange={(option) => props.updateAgeFrom(option)}/>
    )
}


    // AgeTo
export const AgeToSelect = (props) => {

    let ageTo = [];
    for(let i = 13; i <= 65; i++){
        ageTo.push({ 
            values: `${i}`,
            label: `${i}`
        });
    }
    ageTo[0] = {values: '13+', label: "13+"}
    ageTo[ageTo.length - 1] = {values: '65+', label: "65+"}


    return(
       <Select defaultValues={ageTo[`${props.ageValues-13}`]} className="audience-form-select-age" options={ageTo} onChange={(option) => props.updateAgeTo(option)}/>
    )
}

// Gender

export const GenderSelect = (props) => {
    let genderOptions = [
        {label: "All", values: 'All'},
        {label: "Men", values: 'men'},
        {label: "Women", values: 'women'},
    ]  

    return (
        <Select className="audience-form-select " options={genderOptions} defaultValues={genderOptions[0]} onChange={(gender) => props.updateGender(gender)}/>
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

    console.log("contries",countries)

    const animatedComponents = makeAnimated();

    return (
        <Select
        closeMenuOnSelect={false}
        name="location"
        onChange={(options, form) => props.saveOptionForm(options, form)}
        components={animatedComponents}
        // defaultValues={props.audience.location}
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
    const [ values , setValues] = useState([...props.selectedInterests])
    const [ inputValue , setInputValue] = useState('')

    
    const createOption = (label) => ({
        label,
        values: label.toLowerCase().replace(/\W/g, ''),
      });
    

    const handleChange = (values) => {
        setValues(values)
        props.saveInterests(values)
    };

    const handleInputChange = (inputValue) => {
        setInputValue(inputValue)
    };

    const handleKeyDown = (event) => {
    // const { inputValue, values } = this.state;
    if (!inputValue) return;

    switch (event.key) {
        case 'Enter':
        setInputValue('')
        setValues([...values, createOption(inputValue)])
        props.saveInterests([...values, createOption(inputValue)])
        
        case 'Tab':
        setInputValue('')
        setValues([...values, createOption(inputValue)])
        
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
        value={values}
      />
    )
}





