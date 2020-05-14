import React,{ useState, useEffect } from 'react';
import { Button, ButtonGroup, Form } from 'react-bootstrap';
import Select from 'react-select'
// import  Select  from 'react-bootstrap-select';
// import Auxilliary from '../../../hoc/Auxilliary';


const Audience = (props) => {

    // const [isAgeFrom, setIsAgeFrom] = useState(false);

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

    let genderOptions = [
        {label: "All", value: 'All'},
        {label: "Men", value: 'men'},
        {label: "Women", value: 'women'},
    ]  

    return(
        <div className="add-form-group">
        <h3 className="border-bottom add-form-label">Choose your audience</h3>
        <form className="audience-form">
            
            <div className="row">
                <div className="col-md-4">
                    <div className="audience-form-age ">
                        <label for="age">Age:</label>
                        <div className="row d-flex">
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
                <div className="form-group col-md-8">
                    <label for="exampleFormControlTextarea1">Example textarea</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
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