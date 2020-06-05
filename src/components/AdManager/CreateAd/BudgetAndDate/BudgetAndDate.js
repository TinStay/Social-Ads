import React,{ useState, useEffect } from 'react';
import DatePicker,{addDays} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import  { Form, Alert } from 'react-bootstrap'

// import Globalize from 'globalize';
// import globalizeLocalizer from 'react-widgets-globalize';

const BudgetAndDate = (props) => {
    // Alert 
    const [alertType, setAlertType] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    // Budget type
    const [isDailyBudget, setIsDailyBudget] = useState(true);
    const [isLifetimeBudget, setIsLifetimeBudget] = useState(false);

    // Budget figures
    // Facebook 
    const [dailyBudgetFb, setDailyBudgetFb] = useState(1);
    const [lifetimeBudgetFb, setLifetimeBudgetFb] = useState(30);

    // Google
    const [googleDailyBudget, setGoogleDailyBudget] = useState(1)

    const setDailyAndLifetimeBudget = e => {

        if(e.target.name === "daily"){
            const dailyBud = parseInt(e.target.value).toFixed(2)

            // Checks if dailyBudget > 1 else => shows error
            if(dailyBud > 1){
                setShowAlert(false)
                setDailyBudgetFb(dailyBud)
            }else{
                setShowAlert(true)
                setAlertType("DailyBudgetTooSmall")
                setDailyBudgetFb(dailyBud)
            }
            
            setLifetimeBudgetFb((dailyBud * period).toFixed(2))
        }


        if(e.target.name === "lifetime"){
            const lifetimeBud = parseInt(e.target.value).toFixed(2)

            // Checks if dailyBudget > 1 else => shows error
            if(lifetimeBud / period >= 1){
                setShowAlert(false)
                const priceDaily = (lifetimeBud / period).toFixed(2)
                setDailyBudgetFb(priceDaily)
            }else{
                setShowAlert(true)
                setAlertType("DailyBudgetTooSmall")
            }
            setLifetimeBudgetFb(lifetimeBud)
        }
    }


    // Schedule type
    const [asapSchedule, setAsapSchedule] = useState(true);
    const [customSchedule, setCustomSchedule] = useState(false);

    // Schedule dates
    const [startDate, setStartDate] = useState();

    // Setting 29 days difference between dates
    const endDateMin = new Date();
    endDateMin.setDate(endDateMin.getDate() + 30);
    const [endDate, setEndDate] = useState();
    const [period, setPeriod] = useState(29);


    useEffect(()=>{
        if(customSchedule){
            const oneDay = 24 * 60 * 60 * 1000;
            const diffDays = Math.round(Math.abs((startDate - endDate) / oneDay));
            setPeriod(diffDays); // Difference between the start and end date

            if(lifetimeBudgetFb / diffDays < 1){
                setShowAlert(true)
                setAlertType("DailyBudgetTooSmall")
            }else{
                setShowAlert(false)
            }

            if(diffDays < 29){
                setShowAlert(true)
                setAlertType("PeriodTooShort")
            }else{
                setShowAlert(false)
            }
            
        }

        // if(asapSchedule){
        //     if(lifetimeBudgetFb < 29){
        //         setShowAlert(true)
        //         setAlertType("DailyBudgetTooSmall");
        //     }
        // }

        if(dailyBudgetFb < 1){
            setShowAlert(true)
            setAlertType("DailyBudgetTooSmall");
        }else{
            setShowAlert(false)
        }
        

    },[startDate, endDate, dailyBudgetFb, lifetimeBudgetFb, period])


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

    console.log("runOnFacebookOrInstagram", props.runOnFacebookOrInstagram)
    console.log("runOnGoogle", props.runOnGoogle)


    const saveData = e => {
        e.preventDefault()

        let formData;

        if(props.runOnFacebookOrInstagram){
            // Both fb and google ads have been selected
            if(props.runOnGoogle){
                formData = {
                    budget: {
                        fbDailyBudget: dailyBudgetFb,
                        fbLifetimeBudget: lifetimeBudgetFb,
                        googleDailyBudget: googleDailyBudget
                    }
                };
            }else{
                formData = {
                    budget: {
                        fbDailyBudget: dailyBudgetFb,
                        fbLifetimeBudget: lifetimeBudgetFb,
                    }
                };
            }

        }else if(props.runOnGoogle){
            formData = {
                budget: {
                    googleDailyBudget: googleDailyBudget
                }
            };
        }


        if(asapSchedule){
            formData = {
                ...formData,
                schedule: {
                    asapSchedule: asapSchedule,
                    period: `${period} days`
                }
            }
        }else if(customSchedule){
            formData = {
                ...formData,
                schedule: {
                    customSchedule: customSchedule,
                    startDate: startDate,
                    endDate: endDate,
                    period: `${period} days`
                },
            }
        }

        props.saveBudgetAndScheduleData(formData)
       
    }
    
    let alert = null;
    if(showAlert){
        if(alertType === "DailyBudgetTooSmall"){
            alert = (
            <Alert variant='danger' onClose={() => setShowAlert(false)} dismissible>
                Daily budget must be more than 1$.
            </Alert>
            )
        }
        if(alertType === "PeriodTooShort"){
            alert = (
            <Alert variant='danger' onClose={() => setShowAlert(false)} dismissible>
                Chosen period of time should be at least 29 days.
            </Alert>
            )
        }
    }

    // Budget info box
    let budgetInfo;

    if(asapSchedule){
        budgetInfo = <span><b>{lifetimeBudgetFb}$</b> for the period of 29 days and around <b>{dailyBudgetFb}$</b>/day.</span>
    } else if(customSchedule){
        budgetInfo = <span><b>{lifetimeBudgetFb}$</b> for the period of {period} days and around <b>{dailyBudgetFb}$</b>/day.</span>
    }
    


    return(
        <div className="add-form-group">
            <h3 className="border-bottom add-form-label">Choose your budget and starting date</h3>
            <form onSubmit={(e) => saveData(e)} className="budget-form ">
            <div className="col-12">
                {alert}
            </div>
            <div className="budget-form-schedule col-md-6">
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
                                <label className="mr-2 my-auto">Start date:</label>
                                <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                minDate={new Date()}
                                showTimeSelect
                                dateFormat="dd/MM/yyyy h:mm aa"
                                className="date-picker"
                                placeholderText="Click to select a date"
                                />
                            </div>
                            <div className="end-date d-flex">
                                <label className="mr-2 my-auto">End date:</label>
                                <DatePicker
                                selected={endDate}
                                onChange={(date) => setEndDate(date)}
                                minDate={endDateMin}
                                showTimeSelect
                                dateFormat="dd/MM/yyyy h:mm aa"
                                className="date-picker"
                                placeholderText="Click to select a date"
                                />
                            </div>
                        </Form.Group>
                        </div> : null}

                </div>
        </div>
            <div className="budget-form-budget col-md-12">
               <h3 className="budget-form-label font-color">Budget</h3>
               <h4 className="font-color mt-4">Facebook & Instagram ads</h4>
                <div className="row fb-budget-box border">
                    <div className="col-md-5">
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
                            <input type="number" name="daily" value={dailyBudgetFb} onChange={(e) => setDailyAndLifetimeBudget(e)} className="form-control" placeholder="Daily budget" aria-label="budget" aria-describedby="basic-addon1"/>
                        </div> : null }
                    </div>
                    <div className="lifetime-budget-field d-flex">
                        {/* <div className="">   */}
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
                        {/* </div> */}
                        { isLifetimeBudget ?  
                        <div className="input-group ml-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">USD</span>
                            </div>
                            <input type="number" name="lifetime" value={lifetimeBudgetFb} onChange={(e) => setDailyAndLifetimeBudget(e)} className="form-control" placeholder="Lifetime budget" aria-label="budget" aria-describedby="basic-addon1"/>
                        </div> : null }
                    </div>
                    </div>

                    <div className="col-md-7">
                        <div className="spending text-center">
                            <p className="my-0">You will spend no more than {budgetInfo}</p>
                        </div>
                    </div>
                </div>

                <h4 className="font-color mt-4">Google ads</h4>
                
                <div className="row ggl-budget-box border">
                    <div className="col-12 ">
                        <p>Google ads will run every month unless you specify a time period or stop them in your Ad Manager.</p>
                    </div>
                    <div className="col-md-5 d-flex">
                        <label >Daily</label>
                        <div className="ggl-budget-field input-group mx-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">USD</span>
                            </div>
                            <input type="number" name="gglBudget" value={googleDailyBudget} onChange={(e) => setGoogleDailyBudget(e.target.value)} className="form-control" placeholder="Google budget" aria-label="budget" aria-describedby="basic-addon1"/>
                        </div>
                    </div>

                    <div className="col-md-7">
                        <div className="spending text-center">
                            <p className="my-0">You will spend no more than <b>{googleDailyBudget * 30}$</b>/month.</p>
                        </div>
                    </div>
                </div>
                 
            </div>

            <button type="submit" className="btn btn-primary">
                Continue to checkout
            </button>

            </form>
        </div>
    );
}

export default BudgetAndDate;