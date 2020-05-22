import React,{ useState, useEffect } from 'react';

import { Form } from 'react-bootstrap';
// import Select from 'react-select'
// import makeAnimated from 'react-select/animated';


const CustomBoxes = (props) => {

    let customBoxes = [
        {name:"newsFeed", label: "News Feed", id:`custom-fb-newsFeed`},
        {name:"marketplace", label: "Marketplace", id:`custom-fb-checkbox-marketplace`},
        {name:"videoFeeds", label: "Video Feeds", id:`custom-fb-videoFeeds`},
        {name:"rightColumn", label: "Right Column", id:`custom-fb-rightColumn`},
        {name:"stories", label: "Stories", id:`custom-fb-stories`},
    ]

    return(
        <div className="row customCheckboxes">

            { customBoxes.map( box =>{
                return  <div key={box.name} className="col-md-4 d-flex align-items-center">
                            <Form.Check
                                custom
                                // inline
                                label=""
                                type="checkbox"
                                id={box.id}
                                className="customCheckbox"
                                name={box.name}
                                // checked
                                // onChange={(e) => props.pushToCustomPlacements(e)}
                                />
                                <label>{box.label}</label>
                                <i class="far fa-eye"></i>
                        </div>
            })}
            
        </div>
    );
}

export default CustomBoxes;