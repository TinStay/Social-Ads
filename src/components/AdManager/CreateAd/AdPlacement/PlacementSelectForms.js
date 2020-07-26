import React from 'react';
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import CreatableSelect from 'react-select/creatable';


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

export const ButtonLabelSelect = (props) => {
   
    let buttonLabels = [
        {label: "Aply now", value: 'Aply now'},
        {label: "Book now", value: 'Book now'},
        {label: "Contact us", value: 'Contact us'},
        {label: "Donate now", value: 'Donate now'},
        {label: "Learn more", value: 'Learn more'},
        {label: "Shop now", value: 'Shop now'},
        {label: "Sign up", value: 'Sign up'},
        {label: "Watch more", value: 'Watch more'},
        {label: "Download", value: 'Download'},
        {label: "Request time", value: 'Request time'},
    ] 

    

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

    const formatGroupLabel = data => (
        <div style={groupStyles}>
          <span>{data.label}</span>
          {/* <span style={groupBadgeStyles}>{data.options.length}</span> */}
        </div>
      );
    


    return (
        <Select
        defaultValue={buttonLabels[4]}
        options={buttonLabels}
        // isMulti
        // formatGroupLabel={formatGroupLabel}
        // onChange={buttonLabel => props.saveDevices(devices)}
        />
    )
}