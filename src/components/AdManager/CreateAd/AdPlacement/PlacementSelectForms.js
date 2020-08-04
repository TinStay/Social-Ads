import React, { useEffect, useState } from 'react';
import Select from 'react-select'
import { connect } from 'react-redux'
import * as actionTypes from '../../../../store/actions/actionTypes'
// import makeAnimated from 'react-select/animated';
// import CreatableSelect from 'react-select/creatable';


export const DevicesSelect = (props) => {
   
    let devices = [
        {
            label: "Devices",
            options: [
                {label: "All devices", value: 'All devices'},
                {label: "Desktop and laptop computers", value: 'Desktop and laptop computers'},
                {label: "iOS devices", value: 'iOS devices'},
                {label: "Android devices", value: 'Android devices'},
                {label: "Other mobile", value: 'Other mobile'},
            ]
        },
        
    ] 

    

    const groupStyles = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    };

    const formatGroupLabel = data => (
        <div style={groupStyles}>
          <span>{data.label}</span>
          {/* <span style={groupBadgeStyles}>{data.options.length}</span> */}
        </div>
      );

    
    let defaultValues = []

    if(props.selectedDevices){
        defaultValues = props.selectedDevices.map( device => {
            for(let i = 0; i < devices[0].options.length; i++){
                if(devices[0].options[i].value === device){
                    return devices[0].options[i]
                }
            }
        })
    }
    


    return (
        <Select
        defaultValue={defaultValues}
        options={devices}
        isMulti
        formatGroupLabel={formatGroupLabel}
        onChange={devices => props.saveDevices(devices)}
        />
    )
}

export function ButtonLabelSelect(props){
   
    let buttonLabels = [
        {label: "Aply now", value: 'Aply now', field: "buttonLabel"},
        {label: "Book now", value: 'Book now', field: "buttonLabel"},
        {label: "Contact us", value: 'Contact us', field: "buttonLabel"},
        {label: "Donate now", value: 'Donate now', field: "buttonLabel"},
        {label: "Learn more", value: 'Learn more', field: "buttonLabel"},
        {label: "Shop now", value: 'Shop now', field: "buttonLabel"},
        {label: "Sign up", value: 'Sign up', field: "buttonLabel"},
        {label: "Watch more", value: 'Watch more', field: "buttonLabel"},
        {label: "Download", value: 'Download', field: "buttonLabel"},
        {label: "Request time", value: 'Request time', field: "buttonLabel"},
    ] 

    const [buttonLabel, setButtonLabel] = useState(props.adDetails ? props.adDetails[props.adDetails.length-1] : buttonLabels[4])
    
    // const buttonLabel = props.adDetails[props.adDetails.length-1]

    // useEffect(() => {
    //     if(props.buttonLabel != null){
    //         setButtonLabel(props.buttonLabel)
    //     }else{
    //         setButtonLabel(buttonLabels[4])
    //     }
         
    //  }, [])


    const groupStyles = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    };
    const groupBadgeStyles = {
        backgroundColor: '#EBECF0',
        borderRadius: '2em',
        color: '#172B4D',
        display: 'inline-block',
        fontSize: 12,
        fontWeight: 'normal',
        lineHeight: '1',
        minWidth: 1,
        padding: '0.16666666666667em 0.5em',
        textAlign: 'center',
    };

    // let defaultValue = buttonLabel ? buttonLabel : buttonLabels[4]
    
     // Set defaultValue if there is value stored in redux state
    if(props.buttonLabel != null){
        // console.log("defaultValue",defaultValue)
        
        // defaultValue = buttonLabels.filter( option => {
        //     if(option.value === props.buttonLabel){
        //         return option
        //     }
        // })
        for(let i = 0; i <= buttonLabels.length; i++){
            if(buttonLabels[i] === props.buttonLabel){
                setButtonLabel(buttonLabels[i])
            }
        }
    }

    return (
        <Select
        defaultValue={buttonLabel}
        options={buttonLabels}
        onChange={buttonLabel => props.saveButtonLabel(buttonLabel)}
        // values={props.buttonLabel}
        // isMulti
        />
    )
}
