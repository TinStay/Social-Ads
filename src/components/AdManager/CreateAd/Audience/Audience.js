import React,{ useState, useEffect } from 'react';

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
    
    const onLocationSelect =  async (location) => {
        // Create new location entry
        let newLocation = { name: location, id:Date.now()}

        // Copy location list from state
        let newLocationList = [...locationList]

        // Push new location to list
        newLocationList.push(newLocation)

        // Update location list state
        setLocationList(newLocationList)

        
    }


    return(
        <div className="add-form-group">
            <h3 className="border-bottom add-form-label">Choose your audience</h3>
            <form className="audience-form">

                <div className="row audience-form-location-container ">
                    <div className="audience-form-location col-md-5">
                        {props.locationAlert}
                        <i class="fas fa-globe-europe"></i>
                        <label  for="gender">Countries: </label>
                        <PlacesAutocomplete value={location} onChange={setLocation} onSelect={onLocationSelect}>
                            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                <div>
                                    {/* <input className="location-input" {...getInputProps({ placeholder: "Select a location"})}/> */}
                                    <input {...getInputProps({ placeholder: "Select a location"})} className="form-control form-control-lg m-0" type="text"  />

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
                    <div class="col-md-7 row audience-form-location-list  mb-0">
                        <div class="col-12">
                            <h1 className="title m-3">People located at these locations will see your ads.</h1>
                        </div>
                           {locationList !== [] ? locationList.map(location => {

                               return(
                                   <div class="col-6 p-0">
                                       <div class="location-box">
                                            {location.name}
                                       </div>
                                   </div>
                               )
                           }) : null}
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



export default connect(mapStateToProps)(Audience);