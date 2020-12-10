import React from 'react'; 

const NumberCircle = props =>{

    return(
        <div className="number-circle">
            <span>{props.number}</span>
        </div>
    );
}


export default NumberCircle;