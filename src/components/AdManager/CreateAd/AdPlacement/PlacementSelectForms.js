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

    const defaultOption = devices[0].options[0].label

    return (
        <Select
        defaultValue={devices[0].options[0]}
        options={devices}
        isMulti
        formatGroupLabel={formatGroupLabel}
        />
    )
}