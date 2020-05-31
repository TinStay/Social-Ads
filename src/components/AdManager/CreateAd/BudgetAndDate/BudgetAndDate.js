import React,{ useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import  { Form  } from 'react-bootstrap'

// import Globalize from 'globalize';
// import globalizeLocalizer from 'react-widgets-globalize';

const BudgetAndDate = (props) => {

    // Budget
    const [dailyBudget, setDailyBudget] = useState(true);
    const [lifetimeBudget, setLifetimeBudget] = useState(false);


    // Schedule 
    const [asapSchedule, setAsapSchedule] = useState(true);
    const [customSchedule, setCustomSchedule] = useState(false);

    const [startingDate, setStartingDate] = useState();
    const [endingDate, setEndingDate] = useState();


    const changeToDaily = (e) => {
        if(e.target.checked){
            setDailyBudget(true)
            setLifetimeBudget(false)
        }
    }

    const changeToLifetime = (e) => {
        if(e.target.checked){
            setDailyBudget(false)
            setLifetimeBudget(true)
        }
    }

    const changeAsapSchedule = (e) => {
        if(e.target.checked){
            setAsapSchedule(true)
            setCustomSchedule(false)
        }
    }

    const changeCustomSchedule = (e) => {
        if(e.target.checked){
            setAsapSchedule(false)
            setCustomSchedule(true)
        }
    }
    
    
    return(
        <div className="add-form-group">
            <h3 className="border-bottom add-form-label">Choose your budget and starting date</h3>
            <form className="budget-form row">

            <div className="budget-form-budget col-md-6">
               <h3 className="budget-form-label font-color">Budget</h3>
                    <div className="daily-budget-field d-flex">
                        <div className="radio-schedule">
                            <Form.Check
                                custom
                                block
                                label="Daily"
                                type="radio"
                                id={"daily-budget-radio"}
                                className="radio-budget"
                                name="dailyBudget"
                                checked={dailyBudget}
                                onChange={(e) => changeToDaily(e)}
                            />
                        </div>
                       { dailyBudget ?  <div class="input-group mt-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="basic-addon1">USD</span>
                            </div>
                            <input type="text" class="form-control" placeholder="Daily budget" aria-label="budget" aria-describedby="basic-addon1"/>
                        </div> : null }
                    </div>
                    <div className="lifetime-budget-field">
                        <Form.Check
                            custom
                            block
                            label="Lifetime"
                            type="radio"
                            id={`lifetime-budget-radio`}
                            className="radio-budget"
                            name="lifetimeBudget"
                            checked={lifetimeBudget}
                            onChange={(e) => changeToLifetime(e)}
                        />
                        { lifetimeBudget ?  <div class="input-group mt-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="basic-addon1">USD</span>
                            </div>
                            <input type="text" class="form-control" placeholder="Daily budget" aria-label="budget" aria-describedby="basic-addon1"/>
                        </div> : null }
                    </div>
                 
            </div>
            <div className="budget-form-schedule col-md-6">
                <h3 className="budget-form-label font-color ">Schedule</h3>
                <div className="asap-schedule-field">
                    <Form.Check
                        custom
                        block
                        label="Run ads as soon as possible"
                        type="radio"
                        id="asap-schedule"
                        className="radio-budget"
                        name="Asap schedule"
                        checked={asapSchedule}
                        onChange={(e) => changeAsapSchedule(e)}
                    />
                </div>
                <div className="custom-schedule-field">
                    <Form.Check
                        custom
                        block
                        label="Custom schedule"
                        type="radio"
                        id="custom-schedule"
                        className="radio-budget"
                        name="Custom schedule"
                        checked={customSchedule}
                        onChange={(e) => changeCustomSchedule(e)}
                    />
                    { customSchedule ? 
                        <Form.Group>
                        <div className="start-date col-12">
                            <label>Starting date</label>
                            <DatePicker
                            selected={startingDate}
                            onChange={(date) => setStartingDate(date)}
                            />
                        </div>
                        <div className="end-date col-12">
                            <label>Ending date</label>
                            <DatePicker
                            selected={endingDate}
                            onChange={(date) => setEndingDate(date)}
                            />
                        </div>
                        </Form.Group> : null}

                </div>
        </div>
                
                
            </form>
        </div>
    );
}

export default BudgetAndDate;