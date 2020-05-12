import React from 'react';
import Auxilliary from '../../hoc/Auxilliary';
import { Form } from 'react-bootstrap';
import GoalCard from './GoalCard';


const MarketingGoal = (props) => {


    return(
        <div className="add-form-group">
        <h3 className=" add-form-label">Choose your marketing goal</h3>
        <div className="goals border text-center">
            <h2 className="mx-4">Awareness</h2>
            <div className="row goals-row d-flex justify-content-center ">
                <div className="col-md-4">
                    <GoalCard/>
                </div>
                <div className="col-md-4">
                    <GoalCard/>
                </div>
                <div className="col-md-4">
                    <GoalCard/>
                </div>
            </div>
            <h2 className="mx-4">Consideration</h2>
            <div className="row goals-row d-flex justify-content-center ">
                <div className="col-md-4">
                    <GoalCard/>
                </div>
                <div className="col-md-4">
                    <GoalCard/>
                </div>
                <div className="col-md-4">
                    <GoalCard/>
                </div>
                <div className="col-md-4">
                    <GoalCard/>
                </div>
                <div className="col-md-4">
                    <GoalCard/>
                </div>
                <div className="col-md-4">
                    <GoalCard/>
                </div>
            </div>
            <h2 className="mx-4">Conversion</h2>
            <div className="row goals-row d-flex justify-content-center ">
                <div className="col-md-4">
                    <GoalCard/>
                </div>
                <div className="col-md-4">
                    <GoalCard/>
                </div>
                <div className="col-md-4">
                    <GoalCard/>
                </div>
            </div>
            
        </div>
      
        
        </div>
    );
}

export default MarketingGoal;