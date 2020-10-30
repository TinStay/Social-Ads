import React,{ useState, useEffect } from 'react';

import { Form } from 'react-bootstrap';
// import Select from 'react-select'
// import makeAnimated from 'react-select/animated';


const CustomBoxes = (props) => {
    let placements = [...props.selectedCustomPlacements]

    const [customBoxes, setCustomBoxes] = useState([
        {name:"newsFeed", checked: placements.length > 0 ? placements[0].checked : false,  label: "News Feed", id:`custom-fb-newsFeed`},
        {name:"marketplace", checked: placements.length > 0 ? placements[1].checked : false,  label: "Marketplace", id:`custom-fb-checkbox-marketplace`},
        {name:"videoFeeds", checked: placements.length > 0 ? placements[2].checked : false,  label: "Video Feeds", id:`custom-fb-videoFeeds`},
        {name:"rightColumn", checked: placements.length > 0 ? placements[3].checked : false,  label: "Right Column", id:`custom-fb-rightColumn`},
        {name:"stories", checked: placements.length > 0 ? placements[4].checked : false,  label: "Stories", id:`custom-fb-stories`},
    ]) 


    // useEffect(() => {
    //     console.log("Custom boxes changed")
    // },[customBoxes])

    const handleChange = (e) => {
        for(let i = 0; i < customBoxes.length; i++){
            const updatedCheckboxes = [...customBoxes]
            if(updatedCheckboxes[i].name === e.target.name){
                updatedCheckboxes[i].checked = e.target.checked

                setCustomBoxes(updatedCheckboxes)
                
            }
        }
  
    }

    // console.log(customBoxes)

    return(
        <div className="row customCheckboxes">

            { customBoxes.map( box =>{
                return  <div key={box.name} className="col-md-4 d-flex align-items-center">
                            <Form.Check
                                custom
                                // inline
                                label=""
                                aria-label={box.label}
                                type="checkbox"
                                id={box.id}
                                className="customCheckbox"
                                name={box.name}
                                checked={box.checked}
                                onChange={(e) => handleChange(e)}
                                />
                                <label>{box.label}</label>
                                <i class="far fa-eye"></i>
                        </div>
            })}
            
        </div>
    );
}

export default CustomBoxes;