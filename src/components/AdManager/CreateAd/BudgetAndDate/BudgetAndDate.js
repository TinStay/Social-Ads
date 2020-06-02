import React,{ useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import NumberPicker from 'react-widgets/lib/NumberPicker'
import  { Form  } from 'react-bootstrap'

// import Globalize from 'globalize';
// import globalizeLocalizer from 'react-widgets-globalize';

const BudgetAndDate = (props) => {

    // Budget type
    const [isDailyBudget, setIsDailyBudget] = useState(true);
    const [isLifetimeBudget, setIsLifetimeBudget] = useState(false);

    // Budget figures
    const [dailyBudget, setDailyBudget] = useState(1);
    const [lifetimeBudget, setLifetimeBudget] = useState(30);

    const setDailyAndLifetimeBudget = e => {
        if(e.target.name === "daily"){
            setDailyBudget((e.target.value).toFixed(2))
            setLifetimeBudget((e.target.value * 30).toFixed(2))
        }else{
            setDailyBudget((e.target.value / 30).toFixed(2))
            setLifetimeBudget((e.target.value).toFixed(2))
        }
    }


    // Schedule 
    const [asapSchedule, setAsapSchedule] = useState(true);
    const [customSchedule, setCustomSchedule] = useState(false);

    const [startingDate, setStartingDate] = useState();
    const [endingDate, setEndingDate] = useState();


    const changeToDaily = (e) => {
        if(e.target.checked){
            setIsDailyBudget(true)
            setIsLifetimeBudget(false)
        }
    }

    const changeToLifetime = (e) => {
        if(e.target.checked){
            setIsDailyBudget(false)
            setIsLifetimeBudget(true)
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

            <div className="budget-form-budget col-md-5">
               <h3 className="budget-form-label font-color">Budget</h3>
                    <div className="daily-budget-field d-flex ">
                        {/* <div className=""> */}
                            <Form.Check
                                custom
                                block
                                label="Daily"
                                type="radio"
                                id={"daily-budget-radio"}
                                className="radio-budget"
                                name="dailyBudget"
                                checked={isDailyBudget}
                                onChange={(e) => changeToDaily(e)}
                            />
                        {/* </div> */}
                       { isDailyBudget ?  
                       <div className="input-group mx-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">USD</span>
                            </div>
                            <input type="number" name="daily" value={dailyBudget} onChange={(e) => setDailyAndLifetimeBudget(e)} className="form-control" placeholder="Daily budget" aria-label="budget" aria-describedby="basic-addon1"/>
                        </div> : null }
                    </div>
                    <div className="lifetime-budget-field d-flex">
                        <div className="">
                            <Form.Check
                                custom
                                block
                                label="Lifetime"
                                type="radio"
                                id={`lifetime-budget-radio`}
                                className="radio-budget"
                                name="lifetimeBudget"
                                checked={isLifetimeBudget}
                                onChange={(e) => changeToLifetime(e)}
                            />
                        </div>
                        { isLifetimeBudget ?  
                        <div className="input-group ml-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">USD</span>
                            </div>
                            <input type="number" name="lifetime" value={lifetimeBudget} onChange={(e) => setDailyAndLifetimeBudget(e)} className="form-control" placeholder="Lifetime budget" aria-label="budget" aria-describedby="basic-addon1"/>
                        </div> : null }
                    </div>
                    <div className="spending">
                        <p className="gray mt-3">You will spend no more than {isLifetimeBudget ? lifetimeBudget  : dailyBudget*30 }$/month.</p>
                    </div>
                 
            </div>

            <div className="budget-form-schedule col-md-5 offset-md-1">
                <h3 className="budget-form-label font-color ">Schedule</h3>
                <div className="asap-schedule-field">
                    <div>
                    <Form.Check
                        custom
                        block
                        label="Run ads as soon as possible"
                        type="radio"
                        id="asap-schedule"
                        className="radio-schedule"
                        name="Asap schedule"
                        checked={asapSchedule}
                        onChange={(e) => changeAsapSchedule(e)}
                    />
                    </div>
                </div>
                <div className="custom-schedule-field ">
                    <Form.Check
                        custom
                        block
                        label="Custom schedule"
                        type="radio"
                        id="custom-schedule"
                        className="radio-schedule"
                        name="Custom schedule"
                        checked={customSchedule}
                        onChange={(e) => changeCustomSchedule(e)}
                    />
                    { customSchedule ? 
                        <div className="">
                            <Form.Group>
                            <div className="start-date d-flex">
                                <label className="mr-2 my-auto">Starting date:</label>
                                <DatePicker
                                selected={startingDate}
                                onChange={(date) => setStartingDate(date)}
                                className="date-picker"
                                />
                            </div>
                            <div className="end-date d-flex">
                                <label className="mr-2 my-auto">Ending date:</label>
                                <DatePicker
                                selected={endingDate}
                                onChange={(date) => setEndingDate(date)}
                                className="date-picker"
                                />
                            </div>
                        </Form.Group>
                        </div> : null}

                </div>
        </div>
                
                
            </form>
        </div>
    );
}

export default BudgetAndDate;