import React,{ useState, useEffect } from 'react';
import * as actionTypes from "../../../../store/actions/actionTypes"
import removeIcon from '../../../../assets/removeIcon2.png'

import { 
    AgeFromSelect, 
    AgeToSelect, 
    GenderSelect, 
    LocationSelect,
    InterestsSelect,
} from './SelectForms';

import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng
  } from "react-places-autocomplete";

// import SelectPlaces from 'react-select-places';
import { connect } from 'react-redux';


function Audience(props){
     
    const [location, setLocation] = useState("")
    const [locationList, setLocationList] = useState([])

    // Load locationList if already saved in redux state
    useEffect(() => {
        if(props.audience.location !== null){
            setLocationList(props.audience.location)    
        }
    }, [])

    console.log(props.audience.location)
    
    const onLocationSelect =  async (location) => {
        // Create new location entry
        let newLocation = { name: location, id:Date.now()}

        // Copy location list from state
        let newLocationList = [...locationList]

        // Push new location to list
        newLocationList.push(newLocation)

        // Update location list state
        setLocationList(newLocationList)

        // Update redux state
        props.saveLocation(newLocationList) 

        // Clear input
        setLocation("")

        // Update error message
        props.updateLocationErrorMessage(newLocationList)
        
    }

    const removeLocation = (e, index) => {
        e.preventDefault()

        // Copy the location list from state
        let newLocationList = [...locationList]

        // Remove the location with index
        newLocationList.splice(index, 1)

        // Update state
        setLocationList(newLocationList)

        // Update redux state
        props.saveLocation(newLocationList)

        // Update error message
        props.updateLocationErrorMessage(newLocationList)
    }

    console.log(locationList)


    return(
        <div className="add-form-group">
            <h3 className="border-bottom add-form-label">Choose your audience</h3>
            <form className="audience-form">

                <div className="row audience-form-location-container ">
                    <div className="audience-form-location col-md-12">
                        
                        <i class="fas fa-globe-europe"></i>
                        <label  for="gender">Locations targeted by your ads: </label>
                        <PlacesAutocomplete value={location} onChange={setLocation} onSelect={onLocationSelect}>
                            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                <div>
                                    <div class="col-md-6">
                                        {props.locationAlert}
                                    </div>
                                    <input {...getInputProps({ placeholder: "Select a location"})} className="col-md-6 form-control form-control-lg m-0" type="text"  />
                                    

                                    <div className="dropdown" >
                                        {loading ? <div>...Loading</div> : null}

                                        {suggestions.map(suggestion=>{  

                                            const style = {
                                                backgroundColor: suggestion.active ? "#deebff" : "#fafaff",
                                                padding: '5px',
                                                width: "100%",
                                                border: "1px solid #dfdfdf",
                                                display: suggestions ? "block" : "none",
                                                // position: "absolute",
                                                wordWrap: "break-word",
                                            }

                                            return (
                                                <div {...getSuggestionItemProps(suggestion, {style})}>
                                                    {suggestion.description}
                                                </div>
                                                
                                            )
                                        })}
                                    </div>
                                </div>
                            )}
                        </PlacesAutocomplete>
                        
                    </div>
                    <div class="col-md-12 row audience-form-location-list mb-0">
                        <div class="col-12">
                            <h1 className="title my-4">Selected locations:</h1>
                        </div>
                           <div class="row row-cols-3 mx-3 w-100 mb-0">
                                {locationList.length !== 0 ? locationList.map((location, index) => {

                                return(
                                    <div class="col-md-4 p-0">
                                        <div class="location-box d-flex justify-content-between">
                                            {location.name}
                                            {/* <button className="remove-btn btn " onClick={(e) => removeLocation(e, index)}>X</button> */}
                                            <img src={removeIcon} className="remove-btn btn " onClick={(e) => removeLocation(e, index)} />
                                            {/* <span className="remove-btn btn " onClick={(e) => removeLocation(e, index)} >&#x2613;</span> */}
                                        </div>
                                    </div>
                                )
                                }) : <p>You haven't selected a location.</p> }
                           </div>
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
                            <div>
                                {props.ageFromAlert}
                                <div className="mr-4 d-md-flex">
                                    <p>From</p>
                                    <AgeFromSelect ageValue={props.audience.ageFrom} updateAgeFrom={(option) => props.updateAgeFrom(option)}/>
                                </div>
                            </div>
                            <div>
                                {props.ageToAlert}
                                <div className="mr-4 d-md-flex">
                                    <p>To</p>
                                    <AgeToSelect ageValue={props.audience.ageTo} updateAgeTo={(option) => props.updateAgeTo(option)}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="audience-form-countries col-md-10">
                        <label  for="gender">Interests, keywords, demographics: </label>
                        <InterestsSelect saveInterests={(interests) => props.saveInterests(interests)} selectedInterests={props.audience.interests}/>
                    </div>
                </div>
            </form>
        </div>
    );
}

const mapStateToProps = state => {
    return{
        audience: state.audience
    }
}

const mapDispatchToProps = dispatch => {
    return{
        saveLocation: (locationList) => dispatch({type: actionTypes.SAVE_LOCATION, locationList: locationList}),
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Audience);