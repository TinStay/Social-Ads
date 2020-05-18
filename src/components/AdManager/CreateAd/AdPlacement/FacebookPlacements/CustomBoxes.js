import React,{ useState, useEffect } from 'react';

import { Form } from 'react-bootstrap';
// import Select from 'react-select'
// import makeAnimated from 'react-select/animated';


const CustomBoxes = (props) => {

    let customBoxes = [
        {name:"newsFeed", checked: true, label: "News Feed", id:`custom-fb-newsFeed`},
        {name:"marketplace", checked: true, label: "Marketplace", id:`custom-fb-checkbox-marketplace`},
        {name:"videoFeeds", checked: true, label: "Video Feeds", id:`custom-fb-videoFeeds`},
        {name:"rightColumn", checked: true, label: "Right Column", id:`custom-fb-rightColumn`},
        {name:"stories", checked: true, label: "Stories", id:`custom-fb-stories`},
    ]

    return(
        <div className="row customCheckboxes">

            { customBoxes.map( box =>{
                return  <div className="col-md-4 d-flex align-items-center">
                            <Form.Check
                                custom
                                // inline
                                label=""
                                type="checkbox"
                                id={box.id}
                                className="customCheckbox"
                                name={box.name}
                                checked={box.checked}
                                // onClick={(e) => props.changeSMPInfo(e)}
                                />
                                <label>{box.label}</label>
                                <i class="far fa-eye"></i>
                        </div>
            })}
            
        </div>
    );
}

export default CustomBoxes;