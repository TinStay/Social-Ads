import React from 'react';
import Auxilliary from '../../hoc/Auxilliary';
import { Form } from 'react-bootstrap';
import GoalCard  from './GoalCard';


const MarketingGoal = (props) => {


    return(
        <div className="add-form-group">
        <h3 className="border-bottom add-form-label">Choose your marketing goal</h3>
        <div className="goals  ">
            <h2 className="mx-4 font-color">Awareness</h2>
            <div className="row goals-row d-flex justify-content-left ">
                <div className="col-md-4">
                    <GoalCard 
                    title="Brand awareness"
                    iconClass="fas fa-podcast"
                    selectGoal={(title) => props.selectGoal(title)}/>
                </div>
                <div className="col-md-4">
                    <GoalCard 
                    title="Reach"
                    iconClass="fas fa-expand-arrows-alt"
                    selectGoal={(title) => props.selectGoal(title)}/>
                </div>
                
            </div>
            <h2 className="mx-4 font-color">Consideration</h2>
            <div className="row goals-row d-flex justify-content-center ">
                <div className="col-md-4">
                    <GoalCard 
                    title="Traffic"
                    iconClass="fas fa-mouse-pointer"
                    selectGoal={(title) => props.selectGoal(title)}/>
                </div>
                <div className="col-md-4">
                    <GoalCard 
                    title="Engagement"
                    iconClass="fas fa-users"
                    selectGoal={(title) => props.selectGoal(title)}/>
                </div>
                <div className="col-md-4">
                    <GoalCard 
                    title="Video views"
                    iconClass="fas fa-play-circle"
                    selectGoal={(title) => props.selectGoal(title)}/>
                </div>
                <div className="col-md-4">
                    <GoalCard 
                    title="Lead generation"
                    iconClass="fas fa-filter"
                    selectGoal={(title) => props.selectGoal(title)}/>
                </div>
                <div className="col-md-4">
                    <GoalCard 
                    title="Messages"
                    iconClass="fas fa-comment-dots"
                    selectGoal={(title) => props.selectGoal(title)}/>
                </div>
                <div className="col-md-4">
                    <GoalCard 
                    title="Application installs"
                    iconClass="fas fa-download"
                    selectGoal={(title) => props.selectGoal(title)}/>
                </div>
            </div>
            <h2 className="mx-4 font-color">Conversion</h2>
            <div className="row goals-row d-flex justify-content-center ">
                <div className="col-md-4">
                    <GoalCard 
                    title="Catalog sales"
                    iconClass="fas fa-shopping-cart"
                    selectGoal={(title) => props.selectGoal(title)}/>
                </div>
                <div className="col-md-4">
                    <GoalCard 
                    title="Conversions"
                    iconClass="fas fa-globe"
                    selectGoal={(title) => props.selectGoal(title)}/>
                </div>
                <div className="col-md-4">
                    <GoalCard 
                    title="Store traffic"
                    iconClass="fas fa-store"
                    selectGoal={(title) => props.selectGoal(title)}/>
                </div>
            </div>
            
        </div>
      
        
        </div>
    );
}

export default MarketingGoal;