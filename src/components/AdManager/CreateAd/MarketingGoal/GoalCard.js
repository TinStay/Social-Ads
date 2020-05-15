import React from 'react';


const GoalCard = (props) => {


    return(
        <div className={props.goal == props.title ? "goals-card text-center active" : "goals-card text-center"} onClick={() => props.selectGoal(props.title)}>
        <i class={props.iconClass}></i>
        <h4>{props.title}</h4>
       
        
        </div>
    );
}

export default GoalCard;